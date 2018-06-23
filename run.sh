#!/bin/bash

docker run \
  --name testmean \
  --restart=always \
  -e NODE_ENV=production \
  -dit testmean
