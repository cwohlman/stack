import ClientPort from "../interfaces/clientPort";
import * as Controllers from "./controllers";

export type PortConstructors = typeof Controllers;
export type PortForConstructor<T> = T extends { new (...args: any): infer P }
  ? P
  : never;
export type ServerPorts = {
  [P in keyof PortConstructors]: PortForConstructor<PortConstructors[P]>;
};
export type ClientPorts = {
  [P in keyof ServerPorts]: ClientPort<ServerPorts[P]>;
};
