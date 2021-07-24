import mondaySdk from "monday-sdk-js";

import { MONDAY_API_KEY } from "./constants";

const monday = mondaySdk();
monday.setToken(MONDAY_API_KEY!);

export async function logging(): Promise<void> {
  await monday
    .api(`query { users { name } }`)
    .then((res) => {
      console.log(res.data.users);
      /* { data: { users: [{id: 12312, name: "Bart Simpson"}, {id: 423423, name: "Homer Simpson"}] } } */
    })
    .catch((error) => {
      console.log(error);
    });

  await monday
    .api(
      `query { boards(ids: 1507965305) { id name columns { id title type } } }`
    )
    .then((res) => {
      console.log(res.data);
      console.log(res.data.boards[0]);
    })
    .catch((error) => {
      console.log(error);
    });
}
