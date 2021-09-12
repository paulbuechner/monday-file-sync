<h1 align="center">🔁 Monday File Sync</h1>

<p align="center">
  <img alt="Codacy Badget" src="https://app.codacy.com/project/badge/Grade/2394e50329994765934a964e0dfab8e2"/>
  <img alt="MIT License" src="https://img.shields.io/apm/l/atomic-design-ui.svg?"/>
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/paulbuechner/monday-file-sync"/>
  <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/paulbuechner/monday-file-sync"/>
</p>
<br />

Monday File Sync allows you to keep your local files synchronized with your monday dashboards.

## Installation

### Directly

Clone or fork this repository then execute:

```bash
  # Install api dependencies
  cd api
  npm install
```

Also make sure to install the global dependencies listet in `api/package.json` -> `global dependencies`

### Docker

Currently only added configuration boilerplate. Not actually working.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Development Environment

- `DEV_MONDAY_API_KEY`: Monday API Key
- `DEV_WATCH_PATH`: Path/Directory to listen for file changes (default to: `__tests__`)
- `DEV_NOTIFICATION_IDS`: User IDs to receive monday notifiactions
- `DEV_BOARD_CARRIER_ID`: Board Carrier ID to include in notification when no board was found

### Production Environment

- `PROD_MONDAY_API_KEY`: Monday API Key
- `PROD_WATCH_PATH`: Path/Directory to listen for file changes
- `PROD_NOTIFICATION_IDS`: User IDs to receive monday notifiactions
- `PROD_BOARD_CARRIER_ID`: Board Carrier ID to include in notification when no board was found

## API

```javascript
// Example of a typical implementation structure

// Initialize watcher.
const watcher = chokidar.watch(
  __prod__ ? `${PROD_WATCH_PATH!}/**/*.pdf` : `${DEV_WATCH_PATH!}/**/*.pdf`,
  {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  }
);

// Log detected file changes
watcher.on("change", (event, _) => {
  logger.change(event);
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
schedule.scheduleJob("0 2 * * *", () => {
  handleUpload();
});
```

`chokidar.watch(paths, [options])`

- `paths` (string or array of strings). Paths to files, dirs to be watched
  recursively, or glob patterns. - Note: globs must not contain windows separators (`\`),
  because that's how they work by the standard —
  you'll need to replace them with forward slashes (`/`). - Note 2: for additional glob documentation, check out low-level
  library: [picomatch](https://github.com/micromatch/picomatch).
- `options` (object) Options object as defined here: [Chokidar](https://github.com/paulmillr/chokidar)

## Usage

The application is wrapped with `PM2` to keep the application running and provide better monitoring. For more information visit: [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/). Chokidar will initialize a watcher detecting file changes over the day and will log them under `logs/changes`. The scheduled node job `/index.ts` will take care of uploading the files at the specified time (default: 2am).

```bash
cd api

# Build the application
npm run build

# Run the app in dev-mode
npm run pm2:start:dev

# Run the app in prod-mode
npm run pm2:start:prod
```

To test individual functionalities run: `npm run watch:file:dev/prod path/to/file` (relative)

## Flowchart

![diagram](https://user-images.githubusercontent.com/45827409/132483419-69923a0c-28d5-47f3-8e61-f6f9675c6fdb.png)
