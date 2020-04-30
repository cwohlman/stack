import { ServerPort } from "../../infrastructure/serverPort";
import { DatabasePorts } from "../databasePorts";

export default class ProfileEndpoint implements ServerPort<{}, { name: string }> {
  constructor(
    private ports: DatabasePorts
  ) {}
  async execute() {
    return { name: 'Joshua' }
  }
}
