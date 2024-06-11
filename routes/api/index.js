const router = require('express').Router();
const courseRoutes = require('./friendRoutes');
const studentRoutes = require('./userRoutes');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;
