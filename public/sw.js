if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const o=e=>i(e,c),t={module:{uri:c},exports:r,require:o};s[c]=Promise.all(a.map((e=>t[e]||o(e)))).then((e=>(n(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/YTs3dxDe5P8tH0MTkCDYM/_buildManifest.js",revision:"a8b36942d221d4b18dd83811c76b3853"},{url:"/_next/static/YTs3dxDe5P8tH0MTkCDYM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/583-f85ddecc02792079.js",revision:"f85ddecc02792079"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-7ffe718e72223f79.js",revision:"7ffe718e72223f79"},{url:"/_next/static/chunks/pages/_app-dbfd32642bfe206b.js",revision:"dbfd32642bfe206b"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/index-8b03fccb70a067b2.js",revision:"8b03fccb70a067b2"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"59c5c889f52620d6"},{url:"/_next/static/css/e257a950304b50c2.css",revision:"e257a950304b50c2"},{url:"/_next/static/css/eb1f9406062a16f7.css",revision:"eb1f9406062a16f7"},{url:"/android-chrome-192x192.png",revision:"cfa7e9b095124c0bc31c2d7c1e87abf1"},{url:"/android-chrome-512x512.png",revision:"f4e54c28816923db6dad37e2b1337808"},{url:"/apple-touch-icon.png",revision:"a2418b6b6fe059aafef89d7f995cbfd1"},{url:"/favicon.ico",revision:"a5f80e9c171a5808ac127735dd728194"},{url:"/images/bytes_logo.png",revision:"1ce9d002016d695196d4975470e43132"},{url:"/images/default_article_bg.jpeg",revision:"b8aca71e54b22942c209024e2c6d3a9b"},{url:"/images/emojis/anger.png",revision:"1e230b15fd62b3df317bc1b69d26e75c"},{url:"/images/emojis/disgust.png",revision:"987c8412524a1d941798f8fa7cc14b0b"},{url:"/images/emojis/fear.png",revision:"f46533ec8d1b9ab0293650ddeaf3b521"},{url:"/images/emojis/joy.png",revision:"329769b031dcdd0a991282b62df5ae0e"},{url:"/images/emojis/neg.png",revision:"f2560f7cebacf77fd3731cbcf2047ae0"},{url:"/images/emojis/neu.png",revision:"1cfe81cc4575d0e9f93083f92fa17910"},{url:"/images/emojis/pos.png",revision:"5e1975a3017abd95fdb45f1230dd6fc1"},{url:"/images/emojis/sadness.png",revision:"ac54ca1dc0e3084f93a7b98cff5cc4c1"},{url:"/images/emojis/surprise.png",revision:"c779821cb3fd74f5fdcc85135910cfb2"},{url:"/images/favicons/favicon-16x16.png",revision:"7fca8fc39cb59f1314d688f09e2295c1"},{url:"/images/favicons/favicon-32x32.png",revision:"953c41c32711dbbcf765a43e235efbb5"},{url:"/images/favicons/site.webmanifest",revision:"ce7ba918a05fcb1ec7af12b8676a26e8"},{url:"/images/svg/clock.svg",revision:"58f6de0bbaec654cb2d3aeb4a55bf31b"},{url:"/images/svg/down-arrow-greyed.svg",revision:"442c2d12562314803c4ab881d2721168"},{url:"/images/svg/down-arrow.svg",revision:"e3f55403db98b6a7b0d051dfedca41e4"},{url:"/images/svg/download.svg",revision:"2a7873e0de158020e8f75532dc659fc1"},{url:"/images/svg/left-arrow.svg",revision:"04d2095e2a35820b6b6b00d51bd2333c"},{url:"/images/svg/link-cream.svg",revision:"4b658039ed25b244076afc8e82b1f580"},{url:"/images/svg/link.svg",revision:"8cb9f2e44480e77387ac135fce72aac4"},{url:"/images/svg/loading-black.svg",revision:"66dc3ced94d31f3a3f240f6c48cd9eb2"},{url:"/images/svg/loading-grey.svg",revision:"5f6fc2f9e7fb9df7e2da0a4d54d9c183"},{url:"/images/svg/loading-white.svg",revision:"8e8288bb984d82b002f069fb0cacce67"},{url:"/images/svg/loading.svg",revision:"330d096efe708e925de41a39df6b8ee6"},{url:"/images/svg/right-arrow-cream.svg",revision:"0c47c1748f613e473c5af59f56368292"},{url:"/images/svg/right-arrow.svg",revision:"e1d4eece4bfef74830f322f0f3953a50"},{url:"/images/svg/up-arrow-greyed.svg",revision:"c8bf7c33991dc9ee676f1eada4f23e29"},{url:"/images/svg/up-arrow.svg",revision:"39180834a5060c43d7e925814467bd41"},{url:"/manifest.json",revision:"110972d78b5e8f2ec376d91ec038577b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));