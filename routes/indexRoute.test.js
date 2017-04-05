
import indexRoute from './indexRoute';

const test = {
    res: {
        render: (name, data) => {
            expect(name).toBe('index');
            expect(data).toEqual({ title: 'Express' });
        },
    },
};

describe('index API', () => {
    describe('root', () => {
        it('.get should render a default HTML page', () => {
            indexRoute.root.get(undefined, test.res, undefined);
        });
    });
});
