var fs = require('fs');
var del = require('del');
var ncp = require('ncp');
var path = require('path');
var gulp = require('gulp');
var watch = require('watch');
var flip = require('css-flip');
var map = require('map-stream');
var gutil = require('gulp-util');
var gcallback = require('gulp-callback');
var browserSync = require('browser-sync');
var transform = require('vinyl-transform');
var child_process = require('child_process');

var argv = require('yargs').argv;

var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var insert = require('gulp-insert');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var embed = require('gulp-image-embed');
var ttf2woff = require('gulp-ttf2woff');
var cssfont64 = require('gulp-cssfont64');
var autoprefixer = require('gulp-autoprefixer');

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack-stream');
var dwebpack = require('webpack');

var runSequence = require('run-sequence');

var package = require('./package.json');

var defaultAppName = argv.name ? argv.name : 'app';
var createRTL = argv.rtl ? true : false;
var production = argv.production ? true : false;
var port = argv.port ? argv.port : 8080;
var wport = argv.wport ? argv.wport : 8079;
var whost = argv.whost ? argv.whost : 'localhost';
var proxyHost = argv['proxy-host'] ? argv['proxy-host'] : 'localhost';
var proxyPort = argv['proxy-port'] ? argv['proxy-port'] : 3000;
var proxyURL = argv['proxy-url'] ? argv['proxy-url'].replace('http://', '').replace('https://', '') : (proxyHost + ':' + proxyPort);
var ghostMode = argv['disable-ghost-mode'] ? false : true;
var shouldScaffold = argv.scaffold;
var removeScaffold = argv.scaffold && argv.remove;
var forceRewriteScaffold = argv.scaffold && argv.force;

function copyFolder(src, dest, cb) {
  ncp(src, dest, cb);
}

