:

# this script is used by qemu2novnc.sh

#kb=de/ja/en-us/en-gb...
kb=$1
if [ X${kb} = "X" ]; then
   echo "usage: $0 keymap-file"
   exit 1
fi

awk '
 BEGIN { print "keymap = {"};
 /^include/ { next }
 /^[0-9A-Za-z]/ { 
  if ($3 == "shift" || $4 == "shift" || $5 == "shift" || $6 == "shift")
     s="\"shift\":True"
  else
     s="\"shift\":False"
  if ($3 == "altgr" || $4 == "altgr" || $5 == "altgr" || $6 == "altgr")
     ag="\"altgr\":True"
  else
     ag="\"altgr\":False"
  if ($3 == "addupper" || $4 == "addupper" || $5 == "addupper" || $6 == "addupper") {
     upper=1
     capital=toupper($1)
  } else {
     upper=0
  }
  print "\""$1"\": {" s ", " ag "},"
  if (upper == 1) {
     s="\"shift\":True"
     print "\""capital"\": {" s ", " ag "},"
  }
 };
 END { print "};"
}' ${kb}

#
# /^[:alnum:]/ { print $0 } \
# /^[a-z0-9]/ { 
#
