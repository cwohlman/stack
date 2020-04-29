import { ServerPort, ServerRequest, ServerResponse } from "./serverPort";

export default interface ClientPort<TPort extends ServerPort<any, any>> {
  execute(request: ServerRequest<TPort>): Promise<ServerResponse<TPort>>;
}
