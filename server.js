require('babel-polyfill');
require('babel-register');
require('./globals');

var path = require('path');
var express = require('express');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var db  = require('./server/db/db.js');

var app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));

// var router = express.Router();

var user = express.Router();
require('./server/routes/user.js')(user, express);
app.use('/user', user)

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
  } catch(e) {}
});

process.on('uncaughtException', function(err) {
  console.log(arguments);
  process.exit(-1);
});
