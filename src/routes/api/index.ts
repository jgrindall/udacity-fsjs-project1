import express from 'express';
import logger from '../middleware/logger';
import validator from '../middleware/validator';
import Resizer from '../../utilities/Resizer';
import resizerConfig from '../../utilities/ResizerConfig';
import {validationResult} from "express-validator";

export default express.Router()
    .get('/images', logger, validator, async (req: express.Request, res: express.Response) => {
            // get errors from the validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(422)
                    .send(errors.array().map(e => e.msg).join(","));
            }

            // input is valid
            const filename: string = req.query.filename as string;
            const width: number = parseInt(req.query.width as string);
            const height: number = parseInt(req.query.height as string);

            try {
                console.log('1');
                const resizer = new Resizer(resizerConfig.inputPath, resizerConfig.outputPath);
                resizer
                    .getResizedImage(filename + ".jpg", width, height)
                    .then((data) => {
                        return res
                            .type('image/jpg')
                            .status(200)
                            .end(data);
                    })
                    .catch((e: Error) => {
                        console.log(e, typeof e);
                        console.log('2');
                        return res
                            .status(500)
                            .send(e.message);
                    })
            }
            catch (e) {
                console.log('3');
                console.log("error resizing");
                return res
                    .status(500)
                    .send(e);
            }
        }
    );
