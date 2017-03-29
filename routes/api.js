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

module.exports = router;
