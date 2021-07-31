import express from 'express';
import route1 from './route1';

const apiRouter = express.Router();

apiRouter.use('/route1', route1);

export default apiRouter;
