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
      errors: { message: string; locations: unknown[] }[];
    }
  | undefined;

type UserProps = { id: string; name: string };

export async function getAllUsers(): Promise<UserProps[] | undefined> {
  const res: UsersQueryResponse = await monday.api(
    `query {
        users {
          id
          name
        }
      }`
  );

  if (res?.errors) {
    console.log(res.errors);
  }

  if (res?.data) {
    return res.data.users;
  }

  return undefined;
}
