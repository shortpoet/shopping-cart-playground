#!/bin/bash

dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $dir)
source "$PARENT/.env"
source "$PARENT/colors.cfg"
filename=$(basename ${BASH_SOURCE})

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

docker run --rm -v ${PWD}/client:/usr/src/app -v notused:/usr/src/app/node_modules -p 4000:4000 ${COMPOSE_PROJECT_NAME}.client:alpine
