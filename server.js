require('babel-polyfill');
require('babel-register');
require('./globals');

var path = require('path');
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');

var db = require('./server/db/db.js');
var session = require('cookie-session');

var app = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(process.cwd(), 'ploads')));

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.json());

app.use(session({
  name: 'my-app:session',
  secret: process.env.SESSION_SECRET || 'development',
  secure: (!! process.env.SESSION_SECRET),
  signed: true
}))

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// *** routes *** //
var user = express.Router();
require('./server/routes/user.js')(user);
app.use('/user', user);

var auth = express.Router();
require('./server/routes/auth.js')(auth);
app.use('/auth', auth);

app.get('/', function(req, res, next) {
  var store = getStore();
  var actions = getActions();
  renderHTML(req, res, next, store);
});

/** CATCH-ALL ROUTE FOR MAIN ROUTER **/
app.get('*', function(req, res, next) {
  renderHTML(req, res, next);
});

console.log('Environment Port:', process.env.PORT);
console.log('Node Environment:', process.env.ENV);

var server = app.listen(process.env.PORT, function() {
  try {
    process.send('CONNECTED');
  } catch (e) {}
});

process.on('uncaughtException', function(err) {
  console.log(arguments);
  process.exit(-1);
});