if(shouldScaffold) {
  if(!argv.name) {
    gutil.log(gutil.colors.bgRed(gutil.colors.white('Should provide an app name for your project.')));
    process.exit(-1);
  }

  var scaffoldName = argv.name;

  if(fs.existsSync(path.join(process.cwd(), 'src', 'jsx', argv.name))
    && !forceRewriteScaffold && !removeScaffold) {
    gutil.log(gutil.colors.bgRed(gutil.colors.white('ABORTING: App ['+argv.name+'] already exists. If you wish to re-write the scaffold use --force (Warning: Doing so will erase all your modifications).')));
    process.exit(-1);
  }

  function rmSDir(p) {
    try {
      gutil.log('Removing directory:', path.relative(process.cwd(), p));
      del.sync(p);
    } catch(e) {console.log(e)}
  }

  function createSDir(p) {
    try {
      gutil.log('Creating directory:', path.relative(process.cwd(), p));
      fs.mkdirSync(p);
    } catch(e) {console.log(e)}
  }

  function removeProject(scaffoldName) {
    gutil.log(gutil.colors.bgRed(gutil.colors.white('[     Removing Project: ' + scaffoldName + '     ]\n')));
    rmSDir(path.join(process.cwd(), 'public', 'css', scaffoldName));
    rmSDir(path.join(process.cwd(), 'public', 'css', 'fonts', scaffoldName));
    rmSDir(path.join(process.cwd(), 'public', 'favicons', scaffoldName));
    rmSDir(path.join(process.cwd(), 'public', 'fonts', 'dropbox', scaffoldName));
    rmSDir(path.join(process.cwd(), 'public', 'imgs', scaffoldName));
    rmSDir(path.join(process.cwd(), 'public', 'js', scaffoldName));
    rmSDir(path.join(process.cwd(), 'public', 'video', scaffoldName));
    rmSDir(path.join(process.cwd(), 'src', 'jsx', scaffoldName));
    rmSDir(path.join(process.cwd(), 'src', 'sass', scaffoldName));
    rmSDir(path.join(process.cwd(), 'test', scaffoldName));
    console.log('\n');
  }

  function createProject(scaffoldName) {
    gutil.log(gutil.colors.bgBlue(gutil.colors.white('[     Creating Project: ' +scaffoldName + '     ]\n')));
    createSDir(path.join(process.cwd(), 'public', 'css', scaffoldName));
    createSDir(path.join(process.cwd(), 'public', 'css', 'fonts', scaffoldName));
    createSDir(path.join(process.cwd(), 'public', 'favicons', scaffoldName));
    createSDir(path.join(process.cwd(), 'public', 'fonts', 'dropbox', scaffoldName));
    createSDir(path.join(process.cwd(), 'public', 'imgs', scaffoldName));
    createSDir(path.join(process.cwd(), 'public', 'js', scaffoldName));
    createSDir(path.join(process.cwd(), 'public', 'video', scaffoldName));
    createSDir(path.join(process.cwd(), 'src', 'jsx', scaffoldName));
    createSDir(path.join(process.cwd(), 'src', 'sass', scaffoldName));
    createSDir(path.join(process.cwd(), 'test', scaffoldName));

    copyFolder(path.join(process.cwd(), '.rubix', 'scaffold', 'jsx'),
               path.join(process.cwd(), 'src', 'jsx', scaffoldName),
               function() {
      copyFolder(path.join(process.cwd(), '.rubix', 'scaffold', 'sass'),
                 path.join(process.cwd(), 'src', 'sass', scaffoldName),
                 function() {
        copyFolder(path.join(process.cwd(), '.rubix', 'scaffold', 'fonts'),
                   path.join(process.cwd(), 'public', 'fonts', 'dropbox', scaffoldName),
                   function() {
          console.log('\n');
          gutil.log(gutil.colors.bgBlue(gutil.colors.white('[     Completed Scaffolding Project: ' +scaffoldName + '     ]\n')));
        });
      });
    });
  }

  gulp.task('scaffolder', function() {
    if(forceRewriteScaffold) {
      removeProject(scaffoldName);
      createProject(scaffoldName);
    } else if(removeScaffold) {
      removeProject(scaffoldName);
    } else {
      createProject(scaffoldName);
    }
    return null;
  });

  gulp.task('default', function(callback) {
    runSequence('scaffolder', callback);
  });
} else {

var defaultDistPath = true;
var distPath = path.join(process.cwd(), 'dist', defaultAppName);

if(typeof argv.dist === 'string') {
  if(path.isAbsolute(argv.dist)) {
    distPath = argv.dist;
  } else {
    distPath = path.join(process.cwd(), argv.dist);
  }
  defaultDistPath = false;
}

var createDistribution = argv.dist;

/* file patterns to watch */
var paths = {
  index: ['src/jsx/'+defaultAppName+'/index.html', 'server.js', 'server/routes/*.js'],
  jsx: ['src/jsx/*.jsx', 'src/global/requires/*.js', 'src/jsx/**/*.jsx', 'src/jsx/**/**/*.jsx', 'src/jsx/**/**/**/*.jsx', '!src/jsx/**/plugins.jsx', '!src/jsx/**/stylesheets.jsx', 'src/jsx/**/redux/**.js', 'src/jsx/**/redux/**/**.js', 'src/jsx/**/redux/**/**/**.js'],
  scss: ['public/fonts/web/*.ttf', 'src/sass/*.scss', 'src/sass/**/*.scss', 'src/sass/**/**/*.scss', 'src/sass/**/**/**/*.scss', 'src/sass/**/**/**/**/*.scss', 'src/global/sass/*.scss', 'src/global/sass/**/*.scss', 'src/global/sass/**/**/*.scss', 'src/global/sass/**/**/**/*.scss', 'src/global/sass/**/**/**/**/*.scss'],
  ttf: ['public/fonts/dropbox/'+defaultAppName+'/*.ttf'],
  externals_plugins: ['src/jsx/**/plugins.jsx'],
  externals_stylesheets: ['src/jsx/**/stylesheets.jsx'],
  rubix_bootstrap: ['public/js/common/rubix-bootstrap/rubix-bootstrap.js'],
};

var banner = function() {
  return '/*! '+package.name+' - v'+package.version+' - '+gutil.date(new Date(), 'yyyy')+
          ' [copyright: '+package.copyright+']'+' */';
};

function logData() {
  gutil.log(
    gutil.colors.bold(
      gutil.colors.blue.apply(this, arguments)
    )
  );
}

logData('Name :', defaultAppName);
logData('RTL  :', (createRTL ? 'yes':'no'));
logData('PORT :', port);
logData('Environment :', (production ? 'Production':'Development'));
logData('BrowserSync Ghost Mode :', ghostMode);
logData('WEBPACK DEV SERVER PORT :', wport);
logData('WEBPACK DEV SERVER HOST :', whost);

/* ---------------------------------- */
/* --------- BEGIN APP:SASS --------- */
/* ---------------------------------- */
gulp.task('sass:app', function() {
  gulp.src('./src/sass/'+defaultAppName+'/*.scss')
      .pipe(sass({
        // sourceComments: 'normal'
      }))
      .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 9'))
      .pipe(insert.prepend(banner()+'\n'))
      .pipe(insert.prepend('@charset "UTF-8";\n'))
      .pipe(embed({
        asset: 'public'
      }))
      .pipe(gulp.dest('public/css/'+defaultAppName+'/raw/ltr'));
});

gulp.task('sass:app:rtl', ['sass:app'], function() {
  if(!createRTL) return null;
  var flipStylesheet = transform(function(filename) {
    return map(function(chunk, next) {
      return next(null, flip(chunk.toString()));
    });
  });
  return gulp.src('public/css/'+defaultAppName+'/raw/ltr/*.css')
          .pipe(flipStylesheet)
          .pipe(gulp.dest('public/css/'+defaultAppName+'/raw/rtl'));
});

/* -------------------------------- */
/* --------- END APP:SASS --------- */
/* -------------------------------- */

var webpackConfig = function(withHotLoader) {
  var query = {
    'cacheDirectory': true,
  };
  if(withHotLoader) {
    query = {
      'cacheDirectory': true,
      'env': {
        'development': {
          'plugins': [
            ['react-transform', {
              'transforms': [{
                'transform': 'react-transform-hmr',
                'imports': ['react'],
                'locals': ['module']
              }, {
                'transform': 'react-transform-catch-errors',
                'imports': ['react', 'redbox-react']
              }]
            }]
          ]
        }
      }
    };
  }

  return {
    cache: true,
    module: {
      loaders: [
        {test: /\.txt$/,
         exclude: /(node_modules|bower_components)/,
         loaders: ['babel']},
        {test: /\package\.json$/,
         exclude: /(node_modules|bower_components)/,
         loaders: ['json']},
        {test: /\.json$/,
         include: /(node_modules|bower_components)/,
         loaders: ['json']},
        {test: /[\\\\|\/]src[\\\\|\/]jsx[\\\\|\/](.*?)\.txt$/,
         exclude: /(node_modules|bower_components)/,
         loaders: ['raw']},
        {test: /[\\\\|\/]src[\\\\|\/]jsx[\\\\|\/](.*?)\.json$/,
         exclude: /(node_modules|bower_components)/,
         loaders: ['json']},
        {test: /(\.jsx|\.js)$/,
         exclude: /(node_modules|bower_components)/,
         loader: 'babel',
         query: query}
      ]
    },
    plugins: [
      new dwebpack.DefinePlugin({
        __BACKEND__: JSON.stringify('node'),
        __APPNAME__: JSON.stringify(defaultAppName)
      })
    ],
    resolve: {
      modulesDirectories: ['node_modules',
                            path.join('src'),
                            path.join('src', 'jsx', defaultAppName)],
      extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    externals: {
      'react': 'react',
      'React': 'react',
    }
  };
};

/* --------------------------------- */
/* ---------- BEGIN APP:JS --------- */
/* --------------------------------- */
gulp.task('react:development:server', function() {
  var wconfig = webpackConfig(true);
  wconfig.externals.react = 'React';
  wconfig.entry = [
    'webpack-dev-server/client?http://'+whost+':'+wport,
    'webpack/hot/only-dev-server',
    './src/jsx/'+defaultAppName+'/main.jsx'
  ];
  wconfig.output = {
    path: process.cwd(),
    contentBase: 'http://'+whost+':'+wport,
    filename: 'bundle.js',
    publicPath: 'http://'+whost+':'+wport+'/scripts/'
  };
  wconfig.plugins = wconfig.plugins.concat([
    new dwebpack.HotModuleReplacementPlugin()
  ]);

  var server = new WebpackDevServer(dwebpack(wconfig), {
    publicPath: wconfig.output.publicPath,
    hot: true,
    inline: true,
    stats: {
      colors: true,
      progress: true
    }
  });

  server.listen(wport, function (err, result) {
    if (err) {
      console.log(err);
    }

    gutil.log('Webpack Dev Server started. Compiling...');
  });
});

var pluginsTaskRunning = false,
    compilePlugins = function() {
      if(pluginsTaskRunning) return;
      pluginsTaskRunning = true;

      var wconfig = webpackConfig();
      wconfig.module.loaders.push({
        test: /\.js$/,
        loader: 'script'});
      wconfig.resolve.modulesDirectories = ['public', 'node_modules'];

      return gulp.src('src/jsx/'+defaultAppName+'/plugins.jsx')
              .pipe(webpack(wconfig))
              .pipe(rename('plugins.js'))
              .pipe(gulp.dest('public/js/'+defaultAppName+'/'))
              .pipe(gcallback(function() {
                pluginsTaskRunning = false;
              }))
              .pipe(browserSync.reload({stream: true}));
    };

gulp.task('external-plugins', compilePlugins);

gulp.task('uglify:plugins', ['external-plugins'], function() {
  return gulp.src('public/js/'+defaultAppName+'/plugins.js')
          .pipe(uglify({
            preserveComments: false,
            compress: {
              warnings: false
            }
          }))
          .pipe(insert.prepend(banner()))
          .pipe(gulp.dest('public/js/'+defaultAppName+'/'));
});

function addStylesheet(imports, path) {
  imports.push("import '"+path+"';");
}

function generateStylesheet(direction, callback) {
  var wconfig = webpackConfig(), imports = [];
  wconfig.module.loaders.push({
    test: /\.css$/,
    loader: 'bless'});
  wconfig.resolve.modulesDirectories = ['public', 'node_modules'];

  var file = fs.readFileSync(
                path.join(
                  process.cwd(),
                  'src/jsx/'+defaultAppName+'/stylesheets.jsx'))
               .toString();
  file = file.replace(/(\/ltr\/|\/rtl\/)/gmi, '/'+direction+'/');
  fs.writeFileSync(path.join(process.cwd(), './.rubix/tmp.jsx'), file);

  return gulp.src('./.rubix/tmp.jsx')
            .pipe(webpack(wconfig))
            .pipe(rename('stylesheets-'+direction+'.js'))
            .pipe(gulp.dest('public/js/'+defaultAppName))
            .pipe(gcallback(function() {
              if(callback) callback();
            }));
}

var styleTaskRunning = false
    generateStylesheetByDir = function() {
      if(createRTL) {
        generateStylesheet('rtl', function() {
          generateStylesheet('ltr')
          .pipe(gcallback(function() {
            styleTaskRunning = false;
          }))
          .pipe(browserSync.reload({stream: true}));
        });
        return;
      }
      return generateStylesheet('ltr')
            .pipe(gcallback(function() {
              styleTaskRunning = false;
            }))
            .pipe(browserSync.reload({stream: true}));
    },
    compileStylesheets = function() {
      if(styleTaskRunning) return;
      styleTaskRunning = true;

      return generateStylesheetByDir();
    };

gulp.task('external-stylesheets', compileStylesheets);

gulp.task('uglify:stylesheets:rtl', ['external-stylesheets'], function() {
  if(!createRTL) return null;
  return gulp.src('public/js/'+defaultAppName+'/stylesheets-rtl.js')
          .pipe(uglify({
            preserveComments: false,
            compress: {
              warnings: false
            }
          }))
          .pipe(insert.prepend(banner()))
          .pipe(gulp.dest('public/js/'+defaultAppName+'/'));
});

gulp.task('uglify:stylesheets', ['uglify:stylesheets:rtl'], function() {
  return gulp.src('public/js/'+defaultAppName+'/stylesheets-ltr.js')
          .pipe(uglify({
            preserveComments: false,
            compress: {
              warnings: false
            }
          }))
          .pipe(insert.prepend(banner()))
          .pipe(gulp.dest('public/js/'+defaultAppName+'/'));
});

gulp.task('rubix-bootstrap-test', function() {
  return gulp.src('public/js/common/rubix-bootstrap/rubix-bootstrap.js')
          .pipe(insert.prepend('var window = window || global;\nif(window.rubixBootstrapLoaded) return;\nwindow.rubixBootstrapLoaded = true;\n\n'))
          .pipe(replace('global.Row = __webpack_require__', 'global = window || {};\n  global.Row = __webpack_require__'))
          .pipe(insert.prepend('(function() {\n'))
          .pipe(insert.append('\n})();'))
          .pipe(rename('rubix-bootstrap-test.js'))
          .pipe(gulp.dest('public/js/common/rubix-bootstrap'));
});

gulp.task('react:development', function() {
  var wconfig = webpackConfig();
  wconfig.target = 'node';
  wconfig.output = {
   libraryTarget: 'commonjs2'
  };

  return gulp.src('src/jsx/'+defaultAppName+'/main.jsx')
          .pipe(webpack(wconfig))
          .pipe(rename(defaultAppName+'.node.js'))
          .pipe(gulp.dest('public/js/'+defaultAppName+'/'));
});

gulp.task('react:app', function() {
  var wconfig = webpackConfig();
  wconfig.externals.react = 'React';
  return gulp.src('src/jsx/'+defaultAppName+'/main.jsx')
          .pipe(webpack(wconfig))
          .pipe(rename(defaultAppName+'.js'))
          .pipe(gulp.dest('public/js/'+defaultAppName+'/'));
});

gulp.task('react:concat', ['react:app'], function() {
  return gulp.src(['public/js/'+defaultAppName+'/'+defaultAppName+'.js'])
          .pipe(concat(''+defaultAppName+'.js'))
          .pipe(insert.prepend('(function() {\n'))
          .pipe(insert.prepend(banner()+'\n'))
          .pipe(insert.append('\n})();'))
          .pipe(gulp.dest('public/js/'+defaultAppName+'/'));
});

gulp.task('uglify:app', ['react:concat'], function() {
  return gulp.src('public/js/'+defaultAppName+'/'+defaultAppName+'.js')
          .pipe(uglify({
            preserveComments: false,
            compress: {
              warnings: false
            }
          }))
          .pipe(insert.prepend(banner()))
          .pipe(gulp.dest('public/js/'+defaultAppName+'/'));
});
/* ------------------------------- */
/* ---------- END APP:JS --------- */
/* ------------------------------- */

/* --------------------------------- */
/* ------- BEGIN Base64 CSS -------- */
/* --------------------------------- */
gulp.task('base64-css:convert', function() {
  return gulp.src('public/fonts/dropbox/'+defaultAppName+'/*.ttf')
          .pipe(ttf2woff())
          .pipe(cssfont64())
          .pipe(replace('-Regular;', '; font-weight: normal; font-style: normal;'))
          .pipe(replace('-Bold;', '; font-weight: bold; font-style: normal;'))
          .pipe(replace('-Black;', '; font-weight: 800; font-style: normal;'))
          .pipe(replace('-Light;', '; font-weight: 300; font-style: normal;'))
          .pipe(replace('-Hairline;', '; font-weight: 300; font-style: normal;'))
          .pipe(replace('-Italic;', '; font-weight: normal; font-style: italic;'))
          .pipe(replace('-BoldItalic;', '; font-weight: bold; font-style: italic;'))
          .pipe(replace('-BlackItalic;', '; font-weight: 800; font-style: italic;'))
          .pipe(replace('-LightItalic;', '; font-weight: 300; font-style: italic;'))
          .pipe(replace('-HairlineItalic;', '; font-weight: 200; font-style: italic;'))
          .pipe(replace('font-woff', 'x-font-woff'))
          .pipe(gulp.dest('./.rubix/css/fonts/'+defaultAppName));
});

gulp.task('base64-css:concat', ['base64-css:convert'], function() {
  return gulp.src(['./.rubix/css/fonts/'+defaultAppName+'/*.css'])
          .pipe(insert.prepend('@charset "UTF-8";\n'))
          .pipe(concat('fonts.css'))
          .pipe(gulp.dest('public/css/fonts/'+defaultAppName))
          .pipe(browserSync.reload({stream: true}));
});

gulp.task('base64-css', ['base64-css:concat'], function(cb) {
  del('./.rubix/css').then(function(err) {
    cb();
  });
});
/* --------------------------------- */
/* --------- END Base64 CSS -------- */
/* --------------------------------- */

/* --------------------------------- */
/* ----------- BEGIN DIST ---------- */
/* --------------------------------- */

function createDir() {
  var p = Array.prototype.slice.call(arguments);
  p.unshift(distPath);
  try {
    fs.mkdirSync(path.join.apply(path, p));
  } catch(e) {}
}

gulp.task('create-dist-dirs', function() {
  if(defaultDistPath) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'dist'));
    } catch(e) {}
  }

  try {
    del.sync(distPath);
  } catch(e) {}

  createDir();
  createDir('css');
  createDir('favicons');
  createDir('imgs');
  createDir('js');
  createDir('locales');
  createDir('video');
  return;
});

