const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    console.log("router file hitted");
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
})
router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
})

//pushing the routeSubdir property to the exports object
// exports.routeSubdir = router;

//exporting enitre module based
module.exports = router;