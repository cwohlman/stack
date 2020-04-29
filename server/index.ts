import express from 'express'

export default function start(req, res) {
  const app = express();

  app.use(express.static('dist/client'))

  return app;
}