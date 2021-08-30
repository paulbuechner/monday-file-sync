import { getAllBoards, getItems } from "../queries/board";
import type { FilteredItemsProps, FilterProps } from "./filter";
import { filterItems, filterPath } from "./filter";

type UploadDirProps = {
  filteredItems: FilteredItemsProps;
  filteredPath: FilterProps;
};

export async function getUploadDir(
  file: string
): Promise<UploadDirProps | undefined> {
  // get dir, filename, fileextension from path
  const filteredPath = filterPath(file);

  // get all boards
  const boards = await getAllBoards();
  // console.log(boards);

  // when filteredPath OR boards is undefined -> throw ERROR
  if (!boards || !filteredPath) {
    console.error(
      "Oh no! 😕 Something went wrong: Either filtered-path or boards is undefined"
    );

    return;
  }

  // get boardId for filtered path
  const boardId = boards.filter((b) => b.name.includes(filteredPath.dir));
  // console.log("Board-ID:", boardId);

  // when boardId is undefined OR len(boardId) > 1 -> throw ERROR
  if (!boardId || boardId.length > 1) {
    console.error(
      "Oh no! 😕 Something went wrong: Couldn't find specific boardId for given filter"
    );

    return;
  }

  // get all board infomaton for further processing
  const board = await getItems(boardId[0].id);
  // console.log(board);

  // when no board for given boardId is found -> throw ERROR
  if (!board) {
    console.error(
      "Oh no! 😕 Something went wrong: Couldn't find board for given boardId"
    );

    return;
  }

  // check for duplicate named groups
  if (new Set(board.groups.map((g) => g.title)).size !== board.groups.length) {
    console.error(
      "Oh no! 😕 Something went wrong: Check groups naming convention. Identical named groups detected."
    );

    return;
  }

  // get the itemId including previous files with the given filename to upload to
  const filteredItems = filterItems(board.items, filteredPath.filename);

  return { filteredItems, filteredPath };
}
