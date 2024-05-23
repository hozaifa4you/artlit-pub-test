import type { Request, Response, NextFunction } from "express";

import { HttpException, ErrorType } from "@/libs/HttpException";

export const notFound = (
   req: Request,
   res: Response,
   next: NextFunction
): Response | void => {
   const message: string =
      `The requested path was not found ` + req.originalUrl;

   return next(new HttpException(message, 404, null));
};

export const errorHandler = (
   err: HttpException,
   req: Request,
   res: Response,
   next: NextFunction
): Response => {
   let status: number = err.status || 500;
   let message: string = err.message || "Internal server error!";
   let errors: object[] = [];

   // HACK Validation error
   if (err.name === ErrorType.ValidationError) {
      message = "user validation failed!";
      errors = Object.values(err.errors!).map((pro: any) => pro?.properties);
      status = 400;
   }

   // HACK mongoose cast error
   if (err.name === ErrorType.CastError) {
      message = "The requested id is not valid!";
      status = 406;
   }

   // HACK duplicate error
   if (err.code === ErrorType.MongoDuplicateError) {
      const key: string[] = Object.keys(err?.keyValue!);
      const value: string[] = Object.values(err?.keyValue!);

      message = `Duplicate value entered ${key[0]} as '${value[0]}'`;
      status = 406;
   }

   // HACK no directory error
   if (err.code?.toString() === ErrorType.NoDirError) {
      message = "File not found or path is invalid!";
      status = 404;
   }

   return res.status(status).json({
      success: false,
      stack: Bun.env.NODE_ENV === "development" ? err.stack : null,
      message,
      errors: errors.length > 0 ? errors : null,
   });
};
