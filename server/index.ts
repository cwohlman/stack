import express from 'express'

export default function start(client) {
  const app = express();

  /* TODO: 
      - Iterate over databases & constuct each
      - Iterate over server routes & construct & expose each
  */

  app.use(client);

  return app;
}