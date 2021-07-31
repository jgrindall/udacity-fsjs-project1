import {query} from "express-validator";

const validatorOptions = {
    min: 1,
    max: 2048
};

const validator = [
    query('filename')
        .notEmpty()
        .withMessage("filename cannot be empty"),
    query('width')
        .isInt(validatorOptions)
        .withMessage("width error"),
    query('height')
        .isInt(validatorOptions)
        .withMessage("height error"),
];

export default validator;