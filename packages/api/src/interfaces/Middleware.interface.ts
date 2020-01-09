import Express from 'express';

interface Middleware {
    req: Express.Request;
    res: Express.Response;
    next: Express.NextFunction;
}

export default Middleware;
