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

/*jslint white: false, browser: true, bitwise: false, plusplus: false */
/*global window, get_INCLUDE_URI, load_scripts */


var Kmap = {};
Kmap.keymaps = {};

Kmap.loadKeymap = function (kb) {
    if (!kb || kb === 'default' || typeof Kmap.keymaps[kb] !== 'undefined')
        return;
    Kmap.keymaps[kb] = null;		// Now loading
    load_scripts(get_INCLUDE_URI() + "keymaps/", [kb + ".js"],
        function () {
            var kb = this.src.split("/");
            kb = kb[kb.length -1].split(".")[0];
            var km = kb.replace(/[\-\+]/,"_");
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
