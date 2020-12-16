#!/bin/bash

dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $dir)
source "$PARENT/.env"
source "$PARENT/colors.cfg"
filename=$(basename ${BASH_SOURCE})

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

winpty docker exec -it ${COMPOSE_PROJECT_NAME}_server.dev_1  bash "$@"
