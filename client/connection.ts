import { ServerPort } from "../infrastructure/serverPort";
import ClientPort from "../infrastructure/clientPort";
import Transport from "../infrastructure/transport"
import { ServerPorts, ClientPorts } from "../features/ports";
import * as endpointTypes from "../features/endpoints";
import * as transportTypes from "../features/transportTypes";
import routes from "../server/routes";

export class Connection<TServerPort extends ServerPort<any, any>> implements ClientPort<TServerPort> {
  constructor(private route: string, private transport: Transport) {}
  async execute(params) {
    const data = this.transport.serialize(params);
    const response = await fetch(window.location.origin + this.route, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const result = this.transport.parse(await response.json());

    return result;
  }
}

export function getConnectionsFromPorts() {
  const connections: Partial<ClientPorts> = {};
  const transport = new Transport(transportTypes);

  for (const endpointName in endpointTypes) {
    if (endpointTypes.hasOwnProperty(endpointName)) {
      const endpoint = endpointTypes[endpointName];
      for (const routePath in routes) {
        if (routes.hasOwnProperty(routePath)) {
          const routeEndpoint = routes[routePath];
          if (endpoint == routeEndpoint) {
            connections[endpointName] = new Connection(routePath, transport)
          }
        }
      }
    }
  }

  return connections as ClientPorts;
}