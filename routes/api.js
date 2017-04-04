import express from 'express';

const router = express.Router();

// app

router.get('/logon', (req, res, next) => {
    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

router.get('/user/:userId/calendar', (req, res, next) => {
    const { userId } = req.params;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

// calendar

router.get('/user/:userId/calendar', (req, res, next) => {
    const { userId } = req.params;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

// TODO params not working...
router.get('/user/:userId/dateRange', (req, res, next) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

// date

router.get('/user/:userId/date', (req, res, next) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

router.post('/user/:userId/date/:dateId', (req, res, next) => {
    const { userId, dateId } = req.params;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

router.put('/user/:userId/date/:dateId', (req, res, next) => {
    const { userId, dateId } = req.params;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

router.delete('/user/:userId/date/:dateId', (req, res, next) => {
    const { userId, dateId } = req.params;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

// event

router.get('/user/:userId/event', (req, res, next) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

router.post('/user/:userId/date/:dateId/event', (req, res, next) => {
    const { userId, dateId } = req.params;

    const event = req.body;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

router.put('/user/:userId/date/:dateId/event/:eventId', (req, res, next) => {
    const { userId, dateId, eventId } = req.params;

    const event = req.body;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

router.delete('/user/:userId/date/:dateId/event/:eventId', (req, res, next) => {
    const { userId, dateId, eventId } = req.params;

    res.status(501).json({ id: 0, name: '', error: 'not implemented yet' });
});

export default router;
