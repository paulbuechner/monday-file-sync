import { mondayClient } from "../client/monday";

const monday = mondayClient();

type UsersQueryResponse =
  | {
      data: {
        users: {
          id: string;
          name: string;
        }[];
      };
    }
  | undefined;

type UserProps = { id: string; name: string };

export async function getAllUsers(): Promise<UserProps[] | undefined> {
  try {
    const res: UsersQueryResponse = await monday.api(
      `query {
        users {
          id
          name
        }
      }`
    );

    // console.log(res?.data.users);

    return res?.data.users;
  } catch (error) {
    console.log(error);
  }

  return undefined;
}
