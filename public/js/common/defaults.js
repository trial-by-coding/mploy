/* ReactBootstrap */
var ReactBootstrap = {
  Dispatcher: new EventEmitter2({
    maxListeners: 999999999
  })
};

/*L20N*/
var _RL20n_=window.ReactL20n || {};
var l20n=_RL20n_.l20n || {
      ready: function() {},
      initializeLocales: function() {},
    },
    Entity=_RL20n_.Entity;

if(window.hasOwnProperty('Chart')) {
  if(Chart.hasOwnProperty('defaults')
    && Chart.defaults.hasOwnProperty('global')) {
    Chart.defaults.global.responsive = true;
  }
}

if($.fn.hasOwnProperty('dataTableExt')) {
  $.extend($.fn.dataTableExt.oStdClasses, {
    "sFilterInput": "form-control",
    "sLengthSelect": "form-control",
    "sPageButton": "paginate_button btn btn-outlined btn-success",
    "sPageButtonActive": "active",
    "sPageButtonDisabled": "disabled",
  });
}

if($.fn.hasOwnProperty('datetimepicker')) {
  $.extend($.fn.datetimepicker.defaults, {
    icons: {
      time: 'fontello icon-fontello-back-in-time icon-2x',
      date: 'fontello icon-fontello-calendar-alt icon-2x',
      up: 'fontello icon-fontello-up-open-3 icon-2x',
      down: 'fontello icon-fontello-down-open-3 icon-2x',
      previous: 'fontello icon-fontello-left-open-1',
      next: 'fontello icon-fontello-right-open-1',
    }
  });
}

if(window.hasOwnProperty('Dropzone')) {
  Dropzone.autoDiscover = false;
}
