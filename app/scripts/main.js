import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import '../styles/style.css';

import MINI from './vendor/minified.js';
import echoFactory from 'echo-js';

const echo = echoFactory(window);
const $ = MINI.$;

$(function () {
    // initialize
    echo.init();
    // scroll event
    var poll = null;
    $('.row:last-child').on('scroll', function () {
        if (!!poll) {
            return;
        }
        clearTimeout(poll);
        poll = setTimeout(function () {
            echo.render();
            poll = null;
        }, 100);
    });
});
