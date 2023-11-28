import {NextFunction, Response} from "express";
import {AppRequest, USER_ROLES} from "../types";

function protectedRoute(req: AppRequest, res: Response, next: NextFunction) {
    const user = req.user as { username: string, role: USER_ROLES };

    if (user.role === 'admin') {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = protectedRoute;
