var fs = require('fs');
var path = require('path');
var Users = require('./server/models/Users.js');

global.window = global;
global.navigator = {
  userAgent: {
    indexOf: function() {return true;},
    toLowerCase: function() {
      return "";
    }
  }
};

window.$ = require('jquery');

global.React = require('react');
global.ReactRouter = require('react-router');

var ReactDOMServer = require('react-dom/server');

global.EventEmitter2 = require('eventemitter2').EventEmitter2;
global.Modernizr = {};
global.localStorage = {getItem: function() {}, setItem: function() {}};
global.Pace = {once: function() {}, restart: function() {}};
global.l20n = {initializeLocales: function() {}, ready: function() {}};

global.ReactBootstrap = {
  Dispatcher: new global.EventEmitter2({
    maxListeners: 999999999
  })
};

global.RoutingContextWrapper = React.createClass({
  displayName: "RoutingContextWrapper",

  childContextTypes: {
    data: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.object
          ])
  },
  getChildContext: function getChildContext() {
    return { data: this.props.data };
  },
  render: function render() {
    return React.createElement(ReactRouter.RoutingContext, this.props.renderProps);
  }
});

require('./public/js/common/rubix-bootstrap/rubix-bootstrap.js');
require('./public/js/common/react-l20n/react-l20n.js');

var defaultAppName = process.env.APP ? process.env.APP : 'app';
var rpackage = require('./package.json');

var routes = require('./public/js/' + defaultAppName + '/' + defaultAppName + '.node.js');

import { Provider } from 'react-redux';
import { routeReducer } from 'redux-simple-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

var reducers = require('./src/jsx/'+defaultAppName+'/redux/reducers');
var actions = require('./src/jsx/'+defaultAppName+'/redux/actions');

global.getActions = function() {
  return actions;
};

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
global.getStore = function() {
  return createStoreWithMiddleware(combineReducers({
    ...reducers,
    routing: routeReducer
  }));
};

global.renderDOMString = function(store, data, renderProps) {
  if(!store) {
    store = getStore();
  }

  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RoutingContextWrapper data={data} renderProps={renderProps} />
    </Provider>
  );
};

var webpack_host = process.env.WHOST ? process.env.WHOST : 'localhost';
var webpack_dev_server_port = process.env.WPORT ? process.env.WPORT : 8079;

var html = fs.readFileSync(path.join(process.cwd(), 'src', 'jsx', defaultAppName, 'index.html'), {
  encoding: 'utf8'
});

if(process.env.NODE_ENV === 'development') {
  html = html.replace(new RegExp('{appscript}', 'g'), 'http://'+webpack_host+':'+webpack_dev_server_port+'/scripts/bundle.js');
} else {
  html = html.replace(new RegExp('{appscript}', 'g'), '/js/'+defaultAppName+'/'+defaultAppName+'.js');
}

html = html.replace(new RegExp('{app}', 'g'), defaultAppName);
html = html.replace(new RegExp('{version}', 'g'), rpackage.version);

var ltr = html.replace(new RegExp('{dir}', 'g'), 'ltr');
var rtl = html.replace(new RegExp('{dir}', 'g'), 'rtl');

global.renderHTML = function(req, res, next, store) {
  console.log('req.url: ', req.url)
  console.log('req.user: ', req.user)
  if(req.url === '/favicon.ico'
    || (req.url.search('.l20n') !== -1)) return next();
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  var isRTL = req.cookies.rubix_dir === 'rtl' ? true : false;

  var data = "";
  if (store) {
    data = escape(encodeURIComponent(JSON.stringify(store.getState())));
  }

  //renderProps.location.pathname    has url

  ReactRouter.match({
    routes: routes({ listen: () => {} }),
    location: req.url
  }, function(err, redirectLocation, renderProps) {
    console.log('redirectLocation: ', redirectLocation)
      console.log('renderProps: ', renderProps)
    if(err) {
      res.status(500).send(err.message);
    } else if(redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if(renderProps) {
      var str = renderDOMString(store, data, renderProps);

      console.log('renderProps.location.pathname: ', renderProps.location.pathname)
      if (renderProps.location.pathname === '/employer'){
        console.log('!req.user: ', !req.user)
        console.log('Hi there user!: ', req.user)
        if (!req.user){
          renderProps.location.pathname = '/'
          res.redirect('/')
        } else {
          if(isRTL) {
            str = rtl.replace(new RegExp('{container}', 'g'), str);
            str = str.replace(new RegExp('{server_data}', 'g'), data);
            res.status(200).send(str);
          } else {
            str = ltr.replace(new RegExp('{container}', 'g'), str);
            str = str.replace(new RegExp('{server_data}', 'g'), data);
            res.status(200).send(str);
          }
        }
      } else {
        if(isRTL) {
          str = rtl.replace(new RegExp('{container}', 'g'), str);
          str = str.replace(new RegExp('{server_data}', 'g'), data);
          res.status(200).send(str);
        } else {
          str = ltr.replace(new RegExp('{container}', 'g'), str);
          str = str.replace(new RegExp('{server_data}', 'g'), data);
          res.status(200).send(str);
        }
      }
    } else {
      res.status(404).send('Not found');
    }
  });
};
