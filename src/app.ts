import cors from "cors";
import "dotenv-safe/config";
import express from "express";

import "reflect-metadata";
import { CORS_ORIGIN } from "./utils/constants";

const main = async () => {
  const app = express();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    })
  );

  app.listen("4000", () => {
    console.log(`🚀 Server ready! Listening at http://localhost:4000`);
  });
};

main().catch((error) => {
  console.error(error);
});
