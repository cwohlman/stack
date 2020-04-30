import { ServerPort } from "../../infrastructure/serverPort";
import { DatabasePorts } from "../databasePorts";

export default class ProfileEndpoint implements ServerPort<any, any> {
  constructor(
    private ports: DatabasePorts
  ) {}
  async execute(params: any) {
    return this.ports.ProfileCollection.getOrCreate('x')
  }
}
