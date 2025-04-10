import {Router} from 'express';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
    res.json({
        title: 'SubTrack API',
        version: '0.0.1',
        author: 'durjoydutta',
        description: 'An api built specifically for managing and tracking your subscription service',
        github: 'https://github.com/durjoydutta/subtrack',
        license: 'MIT',
        status: 'online',
        status_code: 200,
        timestamp: new Date().toDateString(),
    });
})

export default indexRouter;

