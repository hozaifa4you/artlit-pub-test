import { Router } from "express";

import {
   book,
   deleteBook,
   getBooks,
   newBook,
   updateBook,
} from "@/books/controller";
import {
   getBookValidation,
   newBookValidation,
   updateBookValidations,
} from "@/middleware/validations";

const router = Router();

router.route("/").get(getBooks).post(newBookValidation, newBook);
router
   .route("/:id")
   .get(getBookValidation, book)
   .delete(getBookValidation, deleteBook)
   .put(updateBookValidations, updateBook);

export default router;
