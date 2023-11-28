import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AppRequest} from "../types";
import {secret} from "../modules/auth/auth.service";

function authenticateToken(req: AppRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = authenticateToken;
