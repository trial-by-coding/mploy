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
var session = require('express-session');
var KnexSessionStore = require('connect-session-knex')(session);

var Employers = require('./server/models/Employers.js');
var JobPosts = require('./server/models/JobPosts.js');
var Stats = require('./server/models/Stats.js');
var Applications = require('./server/models/Applications.js');

var app = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(bodyParser.json());


var store = new KnexSessionStore({
  knex: db,
  tablename: 'sessions' // optional. Defaults to 'sessions'
});

app.use(session({
  secret: 'supersecretysecret',
  store,
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// *** routes *** //
// load our routes and pass in our app and fully configured  passport
var user = express.Router();
require('./server/routes/user.js')(user);
app.use('/user', user);

var auth = express.Router();
require('./server/routes/auth.js')(auth);
app.use('/auth', auth);

app.get('/', function(req, res, next) {
  var store = getStore();
  var actions = getActions();
  store.dispatch(actions.addTodo('Hello From Server 1'));
  store.dispatch(actions.addTodo('Hello From Server 2'));
  renderHTML(req, res, next, store);
});

/** CATCH-ALL ROUTE FOR MAIN ROUTER **/
app.get('*', function(req, res, next) {
  renderHTML(req, res, next);
});

var server = app.listen(process.env.PORT, function() {
  try {
    process.send('CONNECTED');
  } catch (e) {}
});

process.on('uncaughtException', function(err) {
  console.log(arguments);
  process.exit(-1);
});
