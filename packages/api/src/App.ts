import Express from 'express';
import { createConnection, Connection } from 'typeorm';

import API from './routes';
import Middleware from './interfaces/Middleware.interface';

import DotENV from 'dotenv';

/*
 * @Server((Request, Responce, NextFunction)[])
 * Desc: Takes in Middleware Array and Constructs a Express Application
 */
class Server {
    public expressApp: Express.Express;
    public port: number;
    public dbConnection: Connection | undefined;

    constructor(middlewares: Middleware[]) {
        DotENV.config();
        this.expressApp = Express();
        this.port = Number(process.env.PORT) || 5000;

        this.initDatabase().then(() => {
            this.initMiddleware(middlewares);
            this.initRoutes();
        });
    }

    /*
     * @this.initMiddleware((Request, Responce, NextFunction)[]): void
     * Desc: Adds all middleware to this.expressApp
     */
    private initMiddleware(middlewares: Middleware[]): void {
        middlewares.forEach((middleware: Middleware | any) => {
            this.expressApp.use(middleware);
        });
    }

    /*
     * @this.initRoutes(void): void
     * Desc: Loads Predefined Route into this.expressApp
     */
    private initRoutes(): void {
        this.expressApp.use('/api', API);
    }

    private async initDatabase(): Promise<void> {
        this.dbConnection = await createConnection();
    }

    /*
     *  @this.listen(void): void
     *  Desc: Starts the Server Listening
     *  on specific Port (this.port)
     */
    public listen(): void {
        this.expressApp.listen(this.port, () => {
            console.log('[*] MyFolio API has Started on Port: ' + this.port);
        });
    }
}
export default Server;
