import { FC } from "react";
import ImageHolder from "../common/ImageHolder";

interface BottomBarProps {
  className?: string;
  link: string;
  hasPrevious: boolean;
  hasNext: boolean;
  prevId: string | null;
  nextId: string | null;
  tabIndex: number;
}

const BottomBar: FC<BottomBarProps> = ({
  className = "",
  hasPrevious,
  hasNext,
  prevId,
  nextId,
  link,
  tabIndex,
}) => {
  const showInView = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    document.getElementById(id)?.focus();
  };

  return (
    <div
      className={`grid grid-cols-3 place-content-stretch w-full md:w-[32rem] m-auto rounded overflow-hidden ${className}`}
    >
      <button
        tabIndex={-1}
        className={`${
          hasPrevious ? "bg-white cursor-pointer" : "bg-gray-200 text-gray-500"
        }  p-3 flex items-center justify-center gap-3`}
        onClick={hasPrevious && prevId ? () => showInView(prevId) : () => {}}
      >
        <ImageHolder
          heightAndWidthClasses="h-5 w-5"
          src={
            hasPrevious
              ? "/images/svg/up-arrow.svg"
              : "/images/svg/up-arrow-greyed.svg"
          }
          alt="up arrow icon"
          color={hasPrevious ? "black" : "grey"}
          priority={true}
          showLoading
        />
        <span className="hidden sm:block">Previous</span>
      </button>
      <button
        tabIndex={-1}
        className={`${
          hasNext ? "bg-white cursor-pointer" : "bg-gray-200 text-gray-500"
        }  p-3 flex items-center justify-center gap-3`}
        onClick={hasNext && nextId ? () => showInView(nextId) : () => {}}
      >
        <ImageHolder
          heightAndWidthClasses="h-5 w-5"
          src={
            hasNext
              ? "/images/svg/down-arrow.svg"
              : "/images/svg/down-arrow-greyed.svg"
          }
          alt="down arrow icon"
          color={hasNext ? "black" : "grey"}
          priority={true}
          showLoading
        />
        <span className="hidden sm:block">Next</span>
      </button>
      <a
        href={link}
        tabIndex={tabIndex}
        className="bg-[#ecd9cb] p-3 flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <ImageHolder
          heightAndWidthClasses="h-5 w-5"
          src="/images/svg/link.svg"
          alt="link icon"
          color="black"
          priority={true}
          showLoading
        />
      </a>
    </div>
  );
};

export default BottomBar;