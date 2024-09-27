import mongoose from "mongoose";
import { logger } from "./logger";
import { mongo } from "./constants";

export default function connectDB() {
  try {
    mongoose.connect(mongo.connectionString);
  } catch (err: any) {
    logger.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    logger.info(`Database connected: ${mongo.connectionString}`);
  });

  dbConnection.on("error", (err) => {
    logger.error(`String ${mongo.connectionString}`);
    logger.error(`connection error: ${err}`);
  });
  return;
}
