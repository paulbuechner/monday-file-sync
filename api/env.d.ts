declare namespace NodeJS {
  type ProcessEnv = {
    NODE_ENV: "development" | "production";
    MONDAY_API_KEY: string;
  };
}
