const router = require('express').Router();
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

// another response net for if a request is made to an endpoint that doesn't exist
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;