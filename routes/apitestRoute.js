
import moment from 'moment';

// helper functions + setup

function isPositiveInteger(n) {
    return n % (!isNaN(parseFloat(n)) && ~~n >= 0) === 0; // eslint-disable-line no-bitwise
}

let eventNum = 3;

function getMaxEventId() {
    eventNum += 1;
    return eventNum;
}

const dates = {
    20170101: {
        events: [1, 2],
    },
};

const datesNew = {
    20170102: {
        events: [3, 4],
    },
    20161231: {
        events: [],
    },
};

const events = {
    1: {
        icon: 'scissors.jpg',
        label: 'Haircut',
        startTime: '08:15 AM',
        endTime: '10:15 AM',
        endDate: '20170101',
    },
    2: {
        icon: 'food.jpg',
        label: 'Lunch! 😁',
        startTime: '11:30 AM',
        endTime: '12:30 PM',
        endDate: '20170101',
    },
};

const eventsNew = {
    3: { startTime: '03:45 PM', endTime: '04:45 PM', endDate: '20170101', icon: 'meeting-icon-url', label: '3:45 meeting 😒😒 (Red conference room)' },
    4: { startTime: '11:30 AM', endTime: '12:30 PM', endDate: '20170101', icon: 'lunch-icon-url', label: 'Lunch! 😁' },
};

const state = {
    app: {
        user: {
            id: 1,
            name: 'Test User',
            error: undefined,
        },
    },
    calendar: {
        minDate: '20161002',
        maxDate: '20170301',
        dates: [1],
    },
    dates,
    events,
};

const apitestRoute = {
    logon: {
        get: (req, res, next) => {
            //    if (username === gooduser && password === goodPassword) {
            res.json({ success: 1, error: undefined, payload: { ...state.app.user } });
            /*    }
            else {
                res.json({ success: 0, error: 'bad credentials', payload: undefined });
            }  */
        },
    },
    calendar: {
        get: (req, res, next) => {
            const { userId } = req.params;

            if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // this is the arbitrary "good ID"...
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else {
                res.json({ success: 1, error: undefined, payload: { ...state.calendar } });
            }
        },
    },
    date: {
        get: (req, res, next) => {
            const { userId } = req.params;
            const { startDate, endDate } = req.query;

            if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // the arbitrary "good ID"
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(startDate, 'YYYYMMDD').format('YYYYMMDD') !== startDate) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(endDate, 'YYYYMMDD').format('YYYYMMDD') !== endDate) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(startDate, 10) >= parseInt(endDate, 10)) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else {
                const compDates = { ...dates, ...datesNew };

                const datesAdd = Object.keys(compDates)
                    .filter(key => parseInt(key, 10) >= parseInt(startDate, 10)
                        && parseInt(key, 10) <= parseInt(endDate, 10))
                    .reduce((acc, key) => { acc[key] = compDates[key]; return acc; }, {});

                res.json({ success: 1, error: undefined, payload: datesAdd });
            }
        },
        post: (req, res, next) => {
            const { userId, dateId } = req.params;

            if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // the arbitrary "good ID"
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(dateId, 'YYYYMMDD').format('YYYYMMDD') !== dateId) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else {
                res.json({ success: 1, error: undefined, payload: { id: dateId, data: { events: [] } } });
            }
        },
        put: (req, res, next) => {
            const { userId, dateId } = req.params;

            if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // the arbitrary "good ID"
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(dateId, 'YYYYMMDD').format('YYYYMMDD') !== dateId) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            }

            const date = req.body;

            res.json({ events: [] });
        },
        delete: (req, res, next) => {
            const { userId, dateId } = req.params;

            if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // the arbitrary "good ID"
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(dateId, 'YYYYMMDD').format('YYYYMMDD') !== dateId) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else {
                res.json({ success: 1, error: undefined, payload: { id: dateId } });
            }
        },
    },
    event: {
        get: (req, res, next) => {
            const { userId } = req.params;
            const { startDate, endDate } = req.query;

            if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // the arbitrary "good ID"
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(startDate, 'YYYYMMDD').format('YYYYMMDD') !== startDate) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(endDate, 'YYYYMMDD').format('YYYYMMDD') !== endDate) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(startDate, 10) >= parseInt(endDate, 10)) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else {
                // TODO copied from date GET test -- need to DRY...
                const compDates = { ...dates, ...datesNew };
                const datesAdd = Object.keys(compDates)
                    .filter(key => parseInt(key, 10) >= parseInt(startDate, 10)
                        && parseInt(key, 10) <= parseInt(endDate, 10))
                    .reduce((acc, key) => { acc[key] = compDates[key]; return acc; }, {});

                const compEvents = { ...events, ...eventsNew };
                const dateEvents = Object.keys(datesAdd)
                    .map(key => datesAdd[key].events)
                    .reduce((acc, evts) => acc.concat(evts), []);

                res.json({
                    success: 1,
                    error: undefined,
                    payload: {
                        ...Object.keys(compEvents)
                            .filter(key => dateEvents.includes(Number(key)))
                            .reduce((acc, key) => { acc[key] = compEvents[key]; return acc; }, {}) },
                });
            }
        },
        post: (req, res, next) => {
            const { userId, dateId } = req.params;

            const event = req.body;

            if (Object.keys(event).length < 3 ||
                event.label === undefined ||
                event.startTime === undefined ||
                event.endTime === undefined) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // the arbitrary "good ID"
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(dateId, 'YYYYMMDD').format('YYYYMMDD') !== dateId) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else {
                res.json({
                    success: 1,
                    error: undefined,
                    payload: { id: getMaxEventId() + 1, data: { ...event } },
                });
            }
        },
        put: (req, res, next) => {
            const { userId, dateId, eventId } = req.params;

            const event = req.body;

            if (Object.keys(event).length < 4 ||
                event.label === undefined ||
                event.startTime === undefined ||
                event.endTime === undefined ||
                event.endDate === undefined) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // the arbitrary "good ID"
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(dateId, 'YYYYMMDD').format('YYYYMMDD') !== dateId) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else {
                res.json({ success: 1, error: undefined, payload: { id: eventId, data: { ...event } } });
            }
        },
        delete: (req, res, next) => {
            const { userId, dateId, eventId } = req.params;

            if (isPositiveInteger(userId) === false) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (parseInt(userId, 10) !== 1) { // the arbitrary "good ID"
                res.status(403).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else if (moment(dateId, 'YYYYMMDD').format('YYYYMMDD') !== dateId) {
                res.status(400).json({ success: 0, error: 'invalid parameter', payload: undefined });
            } else {
                res.json({ success: 1, error: undefined, payload: { id: eventId } });
            }
        },
    },
};

export default apitestRoute;
