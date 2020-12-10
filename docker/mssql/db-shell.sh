#!/bin/bash
dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $dir)
env_file="$PARENT/.env"
source $env_file
source "$PARENT/colors.cfg"

if [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    echo -e "${CY}The ${YL}postgres windows ${CY}shell script has been executed"
    winpty docker exec -it ${COMPOSE_PROJECT_NAME}_db.${PROVIDER}_1 bash "$@"
else 
    echo -e "${CY}The ${YL}postgres ${CY}shell script has been executed"
    docker exec -it ${COMPOSE_PROJECT_NAME}_db.${PROVIDER}_1 bash "$@"
fi;
