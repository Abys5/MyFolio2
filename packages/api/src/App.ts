import Express from 'express';

import API from './routes';

class Server {
    public expressApp: Express.Express;
    public port: number;

    constructor(
        middlewares: ((
            req: Express.Request,
            res: Express.Response,
            next: Express.NextFunction,
        ) => void)[],
    ) {
        this.expressApp = Express();
        this.port = Number(process.env.PORT) || 3000;

        this.initMiddleware(middlewares);
        this.initRoutes();
    }

    private initMiddleware(
        middlewares: ((
            req: Express.Request,
            res: Express.Response,
            next: Express.NextFunction,
        ) => void)[],
    ): void {
        middlewares.forEach((middleware) => {
            this.expressApp.use(middleware);
        });
    }

    private initRoutes(): void {
        this.expressApp.use('/api', API);
    }

    public listen(): void {
        this.expressApp.listen(this.port, () => {
            console.log('[*] MyFolio API has Started on Port: ' + this.port);
        });
    }
}
export default Server;