gulp.task('copy-bower-components', function(callback) {
  copyFolder('./public/bower_components', path.join(distPath, 'bower_components'), callback);
});

gulp.task('copy-css-app', function() {
  copyFolder('./public/css/'+defaultAppName, path.join(distPath, 'css', defaultAppName));
});

gulp.task('copy-css-fonts', function() {
  copyFolder('./public/css/fonts/'+defaultAppName, path.join(distPath, 'css', 'fonts', defaultAppName));
});

gulp.task('copy-css-vendor', function() {
  copyFolder('./public/css/vendor', path.join(distPath, 'css', 'vendor'));
});

gulp.task('copy-favicons', function() {
  copyFolder('./public/favicons/'+defaultAppName, path.join(distPath, 'favicons', defaultAppName));
});

gulp.task('copy-imgs', function() {
  copyFolder('./public/imgs/'+defaultAppName, path.join(distPath, 'imgs', defaultAppName));
});

gulp.task('copy-js-app', function() {
  copyFolder('./public/js/'+defaultAppName, path.join(distPath, 'js', defaultAppName));
});

gulp.task('copy-js-common', function() {
  copyFolder('./public/js/common', path.join(distPath, 'js', 'common'));
});

gulp.task('copy-js-vendor', function() {
  copyFolder('./public/js/vendor', path.join(distPath, 'js', 'vendor'));
});

