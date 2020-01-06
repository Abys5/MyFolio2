import * as Express from 'express';
import UserRouter from './user';

export default ((): Express.Router => {
    const V1 = Express.Router();
    V1.use('/user', UserRouter());

    V1.get('/status', (req, res) => {
        res.json({
            status: {
                route: '/api/v1/status',
                msg: 'OK',
            },
        });
    });

    return V1;
})();
