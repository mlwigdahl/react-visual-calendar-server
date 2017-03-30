var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/logon', function(req, res, next) {
  res.json({ id: 0, name: '', error: 'bad credentials' });
});

router.get('/user/:userId/calendar', function(req, res, next) {
  let { userId } = req.params;

  res.json({ userId: userId, calendar: { stuff: 'stuff' } });
});

// TODO params not working...
router.get('/user/:userId/dateRange', function(req, res, next) {
  let { userId } = req.params;
  let { startDate, endDate } = req.query;

  res.json({ userId: userId, startDate: startDate, endDate: endDate });
})

module.exports = router;
