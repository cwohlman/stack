import { ServerPort } from "../../infrastructure/serverPort";

export default class ProfileEndpoint implements ServerPort<{}, { name: string }> {
  async execute() {
    return { name: 'Joshua' }
  }
}
