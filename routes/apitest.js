//var express = require('express');

import * as express from 'express';
import moment from 'moment';

const router = express.Router();

function isPositiveInteger(n) {
    return 0 === n % (!isNaN(parseFloat(n)) && 0 <= ~~n);
}

const state = {
    app: {
        user: {
            id: 1,
            name: 'Test User',
            error: undefined,
        }
    },
    calendar: {
        minDate: '20161002',
        maxDate: '20170301',
        dates: [1],  
    },
};

const goodUser = 'asdf';
const goodPassword = 'asdf';

router.get('/logon', (req, res, next) => {
//    if (username === gooduser && password === goodPassword) {
        res.json({ success: 1, error: undefined, payload: { ...state.app.user } });
/*    }
    else {
        res.json({ success: 0, error: 'bad credentials', payload: undefined });
    }  */
});

router.get('/user/:userId/calendar', (req, res, next) => {
    const { userId } = req.params;

    if (isPositiveInteger(userId) === false) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (parseInt(userId) !== 1) { // this is the arbitrary "good ID"...
        res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else {
        res.json({ success: 1, error: undefined, payload: { ...state.calendar } });
    }
});

router.get('/user/:userId/date', (req, res, next) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    if (isPositiveInteger(userId) === false) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (parseInt(userId) !== 1) { // the arbitrary "good ID"
        res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (moment(startDate, "YYYYMMDD").format("YYYYMMDD") !== startDate) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (moment(endDate, "YYYYMMDD").format("YYYYMMDD") !== endDate) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (parseInt(startDate, 10) >= parseInt(endDate, 10)) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else {
        res.json({ success: 1, error: undefined, payload: { userId: userId, startDate: startDate, endDate: endDate } });
    }
});

router.post('/user/:userId/date/:dateId', (req, res, next) => {
    const { userId, dateId } = req.params;
    
    if (isPositiveInteger(userId) === false) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (parseInt(userId) !== 1) { // the arbitrary "good ID"
        res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (moment(dateId, "YYYYMMDD").format("YYYYMMDD") !== dateId) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else {
        res.json({ success: 1, error: undefined, payload: { id: dateId, data: { events: [] } } });
    }
});

router.put('/user/:userId/date/:dateId', (req, res, next) => {
    const { userId, dateId } = req.params;

    if (isPositiveInteger(userId) === false) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (parseInt(userId) !== 1) { // the arbitrary "good ID"
        res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }

    const date = req.body;
    console.log(`id: ${date.id}, data: ${date.data}`);

    res.json({ events: [] });
});

router.delete('/user/:userId/date/:dateId', (req, res, next) => {
    const { userId, dateId } = req.params;

    if (isPositiveInteger(userId) === false) {
        res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else if (parseInt(userId) !== 1) { // the arbitrary "good ID"
        res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
    }
    else {
        res.json({ success: 1, error: undefined, payload: { id: dateId } } );
    }
})

module.exports = router;
