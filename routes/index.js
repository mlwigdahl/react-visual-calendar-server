import express from 'express';

import indexRoute from './indexRoute';

const router = express.Router();

/* GET home page. */ // serve the static files...
router.get('/', indexRoute.root.get);

export default router;
