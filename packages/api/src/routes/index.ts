import * as Express from 'express';
import V1 from './v1';

export default ((): Express.Router => {
    const API = Express.Router();

    API.use('/v1', V1);

    API.all('/status', (req, res) => {
        //console.log('Boop');
        res.json({
            status: {
                route: '/api/status',
                msg: 'OK',
            },
        });
    });

    return API;
})();