gulp.task('copy-locales-app', function() {
  copyFolder('./public/locales/'+defaultAppName, path.join(distPath, 'locales', defaultAppName));
});

gulp.task('copy-video-app', function() {
  copyFolder('./public/video/'+defaultAppName, path.join(distPath, 'video', defaultAppName));
});

gulp.task('copy-index-html', function() {
  return gulp.src('./src/jsx/'+defaultAppName+'/index.html')
             .pipe(replace('{appscript}', '/js/'+defaultAppName+'/'+defaultAppName+'.js'))
             .pipe(replace('{app}', defaultAppName))
             .pipe(replace('{version}', package.version))
             .pipe(replace('{dir}', createRTL? 'rtl': 'ltr'))
             .pipe(replace('{container}', ''))
             .pipe(replace('<!-- server data (required) -->\n    <script type="text/javascript">\n        var server_data = "{server_data}";\n    </script>', ''))
             .pipe(gulp.dest(distPath))
});

gulp.task('create-dist', function() {
  runSequence('create-dist-dirs',
              'copy-bower-components',
              'copy-css-app',
              'copy-css-fonts',
              'copy-css-vendor',
              'copy-favicons',
              'copy-imgs',
              'copy-js-app',
              'copy-js-common',
              'copy-js-vendor',
              'copy-locales-app',
              'copy-video-app',
              'copy-index-html')
});

