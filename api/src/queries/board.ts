import { mondayClient } from "../client/monday";

const monday = mondayClient();

type BoardsQueryResponse =
  | {
      data: { boards: BoardsProps[] };
      errors: { message: string; locations: unknown[] }[];
      account_id: string;
    }
  | undefined;

export type BoardsProps = { id: string; description: string };

export async function getAllBoards(): Promise<BoardsProps[] | undefined> {
  const res: BoardsQueryResponse = await monday.api(
    `query {
      boards (limit: 1000) {
        id
        description
      }
    }`
  );

  if (res?.errors) {
    console.log(res.errors);
  }

  if (res?.data) {
    return res.data.boards;
  }

  return undefined;
}

type BoardQueryResponse =
  | {
      data: {
        boards: BoardProps[];
      };
      errors: { message: string; locations: unknown[] }[];
      account_id: number;
    }
  | undefined;

export type ItemProps = {
  id: string;
  name: string;
  group: { title: string; color: string };
  column_values: { id: string; value: string }[];
};

type BoardProps = {
  id: string;
  groups: { title: string }[];
  items: ItemProps[];
};

export async function getItems(
  boardId: string
): Promise<BoardProps | undefined> {
  const res: BoardQueryResponse = await monday.api(
    `query {
      boards(ids: [${boardId}]) {
        id
        groups {
          title
        }
        items {
          id
          name
          group {
            title
            color
          }
          column_values {
            id
            value
          }
        }
      }
    }`
  );

  if (res?.errors) {
    console.log(res.errors);
  }

  if (res?.data) {
    return res.data.boards[0];
  }

  return undefined;
}
