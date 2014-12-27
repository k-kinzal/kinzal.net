'use strict';
/* global require:true */
var MINI = require('minified');
var $ = MINI.$, HTML = MINI.HTML;

$(function() {
	// initialize
  /* global echo:true */
	echo.init();
	// scroll event
	var poll = null;
	$('.row:last-child').on('scroll', function() {
    if(!!poll) {
      return;
    }
    clearTimeout(poll);
    poll = setTimeout(function(){
      echo.render();
      poll = null;
    }, 100);
	});
});
