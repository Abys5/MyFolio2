import Express from 'express';

export default ((): Express.Router => {
    const ProjectRouter = Express.Router();

    ProjectRouter.all('/status', (req, res) => {
        res.json({
            status: {
                route: '/api/v1/project/status',
                msg: 'OK',
            },
        });
    });

    return ProjectRouter;
})();
