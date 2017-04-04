import express from 'express';

import apitestRoute from './apitestRoute';

const router = express.Router();

//const goodUser = 'asdf';
//const goodPassword = 'asdf';

// api

router.get('/logon', apitestRoute.logon.get);

// calendar

router.get('/user/:userId/calendar', apitestRoute.calendar.get);

// date

router.get('/user/:userId/date', apitestRoute.date.get);
router.post('/user/:userId/date/:dateId', apitestRoute.date.post);
router.put('/user/:userId/date/:dateId', apitestRoute.date.put);
router.delete('/user/:userId/date/:dateId', apitestRoute.date.delete);

// event

router.get('/user/:userId/event', apitestRoute.event.get);
router.post('/user/:userId/date/:dateId/event', apitestRoute.event.post);
router.put('/user/:userId/date/:dateId/event/:eventId', apitestRoute.event.put);
router.delete('/user/:userId/date/:dateId/event/:eventId', apitestRoute.event.delete);

export default router;
