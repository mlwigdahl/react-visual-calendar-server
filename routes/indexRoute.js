

const indexRoute = {
    root: {
        get: (req, res, next) => {
            res.render('index', { title: 'Express' });
        },
    },
};

export default indexRoute;
