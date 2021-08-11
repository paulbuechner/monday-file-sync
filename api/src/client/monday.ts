import mondaySdk from "monday-sdk-js";

import { MONDAY_API_KEY } from "../constants";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mondayClient = () => {
  // init monday client
  const client = mondaySdk();

  // set monday api key
  client.setToken(MONDAY_API_KEY!);

  return client;
};
