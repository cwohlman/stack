import express from 'express'
import bodyParser from 'body-parser';
import { DatabasePorts } from '../features/databasePorts';
import * as collectionsTypes from '../features/collections';
import * as endpointsTypes from '../features/endpoints';
import * as transportTypes from '../features/transportTypes';
import FakeStore from '../infrastructure/fakeStore';
import { ServerPorts } from '../features/ports';
import routes from './routes';
import createHandler from './handler';
import Transport from '../infrastructure/transport';


export default function start(client) {
  const app = express();
  const collections: DatabasePorts = initializeCollections();
  const endpoints: ServerPorts = initializeEndpoints(collections);
  const transport = new Transport(transportTypes);
  const middlware = bodyParser.json();
  for (const route in routes) {
    if (routes.hasOwnProperty(route)) {
      const RouteHandlerClass = routes[route];

      for (const endpointName in endpoints) {
        const endpoint = endpoints[endpointName];

        if (endpoint.constructor === RouteHandlerClass) {
          app.use(route, middlware, createHandler(endpoint, transport))
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
      const EndpointClass = endpointsTypes[endpointName];

      result[endpointName] = new EndpointClass(databasePorts);
    }
  }

  return result as ServerPorts;
}