/* eslint-disable no-console */
import "dotenv-safe/config";
import mondaySdk from "monday-sdk-js";
import nodemon from "nodemon";

import config from "../nodemon.json";
import { MONDAY_API_KEY } from "./utils/constants";
import { upload } from "./utils/upload";

const monday = mondaySdk();
monday.setToken(MONDAY_API_KEY!);

async function logging() {
  await monday.api(`query { users { name } }`).then((res) => {
    console.log(res.data.users);
    /* { data: { users: [{id: 12312, name: "Bart Simpson"}, {id: 423423, name: "Homer Simpson"}] } } */
  });

  await monday
    .api(
      `query { boards(ids: 1507965305) { id name columns { id title type } } }`
    )
    .then((res) => {
      console.log(res.data);
      console.log(res.data.boards[0]);
    });
}

nodemon(config);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
nodemon.on("restart", async (files) => {
  // process files
  console.log(files);

  await logging();
  await upload();
});
