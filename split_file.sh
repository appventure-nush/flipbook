#!/bin/sh

split -b 90M -d $1 $1
rm $1