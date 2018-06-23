#!/bin/bash

DIR="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd $DIR

npm run dev:build
npm run webpack:build

docker build -t testmean .

cd ..
