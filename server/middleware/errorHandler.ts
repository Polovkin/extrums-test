
import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {

    console.error(err);

    const errorCode = err.status || 500;

    res.status(errorCode).json({ error: err.message });
}

export default errorHandler;
