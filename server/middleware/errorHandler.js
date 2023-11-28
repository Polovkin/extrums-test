"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    console.error(err);
    const errorCode = err.status || 500;
    res.status(errorCode).json({ error: err.message });
}
exports.default = errorHandler;
