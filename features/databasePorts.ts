import * as Collections from "./collections";

export type CollectionConstructors = typeof Collections;
export type PortForConstructor<T> = T extends { new(...args: any): infer P }
  ? P
  : never;
export type DatabasePorts = {
  [P in keyof CollectionConstructors]: PortForConstructor<CollectionConstructors[P]>;
}