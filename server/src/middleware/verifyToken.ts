import jwt from "jsonwebtoken";
import { Request as ExpressRequest, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { DecodedToken } from "../controllers/clients.c";

dotenv.config();

const { ACCESS_TOKEN_SECRET } = process.env;

interface Request extends ExpressRequest {
    userid?: string;
    useremail?: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies?.token || req.headers["x-access-token"]

    if(!accessToken) return res.status(401).json({msg: "anauthorised"})

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET!, (err: any, decode: any ): void => {
        if(err) {
            res.status(403).json({msg:"forbidden"});
            return;
        }
        req.userid = decode.id;
        req.useremail = decode.email;
        next()
    })
}