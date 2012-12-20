/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Hirokazu Takahashi
 * Licensed under MPL 2.0 or any later version (see LICENSE.txt)
 */

"use strict";
/*jslint white: false, browser: true, bitwise: false, plusplus: false */
/*global Util*/

var Kmap = {};
Kmap.keymaps = {};
Kmap.keymaps['ja'] = keymap_ja;
Kmap.keymaps['en-us'] = keymap_en_us;
Kmap.keymaps['en-gb'] = keymap_en_gb;
Kmap.keymaps['de'] = keymap_de;

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
