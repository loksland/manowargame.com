#!/bin/bash

cd "`dirname "$0"`"

kill -9 $(ps aux | grep '\snode\s' | awk '{print $2}')


cd _localhost

node _localhost
