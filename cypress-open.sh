#!/bin/bash

#IP="$(ifconfig lo | grep 'inet ' | awk '{print $2}')"
#/bin/xhost + "$IP"

# docker run -it --network="host" -v $PWD:/cypress/e2e -w /cypress/e2e cypress/included:latest open
DISPLAY="$(ifconfig lo | grep 'inet ' | awk '{print $2}')"

docker run -it --network="host" \
    -v $PWD:/cypress/e2e \
    -w /cypress/e2e \
    -e DISPLAY=$DISPLAY \
    -e XAUTHORITY=/.Xauthority \
    -v ~/.Xauthority:/.Xauthority \
    -v /tmp/.X11-unix:/tmp/.X11-unix \
    --entrypoint=/root/.cache/Cypress/13.8.0/Cypress/Cypress \
    cypress/included:latest \
    open --config video=false --no-sandbox
