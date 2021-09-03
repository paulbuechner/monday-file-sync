import mondaySdk from "monday-sdk-js";

import {
  DEV_MONDAY_API_KEY,
  PROD_MONDAY_API_KEY,
  __prod__,
} from "../constants";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mondayClient = () => {
  // init monday client
  const client = mondaySdk();

  // set monday api key
  client.setToken(__prod__ ? PROD_MONDAY_API_KEY! : DEV_MONDAY_API_KEY!);

  return client;
};
