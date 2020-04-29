import express from 'express'

export default function start(client) {
  const app = express();

  app.use(client);

  return app;
}