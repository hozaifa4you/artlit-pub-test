import { db } from "@/db";
import type { NextFunction, Request, Response } from "express";
import {
   body,
   Result,
   validationResult,
   type ErrorFormatter,
} from "express-validator";

/**
 * @description Get all books
 * @param req Request
 * @param res Response
 * @returns Books from db
 */
export const getBooks = async (req: Request, res: Response) => {
   const books = await db.books.findMany({});
   return res.status(200).json(books);
};

/**
 * @description Create a new book
 * @param req Request from express
 * @param res Response from express
 * @param next NextFunction from express
 * @returns books from db
 */
export const newBook = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         const errs: Result<{
            path: string;
            msg: string;
         }> = result.formatWith((error) => ({
            // @ts-ignore
            path: error.path,
            msg: error.msg,
         }));
         const errors = errs.array();
         return res.status(400).json(errors);
      }

      const { name, author, description, images, price, publisher, user } =
         req.body;

      const book = await db.books.create({
         data: {
            name,
            author,
            description,
            images,
            price,
            publisher,
            user,
         },
      });

      return res.status(201).json(book);
   } catch (error: any) {
      return next(error);
   }
};

/**
 * @description Get a book by id
 * @param req Request from express
 * @param res Response from express
 * @param next next function from express
 * @returns book from database
 */
export const book = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         const errs: Result<{
            path: string;
            msg: string;
         }> = result.formatWith((error) => ({
            // @ts-ignore
            path: error.path,
            msg: error.msg,
         }));
         const errors = errs.array();
         return res.status(400).json(errors);
      }

      const { id } = req.params;

      const book = await db.books.findFirst({
         where: {
            id,
         },
      });

      if (!book) {
         res.status(404);
         throw new Error("Book not found");
      }

      return res.status(200).json(book);
   } catch (error: any) {
      return next(error);
   }
};

/**
 * @description Delete a book by id
 * @param req Request from express
 * @param res Response from express
 * @param next next function from express
 * @returns delete success message
 */
export const deleteBook = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         const errs: Result<{
            path: string;
            msg: string;
         }> = result.formatWith((error) => ({
            // @ts-ignore
            path: error.path,
            msg: error.msg,
         }));
         const errors = errs.array();
         return res.status(400).json(errors);
      }

      const { id } = req.params;

      const book = await db.books.findFirstOrThrow({
         where: {
            id,
         },
      });

      if (!book) {
         res.status(404);
         throw new Error("Book not found");
      }

      await db.books.delete({
         where: {
            id,
         },
      });

      return res.status(200).json({ message: "Book deleted" });
   } catch (error: any) {
      return next(error);
   }
};

/**
 * @description update a existing book
 * @param req Request from express
 * @param res Response from express
 * @param next NextFunction from express
 * @returns books from db
 */
export const updateBook = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         const errs: Result<{
            path: string;
            msg: string;
         }> = result.formatWith((error) => ({
            // @ts-ignore
            path: error.path,
            msg: error.msg,
         }));
         const errors = errs.array();
         return res.status(400).json(errors);
      }

      const { name, author, description, images, price, publisher } = req.body;

      const book = await db.books.update({
         data: {
            name,
            author,
            description,
            images,
            price,
            publisher,
         },
         where: {
            id: req.params.id,
         },
      });

      return res.status(200).json(book);
   } catch (error: any) {
      return next(error);
   }
};
