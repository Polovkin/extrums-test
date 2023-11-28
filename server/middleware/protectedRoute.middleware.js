"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function protectedRoute(req, res, next) {
    const user = req.user;
    if (user.role === 'admin') {
        next();
    }
    else {
        res.sendStatus(401);
    }
}
module.exports = protectedRoute;
