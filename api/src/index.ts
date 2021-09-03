/* eslint-disable @typescript-eslint/no-floating-promises */
import "dotenv-safe/config";
import { watch } from "chokidar";
import schedule from "node-schedule";

import { DEV_WATCH_PATH, PROD_WATCH_PATH, __prod__ } from "./constants";
import { handleUpload } from "./utils/handleUpload";
import { logger } from "./utils/logger";

// Initialize watcher.
const watcher = watch(__prod__ ? PROD_WATCH_PATH! : DEV_WATCH_PATH!, {
  ignored: /(^|[/\\])\../u, // ignore dotfiles
  persistent: true,
});

// One-liner for current directory
watcher.on("change", (event, _) => {
  console.log("batching...");

  setTimeout(
    () => {
      logger.change(event);
    },
    // batching in prod 5sec
    __prod__ ? 5000 : 100
  );
});

/*  *    *    *    *    *    *
 *  ┬    ┬    ┬    ┬    ┬    ┬
 *  │    │    │    │    │    │
 *  │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
 *  │    │    │    │    └───── month (1 - 12)
 *  │    │    │    └────────── day of month (1 - 31)
 *  │    │    └─────────────── hour (0 - 23)
 *  │    └──────────────────── minute (0 - 59)
 *  └───────────────────────── second (0 - 59, OPTIONAL)
 */
schedule.scheduleJob("* * 2 * * *", () => {
  handleUpload();
});
