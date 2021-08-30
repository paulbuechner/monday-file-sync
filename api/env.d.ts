declare namespace NodeJS {
  type ProcessEnv = {
    NODE_ENV: "development" | "production";
    WATCH_PATH: string;
    MONDAY_API_KEY: string;
  };
}
