const http = require('http');
const express = require('express');
const serverHandler = require('./.build/server').default;
const clientHandler = express.static('.build/client');

const app = serverHandler(clientHandler);

http.createServer(app).listen(3000);

console.log('Production server listening on port 3000');