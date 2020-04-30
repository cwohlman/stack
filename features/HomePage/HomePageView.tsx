import React, { useEffect } from "react";
import { ClientPorts } from "../ports";

export default function HomePageView({ ports }: { ports: ClientPorts }) {
  console.log(ports);
  useEffect(() => {
    ports.ProfileEndpoint.execute({}).then(data => console.log(data))
  }, [])
  return <div>TODO</div>;
};
