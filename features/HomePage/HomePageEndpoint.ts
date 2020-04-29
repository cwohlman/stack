import { ServerPort } from "../../interfaces/serverPort";

export default class HomePageEndpoint implements ServerPort<string, string> {
  async execute(echo: string) {
    return echo;
  }
}
