import express from 'express';
import logger from './logger';

const r = express.Router();

r.get('/', logger, (req, res)=>{res.send('r1')});

export default r;