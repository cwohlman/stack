import ClientPort from "../infrastructure/clientPort";
import * as Controllers from "./endpoints";

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
