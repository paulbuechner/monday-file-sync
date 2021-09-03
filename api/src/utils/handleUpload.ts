/* eslint-disable no-await-in-loop */
import { LOG_CHANGE_PATH } from "../constants";
import { getAllBoards } from "../queries/board";
import { fileUpload } from "../resolvers/fileUpload";
import { getUploadDir } from "./getUploadDir";
import { readLogs } from "./logReader";
import { logger } from "./logger";
import { sendNotificationReport } from "./notificationReport";

// file upload handler
export async function handleUpload(): Promise<void> {
  // get upload position for file
  const files = await readLogs(LOG_CHANGE_PATH);

  if (files) {
    // get all boards
    const boards = await getAllBoards();
    // console.log(boards);

    // when boards is undefined -> throw ERROR
    if (!boards) {
      logger.error(
        `⛔ Oh no! Something went wrong: No Boards returned. <br><br> Please check API credentials.`
      );

      return;
    }

    for (const f of files) {
      const dir = await getUploadDir(f.msg, boards);

      if (dir) {
        // upload file to monday
        await fileUpload(f.msg, dir);
      }
    }

    // send notifications
    await sendNotificationReport();
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
handleUpload();
