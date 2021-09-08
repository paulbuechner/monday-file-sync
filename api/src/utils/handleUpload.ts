/* eslint-disable no-await-in-loop */
import { LOG_CHANGE_PATH, LOG_UPLOAD_PATH } from "../constants";
import { getAllBoards } from "../queries/board";
import { fileUpload } from "../resolvers/fileUpload";
import { filterPath } from "./filter";
import { getUploadDir } from "./getUploadDir";
import { readLogs } from "./logReader";
import { logger } from "./logger";
import { sendNotificationReport } from "./notificationReport";

// file upload handler
export async function handleUpload(): Promise<void> {
  // read in file changes
  const files = await readLogs(LOG_CHANGE_PATH);

  // read in uploads (upload protection for forced restart)
  const uploads = await readLogs(LOG_UPLOAD_PATH);

  if (files) {
    // get all boards
    const boards = await getAllBoards();

    // when boards is undefined -> throw ERROR
    if (!boards) {
      logger.error(
        `⛔ Oh no! Something went wrong: No Boards returned. <br><br> Please check API credentials.`
      );

      return;
    }

    for (const f of files) {
      if (
        // upload protection: only upload files that are not already uploaded
        !uploads?.filter((u) => u.msg.includes(filterPath(f.msg)!.filename))
      ) {
        const dir = await getUploadDir(f.msg, boards);

        if (dir) {
          // upload file to monday
          await fileUpload(f.msg, dir);
        }
      }
    }
  }

  // send notifications
  await sendNotificationReport();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// handleUpload();
