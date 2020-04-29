export default abstract class ServerPort<TRequest, TResponse> {
  abstract async execute(request: TRequest): Promise<TResponse>
}

export type ServerRequest<TPort> = TPort extends ServerPort<infer TRequest, any> ? TRequest : never;
export type ServerResponse<TPort> = TPort extends ServerPort<any, infer TResponse> ? TResponse : never;
