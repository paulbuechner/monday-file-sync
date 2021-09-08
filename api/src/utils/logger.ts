import winston, { format as _format, transports as _transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import {
  DATE_FORMAT_MOMENT,
  DATE_HOUR_FORMAT,
  LOG_DIR_PREFIX,
} from "../constants";

// levels
const config: winston.config.AbstractConfigSet = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
    change: 8,
    upload: 9,
  },
  colors: {
    emerg: "red",
    alert: "yellow",
    crit: "red",
    error: "red",
    warning: "yellow",
    notice: "blue",
    info: "green",
    debug: "yellow",
    change: "yellow",
    upload: "green",
  },
};

// formats
const customFormat = winston.format.printf((i) => {
  return `${i.level.toUpperCase()}: ${i.timestamp} ${i.message}`;
});

const customJSONFormat = winston.format.printf((i) => {
  return `{"level":"${i.level}","timestamp":"${
    i.timestamp
  }","msg":"${i.message.replace(/\\/gu, "\\\\")}","additional_info":"${
    i.additional_info
  }"}`;
});

const errorFilter = winston.format((info, _) => {
  return info.level === "error" ? info : false;
});

const changeFilter = winston.format((info, _) => {
  return info.level === "change" ? info : false;
});

const uploadFilter = winston.format((info, _) => {
  return info.level === "upload" ? info : false;
});

// file rotation
const changeTransport: DailyRotateFile = new DailyRotateFile({
  filename: "change-%DATE%.log",
  dirname: `logs/${LOG_DIR_PREFIX}/change`,
  datePattern: DATE_FORMAT_MOMENT,
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "14d",
  format: _format.combine(
    _format.timestamp({
      format: DATE_HOUR_FORMAT,
    }),
    changeFilter(),
    customJSONFormat
  ),
});

const combinedTransport: DailyRotateFile = new DailyRotateFile({
  filename: "combined-%DATE%.log",
  dirname: `logs/${LOG_DIR_PREFIX}/combined`,
  datePattern: DATE_FORMAT_MOMENT,
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "14d",
  format: _format.combine(
    _format.timestamp({
      format: DATE_HOUR_FORMAT,
    }),
    customFormat
  ),
});

const errorTransport: DailyRotateFile = new DailyRotateFile({
  filename: "error-%DATE%.log",
  dirname: `logs/${LOG_DIR_PREFIX}/error`,
  datePattern: DATE_FORMAT_MOMENT,
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "14d",
  format: _format.combine(
    _format.timestamp({
      format: DATE_HOUR_FORMAT,
    }),
    errorFilter(),
    customJSONFormat
  ),
});

const uploadTransport: DailyRotateFile = new DailyRotateFile({
  filename: "upload-%DATE%.log",
  dirname: `logs/${LOG_DIR_PREFIX}/upload`,
  datePattern: DATE_FORMAT_MOMENT,
  zippedArchive: false,
  maxSize: "20m",
  maxFiles: "14d",
  format: _format.combine(
    _format.timestamp({
      format: DATE_HOUR_FORMAT,
    }),
    uploadFilter(),
    customJSONFormat
  ),
});

winston.addColors(config.colors);

// extend types with custom levels
type CustomLevels = {
  change: winston.LeveledLogMethod;
  upload: winston.LeveledLogMethod;
} & winston.Logger;

export const logger: CustomLevels = winston.createLogger({
  level: "upload",
  levels: config.levels,
  transports: [
    changeTransport,
    combinedTransport,
    errorTransport,
    uploadTransport,
    new _transports.Console({
      format: _format.combine(
        _format.colorize(),
        _format.timestamp({
          format: DATE_HOUR_FORMAT,
        }),
        customFormat
      ),
    }),
  ],
  exitOnError: false,
}) as CustomLevels;
