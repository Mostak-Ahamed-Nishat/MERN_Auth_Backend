import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middleware/errorMiddleware.js";
import dbConnection from "./config/db.js";
import userRoute from "./route/userRoute.js";

dotenv.config();
const app = express();

//Default Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//API
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/v1", userRoute);

//Connect Database
dbConnection();

//Error Middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