/* --------------------------------- */
/* ------------ END DIST ----------- */
/* --------------------------------- */

/* --------------------------------- */
/* --------- BEGIN EXPRESS --------- */
/* --------------------------------- */
var child = null, browserSyncConnected = false;
gulp.task('express', function() {
  if(child) child.kill();
  child = child_process.spawn(process.execPath, ['./server.js'], {
    env: {
      NODE_ENV: process.env.NODE_ENV || 'development',
      APP: defaultAppName,
      RTL: createRTL,
      PORT: proxyPort,
      WPORT: wport,
      WHOST: whost
    },
    stdio: ['ipc']
  });
  child.stdout.on('data', function(data) {
    gutil.log(gutil.colors.bgCyan(gutil.colors.blue(data.toString().trim())));
  });
  child.stderr.on('data', function(data) {
    gutil.log(gutil.colors.bgRed(gutil.colors.white(data.toString().trim())));
    browserSync.notify('ERROR: ' + data.toString().trim(), 5000);
  });
  child.on('message', function(m) {
    if(m === 'CONNECTED' && !browserSyncConnected) {
      gutil.log(gutil.colors.bgMagenta(gutil.colors.white('Server spawned! Starting proxy...')));
      browserSync({
        proxy: proxyURL,
        port: port,
        ghostMode: ghostMode
      }, function() {
        browserSyncConnected = true;
      });
    } else {
      browserSync.notify(m, 5000);
    }
  });
});

