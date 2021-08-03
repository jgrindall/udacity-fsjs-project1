import express from "express";
import logger from "../middleware/logger";
import validator from "../middleware/validator";
import ResizerFactory from "../../utilities/ResizerFactory";
import {validationResult} from "express-validator";
import appRoot from "app-root-path";

const inputPath = appRoot + "/assets/";
const outputPath = appRoot + "/assets/out/";

export default express.Router()
    .get("/images", logger, validator, async (req: express.Request, res: express.Response) => {
            // get errors from the validation
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res
                    .status(422)
                    .send(errors.array().map(e => e.msg).join(","));
            }

            // input is valid
            const filename: string = req.query.filename as string;
            const width: number = parseInt(req.query.width as string);
            const height: number = parseInt(req.query.height as string);

            try {
                const resizer = ResizerFactory.getResizer(inputPath, outputPath);
                resizer
                    .getResizedImage(filename + ".jpg", {width, height})
                    .then(output => {
                        return res
                            .type("image/jpg")
                            // 200 - ok
                            // 201 - resource created
                            .status(output.fromCache ? 200 : 201)
                            .end(output.data);
                    })
                    .catch((e: Error) => {
                        return res
                            .status(500)
                            .send(e.message);
                    })
            }
            catch (e) {
                return res
                    .status(500)
                    .send(e);
            }
        }
    );
