/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  DEV_BOARD_CARRIER_ID,
  DEV_NOTIFICATION_IDS,
  LOG_ERROR_PATH,
  LOG_UPLOAD_PATH,
  PROD_BOARD_CARRIER_ID,
  PROD_NOTIFICATION_IDS,
  __prod__,
} from "../constants";
import { sendNotification } from "../mutations/notification";
import { readLogs } from "./logReader";

export async function sendNotificationReport() {
  const receivers = __prod__
    ? PROD_NOTIFICATION_IDS!.split(",")
    : DEV_NOTIFICATION_IDS!.split(",");

  const uploads = await readLogs(LOG_UPLOAD_PATH);
  const errors = await readLogs(LOG_ERROR_PATH);

  // upload notifications
  if (uploads) {
    for (const upload of uploads) {
      for (const receiver of receivers) {
        await sendNotification(receiver, upload.additional_info, upload.msg);
      }
    }
  }

  // error notifications
  if (errors) {
    // fallback Id if no board Id is provided
    const fallback = __prod__ ? PROD_BOARD_CARRIER_ID! : DEV_BOARD_CARRIER_ID!;

    for (const error of errors) {
      const target =
        error.additional_info === "undefined"
          ? fallback
          : error.additional_info;

      for (const receiver of receivers) {
        await sendNotification(receiver, target, error.msg);
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// sendNotificationReport();
