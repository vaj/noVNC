#!/usr/bin/python

# this script is used by qemu2novnc.sh

import sys
import os
import re

from vnc_keysym import *
import common


def conv(km, kb):
    kb = kb.replace('-', '_');
    print "keymap_%s = {" % (kb)
    for key, v in sorted(vnc_keysym.items(), key=lambda x:x[1]):
        keycode = vnc_keysym[key]
        shift = None
        altgr = None
        s = None
        ag = None
        if key in km:
           shift = km[key]["shift"]
           altgr = km[key]["altgr"]
        elif key in common.keymap:
           shift = common.keymap[key]["shift"]
           altgr = common.keymap[key]["altgr"]
        if (shift == None):
            continue
        if (shift):
            s = "shift: true"
        else:
            s = "shift: false"
        if (altgr):
            ag = "altgr: true"
        else:
            ag = "altgr: false"
        print "%d: { %s, %s, name: \"%s\" }," % (keycode, s, ag, key)
    print "0: {shift: false, altgr: false}"    # stopper
    print "};"



def main():
    keyboard = sys.argv[1]
    mod = __import__(keyboard)
    keymap = getattr(mod, 'keymap')
    conv(keymap, keyboard)

if __name__ == '__main__':
    main()
