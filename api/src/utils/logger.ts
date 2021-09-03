import { format } from "date-fns";
import winston, { format as _format, transports as _transports } from "winston";

import { DATE_FORMAT, DATE_HOUR_FORMAT, LOG_DIR_PREFIX } from "../constants";

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
    //
    // - Write all logs with level `error` and below to `logs/error/error.log`
    // - Write all logs with level `info` and below to `logs/combined/combined.log`
    //
    new _transports.File({
      filename: `logs/${LOG_DIR_PREFIX}/change/change-${format(
        new Date(),
        DATE_FORMAT
      )}.log`,
      format: _format.combine(
        _format.timestamp({
          format: DATE_HOUR_FORMAT,
        }),
        changeFilter(),
        customJSONFormat
      ),
    }),
    new _transports.File({
      filename: `logs/${LOG_DIR_PREFIX}/upload/upload-${format(
        new Date(),
        DATE_FORMAT
      )}.log`,
      format: _format.combine(
        _format.timestamp({
          format: DATE_HOUR_FORMAT,
        }),
        uploadFilter(),
        customJSONFormat
      ),
    }),
    new _transports.File({
      filename: `logs/${LOG_DIR_PREFIX}/error/error-${format(
        new Date(),
        DATE_FORMAT
      )}.log`,
      level: "error",
      format: _format.combine(
        _format.timestamp({
          format: DATE_HOUR_FORMAT,
        }),
        errorFilter(),
        customJSONFormat
      ),
    }),
    new _transports.File({
      filename: `logs/${LOG_DIR_PREFIX}/combined/combined-${format(
        new Date(),
        DATE_FORMAT
      )}.log`,
      format: _format.combine(
        _format.timestamp({
          format: DATE_HOUR_FORMAT,
        }),
        customFormat
      ),
    }),
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
