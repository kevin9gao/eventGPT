const router = require('express').Router();
const sessionRouter = require('./session');

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');


router.use('/session', sessionRouter);


module.exports = router;
