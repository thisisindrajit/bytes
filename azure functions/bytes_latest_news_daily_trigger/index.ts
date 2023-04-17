import { AzureFunction, Context } from "@azure/functions";

const axios = require("axios");
const mysql = require("mysql2");
const MindsDB = require("mindsdb-js-sdk");
const crypto = require("crypto");

// Helper functions
const removeLastIncompleteSentence = (paragraph) => {
  // Define the regular expression pattern for detecting sentences
  var sentencePattern = /[A-Z][^.!?]*[.!?]/g;

  // Use the match() method to find all matches of the sentence pattern in the paragraph
  var sentences = paragraph.match(sentencePattern);

  // Return the updated paragraph if there are any sentences, otherwise return the original paragraph
  return sentences?.length > 0 ? sentences.join(" ") : paragraph;
};

const getRandomValuesFromArray = (arr, n) => {
  // Create a copy of the original array to avoid modifying the original array
  const copyArr = [...arr];
  const selectedValues = [];

  // Loop 'n' times to randomly select 'n' values
  for (let i = 0; i < n; i++) {
    // Generate a random index within the remaining elements in the array
    const randomIndex = Math.floor(Math.random() * copyArr.length);
    // Remove the randomly selected element from the copyArr and add it to selectedValues
    selectedValues.push(copyArr.splice(randomIndex, 1)[0]);
  }

  return selectedValues;
};

const mapStringToHash = (input) => {
  // Create a SHA-256 hash object
  const hash = crypto.createHash("sha256");

  // Update the hash with the input string
  hash.update(input, "utf8");

  // Generate the hash digest as a Buffer
  const hashDigest = hash.digest();

  // Convert the truncated digest to a hexadecimal string
  const hexValue = hashDigest.toString("hex");

  // Return the hexadecimal string as the 128-bit value
  return hexValue;
};

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("Timer function is running late!");
  }

  context.log("--------------------");
  context.log("Timer trigger function started at ", timeStamp);
  context.log("--------------------");

  // ------------------------------
  // CONNECTING TO AZURE MYSQL DB
  const config = {
    host: process.env["MYSQL_HOST"],
    user: process.env["MYSQL_USERNAME"],
    password: process.env["MYSQL_PASSWORD"],
    database: process.env["MYSQL_DATABASE"],
    port: 3306,
  };

  const client = mysql.createConnection(config);

  try {
    await client.connect();
    context.log("Connected to Azure MySQL DB!");
  } catch (err) {
    context.log("Error connecting to Azure MySQL DB: ", err);
  }

  // ------------------------------
  // CONNECTING TO MINDSDB
  try {
    await MindsDB.default.connect({
      user: process.env["MINDSDB_USERNAME"],
      password: process.env["MINDSDB_PASSWORD"],
    });
    context.log("Connected to MindsDB!");
  } catch (error) {
    // Failed to authenticate.
    context.log("Could not authenticate user to MindsDB: ", error);
  }

  // ------------------------------
  // FETCHING DATA FROM NEWSDATA.IO API
  const noOfIterations = 1;

  const categories = [
    "top",
    "politics",
    "technology",
    "sports",
    "entertainment",
    "business",
    "science",
    "health",
    "tourism",
    "world",
    "environment",
  ];
  const countries = ["in", "us", "gb"];

  let newsArticles = [];
  let nextPage = null;

  for (let i = 0; i < noOfIterations; i++) {
    // Getting n random countries and categories
    const randomCountries = getRandomValuesFromArray(countries, 1);
    const randomCategories = getRandomValuesFromArray(categories, 3);

    // Constructing the API url
    let apiUrl = `https://newsdata.io/api/1/news?apikey=${
      process.env["NEWSDATA_APIKEY"]
    }&language=en&country=${randomCountries.join(
      ","
    )}&category=${randomCategories.join(",")}`;

    // If country includes India, then add the query parameter q=India
    if (randomCountries.includes("in")) {
      apiUrl += "&q=India";
    }

    if (i > 0 && nextPage) {
      apiUrl += `&page=${nextPage}`;
    }

    context.log("API URL: ", apiUrl);

    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      context.log(
        "Error fetching data from newsdata.io API! Error code:",
        response.status
      );
      continue;
    }

    const api_data: any = response.data;

    // Setting the value of nextPage for fetching next page of data
    nextPage = api_data.nextPage;

    // Adding the data to the totalResponse array
    newsArticles = [...newsArticles, ...api_data.results];
  }

  // ------------------------------
  // WRITING ARTICLES AND PREDICTIONS TO DB
  for (let i = 0; i < newsArticles.length; i++) {
    if (
      newsArticles[i].title === null ||
      newsArticles[i].link === null ||
      newsArticles[i].content === null ||
      newsArticles[i].pubDate === null
    ) {
      continue;
    }

    const id = mapStringToHash(newsArticles[i].link);

    context.log("Article id: ", id);

    // Summarize text, predict sentiment and emotion
    try {
      const content =
        newsArticles[i]?.description.length > 256
          ? newsArticles[i].description
          : newsArticles[i].content.slice(0, 512);

      const query_1 = `SELECT summarized_article
                        FROM mindsdb.text_summarization_openai
                        WHERE content="${content.replace(/"/g, "'")}";`;

      const queryResult_1 = await MindsDB.default.SQL.runQuery(query_1);
      const summarized_full = await queryResult_1.rows[0].summarized_article;
      const summarized = removeLastIncompleteSentence(summarized_full).replace(
        /"/g,
        "'"
      );

      context.log("Summarized article: ", summarized);

      const query_2 = `SELECT sentiment
    FROM mindsdb.hf_sentiment
    WHERE text="${summarized}";`;

      const queryResult_2 = await MindsDB.default.SQL.runQuery(query_2);
      const sentiment = await queryResult_2.rows[0].sentiment;

      context.log("Sentiment: ", sentiment);

      const query_3 = `SELECT emotion
    FROM mindsdb.hf_emotions_6
    WHERE text="${summarized}";`;

      const queryResult_3 = await MindsDB.default.SQL.runQuery(query_3);
      const emotion = await queryResult_3.rows[0].emotion;

      context.log("Emotion: ", emotion);

      client.query(
        "CALL usp_insert_articles(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          newsArticles[i].title.slice(0, 1024),
          newsArticles[i].link,
          newsArticles[i].content,
          newsArticles[i].pubDate,
          newsArticles[i]?.description.slice(0, 2048),
          newsArticles[i]?.image_url,
          newsArticles[i].category
            ? JSON.stringify({ category: newsArticles[i].category })
            : null,
          newsArticles[i].creator
            ? JSON.stringify({ creator: newsArticles[i].creator })
            : null,
          newsArticles[i]?.source_id.slice(0, 512),
          newsArticles[i].country
            ? JSON.stringify({ country: newsArticles[i].country })
            : null,
          newsArticles[i].keywords
            ? JSON.stringify({ keywords: newsArticles[i].keywords })
            : null,
          summarized,
          sentiment,
          emotion,
        ],
        (err, results) => {
          if (err) {
            context.log("Error calling stored procedure:", err);
            return;
          }

          const inserted = results[0][0].insert_status;

          if (inserted) {
            context.log("Inserted article with id: ", id);
          } else {
            context.log("Article with id", id, "already exists!");
          }
        }
      );
    } catch (err) {
      context.log(
        "Some error occurred while inserting to DB or prediction: ",
        err
      );
      continue;
    }
  }

  // End the connection
  client.end();
};

export default timerTrigger;