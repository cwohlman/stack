// This file, like all files in src, may be run by multiple runners:
// - The server runner will use this file to compile dynamic html responses
// - The static runner will use this file to compile static html responses
// - The client runner will use this file to compile static js files for reference
//   in html responses

// Structure:
// 1. Define your app, using various Components
// 2. Register your app with the build system
import webapp from "../tool/webapp.js";
import react from "react";

// This initial example doesn't use a router or anything really
var APP = (
  <html>
    <head>
      <title>Hello, Stack!</title>
    </head>
    <body>
      <h1>Hello, Stack!</h1>
    </body>
  </html>
);

webapp(APP);
