// import { DEV_WATCH_FILE } from "../constants";
import type { BoardsProps } from "../queries/board";
import { getItems } from "../queries/board";
import type { FilteredItemsProps, FilterProps } from "./filter";
import { filterItems, filterPath } from "./filter";
import { logger } from "./logger";

export type UploadDirProps = {
  filteredItems: FilteredItemsProps;
  filteredPath: FilterProps;
  boardId: string;
};

export async function getUploadDir(
  file: string,
  boards: BoardsProps[]
): Promise<UploadDirProps | undefined> {
  // get dir, filename, fileextension from path
  const filteredPath = filterPath(file);

  // when filteredPath is undefined -> throw ERROR
  if (!filteredPath) {
    logger.error(
      `⛔ Oh no! Something went wrong: Filtered path is undefined. <br> • ${file.replace(
        /\\/gu,
        "/"
      )} <br><br> Please Update the Board manually.`
    );

    return;
  }

  // get boardId for filtered path
  const boardId = boards.filter((b) => {
    if (b.description?.includes(filteredPath.dir)) {
      return b;
    }
  });
  // console.log("Board-ID:", boardId);

  if (boardId.length === 0) {
    logger.error(
      `⛔ Oh no! Something went wrong: Couldn't find boardId. <br><br> Reason 1: Did you forgot to include the Search Parameter (dir name) in the boards description? <br>  Reason 2: Board for given file doesn't exists. <br><br> • ${filteredPath.filename} <br><br> Please Update the Board manually.`
    );

    return;
  }

  if (boardId.length > 1) {
    logger.error(
      `⛔ Oh no! Something went wrong: Couldn't find boardId. <br><br> Descriptions Search Parameter detected in multiple boards. <br> ${[
        boardId,
      ]} <br><br> • ${
        filteredPath.filename
      } <br><br> Please Update the Board manually.`
    );

    return;
  }

  // get all board infomaton for further processing
  const board = await getItems(boardId[0].id);
  // console.log(board);

  // check if items for board returned
  if (!board) {
    logger.error(
      `⛔ Oh no! Something went wrong: Couldn't find board for given boardId. <br> • ${filteredPath.filename} <br><br> Please Update the Board manually.`,
      { additional_info: boardId[0].id }
    );

    return;
  }

  // check for duplicate named groups
  if (new Set(board.groups.map((g) => g.title)).size !== board.groups.length) {
    logger.error(
      `⛔ Oh no! Something went wrong: Check group names. Identical named groups detected. <br> • ${filteredPath.filename} <br><br> Please Update the Board manually.`,
      { additional_info: boardId[0].id }
    );

    return;
  }

  // get the itemId including previous files with the given filename to upload to
  const filteredItems = filterItems(board.items, filteredPath.filename);

  // check if filtered items id was found
  if (!filteredItems) {
    logger.error(
      `⛔ Oh no! Something went wrong: No reference file was found. <br><br> Reason 1: Please provide a properly named file, manually. <br> Reason 2: Referecnce filename doesn't match upload filename. <br><br> • ${filteredPath.filename} <br><br> Please Update the Board manually.`,
      { additional_info: boardId[0].id }
    );

    return;
  }

  return { filteredItems, filteredPath, boardId: boardId[0].id };
}
