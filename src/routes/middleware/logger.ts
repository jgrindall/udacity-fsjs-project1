import { Request, Response, NextFunction } from "express";

export default function(req:Request, res:Response, next:NextFunction):void{
    console.log("LOG REQUEST", req.path, req.url, req.originalUrl);
    next();
}