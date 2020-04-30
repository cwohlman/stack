import express from 'express'
import { DatabasePorts } from '../features/databasePorts';
import * as collectionsTypes from '../features/collections';
import * as endpointsTypes from '../features/endpoints';
import FakeStore from '../infrastructure/fakeStore';
import { ServerPorts } from '../features/ports';
import routes from './routes';


export default function start(client) {
  const app = express();
  const collections: DatabasePorts = initializeCollections();
  const endpoints: ServerPorts = initializeEndpoints(collections);
  const handlers = [];
  const middlware = (req, res, done) => { done() }
  for (const route in routes) {
    if (routes.hasOwnProperty(route)) {
      const RouteHandlerClass = routes[route];

      for (const endpointName in endpoints) {
        const endpoint = endpoints[endpointName];

        if (endpoint.constructor === RouteHandlerClass) {
          app.use(route, middlware, (req, res) => {
            try {
              endpoint.execute(req.body)
              .then(response => res.end(JSON.stringify(response)))
              .catch(e => res.end(e.stack))
            } catch (e) {
              res.end(e.stack);
            }
          })
        }
      }
    }
  }


  app.use(client);

  return app;
}

export function initializeCollections() {
  const result: Partial<DatabasePorts> = {};

  for (const collectionName in collectionsTypes) {
    if (collectionsTypes.hasOwnProperty(collectionName)) {
      const CollectionClass = collectionsTypes[collectionName];

      result[collectionName] = new CollectionClass(new FakeStore());
    }
  }

  return result as DatabasePorts;
}


export function initializeEndpoints(databasePorts: DatabasePorts) {
  const result: Partial<ServerPorts> = {};

  for (const endpointName in endpointsTypes) {
    if (endpointsTypes.hasOwnProperty(endpointName)) {
      const CollectionClass = endpointsTypes[endpointName];

      result[endpointName] = new CollectionClass(databasePorts);
    }
  }

  return result as ServerPorts;
}