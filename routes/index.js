var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');

router.route('/auth/connect')
.post(auth.connect);

router.route('/auth/getdbs')
.get(auth.getDBs);

module.exports = router;