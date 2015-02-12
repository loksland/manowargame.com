#!/bin/bash

# This is used to force grunt watch process to reload/rebuild local build.

# echo "The script you are running has basename `basename $0`, dirname `dirname $0`"
# echo "The present working directory is `pwd`"

cd "`dirname "$0"`"
date > .gruntreload

