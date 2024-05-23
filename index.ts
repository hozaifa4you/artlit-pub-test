import express from "express";
import morgan from "morgan";
import cors from "cors";

import booksRouter from "@/books/routes";
import { errorHandler, notFound } from "@/middleware/error";

const app = express();
const port = Bun.env.PORT || 3000;

const middleware = [
   morgan("dev"),
   cors({ origin: Bun.env.CORS_ORIGIN, credentials: true }),
   express.json({ limit: "10mb" }),
   express.urlencoded({ extended: false }),
];
app.use(middleware);

app.use("/api/v1/books", booksRouter);

app.use([notFound, errorHandler]);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
