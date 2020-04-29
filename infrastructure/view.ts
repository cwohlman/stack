import React from "react";
import ClientPort from "./clientPort";

export interface ViewParams {
  ports: ClientPort<any>[];
}
export type View = (params: ViewParams) => React.ReactElement;
