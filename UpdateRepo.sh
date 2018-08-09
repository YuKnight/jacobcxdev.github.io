#!/bin/bash

rm Packages*
./dpkg-scanpackages -m . /dev/null >Packages
mkdir PackagesBak
cp Packages PackagesBak/
bzip2 Packages
cp PackagesBak/* ./
rm -Rf PackagesBak
