/* eslint-disable @typescript-eslint/no-floating-promises */
import "dotenv-safe/config";
import chokidar from "chokidar";

import { logging } from "./resolvers/log";
import { upload } from "./resolvers/upload";

// Initialize watcher.
const watcher = chokidar.watch("src/__tests__", {
  ignored: /(^|[/\\])\../u, // ignore dotfiles
  persistent: true,
});

// One-liner for current directory
watcher.on("change", (event, path) => {
  console.log(event, path);

  // Query some information
  logging();

  // Upload file to monday
  upload(event);
});
