import { format } from "date-fns";

export const __prod__ = (process.env.NODE_ENV || "").trim() === "production";

// utils
export const DATE_FORMAT = "dd-MM-yyyy";
export const DATE_FORMAT_MOMENT = "DD-MM-yyyy";
export const DATE_HOUR_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const YESTERDAY = ((d) => new Date(d.setDate(d.getDate() - 1)))(
  new Date()
);

// env
export const {
  DEV_MONDAY_API_KEY,
  DEV_WATCH_PATH,
  DEV_NOTIFICATION_IDS,
  DEV_BOARD_CARRIER_ID,

  PROD_MONDAY_API_KEY,
  PROD_WATCH_PATH,
  PROD_NOTIFICATION_IDS,
  PROD_BOARD_CARRIER_ID,
} = process.env;

// logging
export const LOG_DIR_PREFIX = __prod__ ? "__prod__" : "__dev__";

export const LOG_ERROR_PATH = `logs/${LOG_DIR_PREFIX}/error/error-${format(
  new Date(),
  DATE_FORMAT
)}.log`;

export const LOG_UPLOAD_PATH = `logs/${LOG_DIR_PREFIX}/upload/upload-${format(
  new Date(),
  DATE_FORMAT
)}.log`;

export const LOG_CHANGE_PATH = `logs/${LOG_DIR_PREFIX}/change/change-${format(
  YESTERDAY,
  DATE_FORMAT
)}.log`;

// monday
export const API_V2_ENDPOINT = "https://api.monday.com/v2";
export const API_V2_FILE_ENDPOINT = "https://api.monday.com/v2/file";
