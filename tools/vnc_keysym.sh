:

# this script is used by qemu2novnc.sh

#sym=vnc_keysym.h
sym=$1
if [ X${sym} = "X" ]; then
   echo "usage: $0 vnc_keysym.h"
   exit 1
fi

awk 'BEGIN {FS=","; print "vnc_keysym = {"};
 /.*{.*},.*/ {
   sub(/^ *{ */, "", $1);
   sub(/ *$/, "", $1);
   sub(/ *} *$/, "", $2);
   sub(/^ */, "", $2);
   if ($1 !~ /NULL/) print $1 ":" $2 ","
 }
 END { print "};" }' ${sym}
