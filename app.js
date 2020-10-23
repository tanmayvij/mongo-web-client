const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require("path");

const port = process.env.PORT || 8080;
const routes = require('./modules');

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.set('cryptoSecret', 'vxcvxzszadcxzxcs');
app.set('tokenSecret', 'vhxbvkjlcjvbcvbg');

app.use(cors());
app.use(morgan('dev'));

app.use(function (req, res, next) {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
});

app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function () {
  console.log("Listening on port " + port);
});

module.exports = app;
