#!/bin/bash

rm -Rf Packages*
mkdir Packages\ Backup
./dpkg-scanpackages -m . /dev/null >Packages
cp Packages Packages\ Backup/
bzip2 Packages
cp Packages\ Backup/Packages ./
gzip Packages
cp Packages\ Backup/Packages ./
rm -Rf Packages\ Backup
