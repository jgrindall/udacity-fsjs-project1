import { Request, Response, NextFunction } from 'express';
import type { RequestHandler } from "express";

const logger:RequestHandler = (req:Request, res:Response, next:NextFunction)=>{
    console.log('logger,', req.path, req.url);
    console.log(req.originalUrl);
    next();
};

export default logger;