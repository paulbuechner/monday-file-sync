import { mondayClient } from "../client/monday";

const monday = mondayClient();

type BoardsQueryResponse =
  | {
      data: { boards: { id: string; name: string }[] };
      account_id: string;
    }
  | undefined;

type BoardsProps = { id: string; name: string };

export async function getAllBoards(): Promise<BoardsProps[] | undefined> {
  const res: BoardsQueryResponse = await monday.api(
    `query {
      boards {
        id
        name
      }
    }`
  );
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
      account_id: string;
    }
  | undefined;

export type ItemProps = {
  id: string;
  name: string;
  group: { title: string; color: string };
  column_values: { id: string; value: string }[];
};

type BoardProps = {
  groups: { title: string }[];
  items: ItemProps[];
};

export async function getItems(
  boardId: string
): Promise<BoardProps | undefined> {
  const res: BoardQueryResponse = await monday.api(
    `query {
      boards(ids: [${boardId}]) {
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
          column_values(ids: "datei") {
            id
            value
          }
        }
      }
    }`
  );

  if (res?.data) {
    return res.data.boards[0];
  }

  return undefined;
}

// getItems("1507965305");
