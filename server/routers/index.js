const router = require('express').Router();
const bandRouter = require('./band.js');
const userRouter = require('./user.js');

router.use('/', userRouter);
router.use('/bands', bandRouter);

module.exports = router;