import express from 'express';
import route1 from './route1';
import route2 from './route2';
import route3 from './route3';

const apiRouter = express.Router();

apiRouter.use('/route1', route1);
apiRouter.use('/route2', route2);
apiRouter.use('/route3', route3);

export default apiRouter;
