import express from 'express';
import logger from '../middleware/logger';
import validator from '../middleware/validator';
import {Resizer} from '../../utilities/utils';
import {validationResult} from "express-validator";

export default express.Router()
    .get('/images2', logger, validator, async (req: express.Request, res: express.Response) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(422)
                    .send(errors.array().map(e => e.msg).join(","));
            }
            const filename: string = req.query.filename as string;
            const width: string = req.query.width as string;
            const height: string = req.query.height as string;

            const resizer = new Resizer(filename, parseInt(width), parseInt(height));
            resizer.setInputDir("../../assets");
            resizer.setOutputDir("../../assets/out");
            try {
                resizer
                    .process()
                    .then(()=>{
                        return res
                            .status(200)
                            .send(filename + ',' + width + ',' + height + ' ' + typeof height);
                    })
                    .catch((e:any)=>{
                        console.log(e);
                        return res
                            .status(500)
                            .send(e);
                    })
            }
            catch (e) {
                console.log("error resizing");
            }
        }
    );
