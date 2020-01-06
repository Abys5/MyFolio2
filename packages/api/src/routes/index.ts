import * as Express from 'express';
import V1 from './v1/v1';

export default ((): Express.Router => {
    const API = Express.Router();

    API.use('/v1', V1);

    API.get('/status', (req, res) => {
        res.json({
            status: {
                route: '/api/status',
                msg: 'OK',
            },
        });
    });

    return API;
})();
