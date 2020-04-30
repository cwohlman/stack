import express from 'express'
import { DatabasePorts } from '../features/databasePorts';

export default function start(client) {
  const app = express();
  // const collections: DatabasePorts = 

  /* TODO: 
      - Iterate over databases & constuct each
      - Iterate over server routes & construct & expose each
  */

  app.use(client);

  return app;
}