import { body, param } from "express-validator";

export const newBookValidation = [
   body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Name must be between 3 and 50 characters"),
   body("author")
      .notEmpty()
      .withMessage("Author is required")
      .isLength({ min: 3, max: 50 })
      .withMessage("Author must be between 3 and 50 characters"),
   body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
   body("images").optional().isArray().withMessage("Images must be an array"),
   body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
   body("publisher")
      .optional()
      .isString()
      .withMessage("Publisher must be a string"),
   body("user").notEmpty().withMessage("User is required"),
];

export const updateBookValidations = [
   param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isString()
      .withMessage("Invalid id type"),
   body("name")
      .optional()
      .isLength({ min: 3, max: 50 })
      .withMessage("Name must be between 3 and 50 characters"),
   body("author")
      .optional()
      .isLength({ min: 3, max: 50 })
      .withMessage("Author must be between 3 and 50 characters"),
   body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
   body("images").optional().isArray().withMessage("Images must be an array"),
   body("price").optional().isNumeric().withMessage("Price must be a number"),
   body("publisher")
      .optional()
      .isString()
      .withMessage("Publisher must be a string"),
];

export const getBookValidation = [
   param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isString()
      .withMessage("Invalid id type"),
];
