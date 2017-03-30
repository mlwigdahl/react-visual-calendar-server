var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/logon', function(req, res, next) {
  res.json({ id: 0, name: '', error: 'bad credentials' });
});

router.get('/user/:userId/calendar', function(req, res, next) {
  const userId = req.params.userId;

  res.json({ userId: userId, calendar: { stuff: 'stuff' } });
});

// TODO params not working...
router.get('/user/:userId/dateRange?:startDate&:endDate', function(req, res, next) {
  let userId, startDate, endDate;
  // { userId, startDate, endDate } = req.params; // TODO get rest-spread working through Babel
  userId = req.params.userId;
  startDate = req.params.startDate;
  endDate = req.params.endDate;

  res.json({ userId: userId, startDate: startDate, endDate: endDate });
})

module.exports = router;
