/* eslint-disable @typescript-eslint/no-floating-promises */
import "dotenv-safe/config";
import { watch } from "chokidar";
import schedule from "node-schedule";

// import { WATCH_PATH } from "./constants";
import { handleUpload } from "./utils/handleUpload";
import { logger } from "./utils/logger";

// Initialize watcher.
const watcher = watch(
  // absolute or relative path WATCH_PATH!
  "__tests__",
  {
    ignored: /(^|[/\\])\../u, // ignore dotfiles
    persistent: true,
  }
);

// One-liner for current directory
watcher.on("change", (event, _) => {
  console.info(event);
  console.log("Start batching...");

  setTimeout(() => {
    logger.change(event);
  }, 100);
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
schedule.scheduleJob("10 * * * * *", () => {
  console.log("The answer to life, the universe, and everything!");

  handleUpload();
});
