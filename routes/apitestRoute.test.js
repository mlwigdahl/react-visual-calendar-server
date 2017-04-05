
import apitestRoute, { datesNew, eventsNew, state } from './apitestRoute';

const test = {
    res: (expected) => {
        function status(stat) {
            return this;
        }

        return {
            json: (input) => {
                expect(input).toEqual(expected);
            },
            status,
        };
    },
};

describe('apitest API', () => {
    describe('logon', () => {
        it('.get should return proper JSON', () => {
            apitestRoute.logon.get(undefined,
                test.res({ success: 1, error: undefined, payload: { ...state.app.user } }),
                undefined);
        });
    });

    describe('calendar', () => {
        it('.get should return an error with a non-positive integer userId', () => {
            const req = {
                params: {
                    userId: undefined,
                },
            };

            apitestRoute.calendar.get(req,
                test.res({ success: 0, error: 'invalid parameter', payload: undefined }),
                undefined);
        });

        it('.get should return an error with an invalid userId (anything other than 1 for this test)', () => {
            const req = {
                params: {
                    userId: 2,
                },
            };

            apitestRoute.calendar.get(req,
                test.res({ success: 0, error: 'invalid parameter', payload: undefined }),
                undefined);
        });

        it('.get should return valid JSON with a valid userID (=== 1)', () => {
            const req = {
                params: {
                    userId: 1,
                },
            };

            apitestRoute.calendar.get(req,
                test.res({ success: 1, error: undefined, payload: { ...state.calendar } }),
                undefined);
        });
    });
});
