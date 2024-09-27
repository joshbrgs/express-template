import dotenv from "dotenv";
dotenv.config();

import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import session from "express-session";
import passport from "./utils/passport";
import { logger } from "./utils/logger";
import { morganMiddleware } from "./utils/middleware/morgan.middleware";
import connectDB from "./utils/db";
import userRoutes from "./routes/userRoutes";
const app: Express = express();
const port = process.env.PORT || 8080;

app.use(session({
  secret: process.env.SECRET_KEY || "my-little-secret",
  resave: false,
  saveUninitialized: false,
}));

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", userRoutes);

connectDB();

app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    logger.error(`Global error: ${err.message}`);
    res.status(500).json({ error: err.message });
  },
);

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
