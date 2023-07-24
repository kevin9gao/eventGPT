const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const eventsRouter = require('./events');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/events', eventsRouter);

module.exports = router;
