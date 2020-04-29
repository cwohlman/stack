import { ServerPort } from "../../interfaces/serverPort";

export default class HomePageController implements ServerPort<string, string> {
  async execute(echo: string) {
    return echo;
  }
}
