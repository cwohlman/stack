const express = require('express');

function requestHandler(serverRoutes, clientRoutes) {
  const app = express();
  app.use(clientRoutes);
  app.use('/api', serverRoutes);
  return app;
}

exports.requestHandler = requestHandler;
