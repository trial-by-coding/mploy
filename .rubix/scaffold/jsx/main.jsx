'use strict';

import 'preloader';

import routes from 'routes';
import router from 'global/router';

Pace.once('hide', () => {
  $('body').removeClass('pace-big').addClass('pace-small');
});

module.exports = router(routes);
