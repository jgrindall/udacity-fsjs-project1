import { Request, Response, NextFunction } from 'express';

export default function(req:Request, res:Response, next:NextFunction){
    console.log('logger,', req.path, req.url);
    console.log(req.originalUrl);
    next();
};