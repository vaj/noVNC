:
if [ $# -eq 0 ]; then
  echo usage: $0 source-directory-of-qemu
  exit 1
fi
#qemu=/usr/src/qemu-kvm-1.0+noroms
qemu=$1

keysym=${qemu}/ui/vnc_keysym.h
keymaps=${qemu}/pc-bios/keymaps/

echo sh vnc_keysym.sh $keysym
sh vnc_keysym.sh $keysym > vnc_keysym.py

for km in $keymaps/*
do
  kb=`basename $km`
  echo sh kb.sh $km
  sh kb.sh $km > ${kb}.py
done

for km in $keymaps/*
do
  kb=`basename $km`
  if [ $kb = modifiers -o $kb = common ]; then
      continue
  fi
  echo python keyconv.py $kb
  python keyconv.py $kb > $kb.js
done