process.on('uncaughtException', function(err) {
  if(child) child.kill();
  throw new Error(err);
});
/* ------------------------------- */
/* --------- END EXPRESS --------- */
/* ------------------------------- */

/* ------------------------------- */
/* -------- BEGIN NOTIFY --------- */
/* ------------------------------- */
gulp.task('notify', function() {
  browserSync.notify('Live reloading ...');
});
/* ------------------------------- */
/* ---------- END NOTIFY --------- */
/* ------------------------------- */

/* ------------------------------------ */
/* -------- BEGIN BROWSERSYNC --------- */
/* ------------------------------------ */
var createMonitor = function() {
  var callback = function(f) {
    browserSync.reload(f);
  };

  return function(p, cb) {
    watch.createMonitor(p, function(m) {
      m.on('created', cb || callback);
      m.on('changed', cb || callback);
      m.on('removed', cb || callback);
    });
  }
}

if(!production) {
  var m = createMonitor();
  m('public/imgs');
  m('public/locales');
  m('public/css', compileStylesheets);
  m('public/js/vendor', compilePlugins);
  m('public/bower_components', compilePlugins);
}
/* ------------------------------------ */
/* ---------- END BROWSERSYNC --------- */
/* ------------------------------------ */

/* ------------------------------ */
/* --------- GULP TASKS --------- */
/* ------------------------------ */
gulp.task('sass', ['sass:app:rtl']);
gulp.task('uglify', ['uglify:app', 'uglify:plugins', 'uglify:stylesheets', 'react:development']);
gulp.task('clean:essentials', ['clean:react']);

