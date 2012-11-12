/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Licensed under LGPL-3 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 *
 * TIGHT decoder portion:
 * (c) 2012 Michael Tinglof, Joe Balaz, Les Piech (Mercuri.ca)
 */

"use strict";
/*jslint white: false, browser: true, bitwise: false, plusplus: false */
/*global Util*/

var Kmap = {};
Kmap.keymaps = {};

Kmap.loadKeymap = function (kb) {
    if (!kb || kb === 'default' || typeof Kmap.keymaps[kb] !== 'undefined') {
        return;
    }
    Kmap.keymaps[kb] = null;		// Now loading
    Util.load_scripts(["keymaps/" + kb + ".js"],
        function () {
            var components = this.src.split("/"),
                kb = components[components.length - 1].split(".")[0],
                km = kb.replace(/[\-\+]/, "_");
            km = "Kmap.keymaps['" + kb + "'] = keymap_" + km;
            try {
                eval(km);
            } catch (e) {
                delete Kmap.keymaps[kb];
            }
        }
    );
};

Kmap.getKeymap = function (kb) {
    return Kmap.keymaps[kb];
};
