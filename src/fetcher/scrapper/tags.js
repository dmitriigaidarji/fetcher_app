/**
 * Created by dmitrii on 7/15/16.
 */
"use strict";
var system = require('system');
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36';
page.onError = function(msg, trace) {

};
var url;
if (system.args.length === 1) {
    console.log('Try to pass url as an argument!');
    phantom.exit();
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

page.open(url, function (status) {
    var tagsElement = page.evaluate(function () {
        function getStyle(el, styleProp) {
            var value, defaultView = (el.ownerDocument || document).defaultView;
            // W3C standard way:
            if (defaultView && defaultView.getComputedStyle) {
                // sanitize property name to css notation
                // (hypen separated words eg. font-Size)
                styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            } else if (el.currentStyle) { // IE
                // sanitize property name to camelCase
                styleProp = styleProp.replace(/\-(\w)/g, function (str, letter) {
                    return letter.toUpperCase();
                });
                value = el.currentStyle[styleProp];
                // convert other units to pixels on IE
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                    return (function (value) {
                        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                        el.runtimeStyle.left = el.currentStyle.left;
                        el.style.left = value || 0;
                        value = el.style.pixelLeft + "px";
                        el.style.left = oldLeft;
                        el.runtimeStyle.left = oldRsLeft;
                        return value;
                    })(value);
                }
                return value;
            }
        }
        function getText(node) {
            var text = node.textContent || node.innerText || ""
            return text.trim().replace(/\s+/g, ' ');
        }
        function saveNodesToArray(tag, array) {
            var nodes = document.body.getElementsByTagName(tag);
            for (i = 0; i < nodes.length; i ++){
                node = nodes[i];
                value = getText(node);
                if (value != '') {
                    array.push(value);
                }
            }
        }

        var allNodes = document.body.getElementsByTagName('*');
        var underlinedNodes = [],
            italicNodes = [],
            boldNodes = [],
            titleNodes = [],
            h1Nodes = [],
            h2Nodes = [],
            h3Nodes = [],
            h4Nodes = [],
            liNodes = [],
            imageTitleNodes = [],
            imageAltNodes = [];

        for (var i = 0; i < allNodes.length; i ++){
            var node = allNodes[i];
            var value = getText(node);
            if (value != '') {
                if (getStyle(node, 'textDecoration') == 'underline') underlinedNodes.push(value);
                if (getStyle(node, 'fontStyle') == 'italic') italicNodes.push(value);
                if (getStyle(node, 'fontWeight') == 'bold') boldNodes.push(value);
            }
        }
        saveNodesToArray('strong',boldNodes);
        saveNodesToArray('b',boldNodes);
        saveNodesToArray('title',titleNodes);
        saveNodesToArray('h1',h1Nodes);
        saveNodesToArray('h2',h2Nodes);
        saveNodesToArray('h3',h3Nodes);
        saveNodesToArray('h4',h4Nodes);
        saveNodesToArray('li',liNodes);

        var images = document.body.getElementsByTagName("img");
        for (i = 0; i < images.length; i++){
            var image = images[i];
            var title = image.title;
            var alt = image.alt;
            if (title != '') imageTitleNodes.push(title);
            if (alt != '') imageAltNodes.push(alt);
        }
        
        return {
            titles : titleNodes,
            h1 : h1Nodes,
            h2 : h2Nodes,
            h3 : h3Nodes,
            h4 : h4Nodes,
            lists : liNodes,
            imtitles : imageTitleNodes,
            imalts : imageAltNodes,
            underlined: underlinedNodes,
            italic: italicNodes,
            bold: boldNodes
        };
    });
    console.log(JSON.stringify(tagsElement));
    phantom.exit();
});

