const express = require('express');

function requestHandler(serverRoutes, clientRoutes) {
  const app = express();
  app.use(serverRoutes);
  app.use(clientRoutes);
  return app;
}

exports.requestHandler = requestHandler;
