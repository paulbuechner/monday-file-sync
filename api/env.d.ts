declare namespace NodeJS {
  type ProcessEnv = {
    NODE_ENV: string;
    DEV_MONDAY_API_KEY: string;
    DEV_WATCH_PATH: string;
    DEV_NOTIFICATION_IDS: string;
    DEV_BOARD_CARRIER_ID: string;
    PROD_MONDAY_API_KEY: string;
    PROD_WATCH_PATH: string;
    PROD_NOTIFICATION_IDS: string;
    PROD_BOARD_CARRIER_ID: string;
  };
}
