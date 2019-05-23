var express = require('express');
var router = express.Router();
var auth = require('../modules/auth');

router.route('/auth/connect')
.get(auth.connect);



module.exports = router;