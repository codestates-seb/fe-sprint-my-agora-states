const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('../public/Route/MainPage/MainPage.html', {root: '../../'});
});

module.exports = router;