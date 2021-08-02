import {query} from "express-validator";

// min and mas sizes for our image
const validatorOptions = {
    min: 1,
    max: 2048
};

const validator = [
    query("filename")
        .notEmpty()
        .withMessage("filename error - filename cannot be empty"),
    query("width")
        .isInt(validatorOptions)
        .withMessage("width error - check your width is a whole number between 1 and 2048"),
    query("height")
        .isInt(validatorOptions)
        .withMessage("height error - check your height is a whole number between 1 and 2048")
];

export default validator;
