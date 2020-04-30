import { ServerPort } from "../infrastructure/serverPort";
import Transport from '../infrastructure/transport';

export default function createHandler(endpoint: ServerPort<any, any>, transport: Transport) {
  async function handle(req, res) {
    const data = transport.parse(req.body);
    const result = await endpoint.execute(data)
    const responseBody = JSON.stringify(transport.serialize(result));
    
    res.end(responseBody);
  }
  return (req, res) => {
    handle(req, res).catch(e => res.end(e.stack));
  }
}