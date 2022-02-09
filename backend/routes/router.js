const { Router } = require('express');
const cardsRouter = require('./cards');
const userRouter = require('./users');

const router = new Router();

router.use('/cards', cardsRouter);
router.use('/users', userRouter);

module.exports = router;