gulp.task('build:css', ['sass']);

gulp.task('build:dist', ['uglify']);

var cb = function() {
  gutil.log(
    gutil.colors.bgMagenta(
      gutil.colors.red(
        gutil.colors.bold('[          COMPLETED BUILD PROCESS          ]')
      )
    )
  );
};

if(production) {
  logData('Building please wait...');
  gulp.task('default', function(callback) {
    runSequence('build:css', 'base64-css', 'uglify', function() {
      if(createDistribution) {
        runSequence('create-dist', function() {
          cb();
          callback();
        });
      } else {
        cb();
        callback();
      }
    });
  });
} else {
  gulp.task('default', function(callback) {
    runSequence('react:development:server', 'react:development', 'react:app', 'build:css', 'base64-css', 'external-plugins', 'rubix-bootstrap-test', ['express', 'watch'], function() {
      if(createDistribution) {
        runSequence('create-dist', callback);
      } else {
        callback();
      }
    });
  });
}

gulp.task('development', function(callback) {
  runSequence('react:development', 'react:app', 'notify', 'express:watch',function() {
      if(createDistribution) {
        runSequence('create-dist', callback);
      } else {
        callback();
      }
  });
});

/*BEGIN: ALIASES FOR CERTAIN TASKS (for Watch)*/
gulp.task('express:watch', ['express'], ready);
gulp.task('rebuild:css', ['build:css'], function() {
  if(createDistribution) {
    runSequence('create-dist', ready);
  } else {
    ready();
  }
});
gulp.task('base64-css:watch', ['base64-css'], function() {
  if(createDistribution) {
    runSequence('create-dist', ready);
  } else {
    ready();
  }
});
/*END: ALIASES*/

gulp.task('watch', function() {
  gulp.watch(paths.index, ['express:watch']);
  gulp.watch(paths.scss, ['rebuild:css']);
  gulp.watch(paths.ttf, ['base64-css:watch'])
  gulp.watch(paths.jsx, ['development']);
  gulp.watch(paths.externals_plugins, ['external-plugins']);
  gulp.watch(paths.externals_stylesheets, ['external-stylesheets']);
  gulp.watch(paths.rubix_bootstrap, ['rubix-bootstrap-test']);
});

function ready() {
  gutil.log(
    gutil.colors.bgMagenta(
      gutil.colors.white(
        gutil.colors.bold('[          STATUS: READY          ]')
      )
    )
  );
}

}
