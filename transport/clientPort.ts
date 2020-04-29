import ServerPort, { ServerRequest, ServerResponse } from "./serverPort";

export default abstract class ClientPort<TPort extends ServerPort<any, any>> {
  abstract async execute(request: ServerRequest<TPort>): Promise<ServerResponse<TPort>>
}