import "dotenv-safe/config";
import chokidar from "chokidar";

import { logging } from "./resolvers/log";

// Initialize watcher.
const watcher = chokidar.watch("src/sfi", {
  ignored: /(^|[/\\])\../u, // ignore dotfiles
  persistent: true,
});

// One-liner for current directory
watcher.on("change", (event, path) => {
  console.log(event, path);

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  logging();
});
