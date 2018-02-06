/**
 * Created by dmitrii on 7/15/16.
 */
"use strict";
var system = require('system');
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36';

var url;
if (system.args.length === 1) {
    console.log('Try to pass some args when invoking this script!');
} else {
    url = system.args[1]
}

function waitFor ($config) {
    $config._start = $config._start || new Date();

    if ($config.timeout && new Date - $config._start > $config.timeout) {
        if ($config.error) $config.error();
        if ($config.debug) console.log('timedout ' + (new Date - $config._start) + 'ms');
        return;
    }

    if ($config.check()) {
        if ($config.debug) console.log('success ' + (new Date - $config._start) + 'ms');
        return $config.success();
    }

    setTimeout(waitFor, $config.interval || 0, $config);
}

// console.log("URL: " + url);
page.open(url, function (status) {
    waitFor({
        debug: false,  // optional
        interval: 0,  // optional
        timeout: 10000,  // optional
        check: function () {
            return page.evaluate(function() {
                return document.getElementById('brs') !== null
            });
        },
        success: function () {
            var tags = page.evaluate(function () {
                var block = document.getElementById('brs');
                var related = block.querySelectorAll('p');
                var results = [];
                for (var i = 0; i < related.length; i++){
                    var tmp = related[i].querySelector('a');
                    results.push(tmp.textContent || tmp.innerText || "");
                }
                return results;
            });
            console.log(tags);
            phantom.exit();
        },
        error: function () {
             phantom.exit();
        } // optional
    });
});
