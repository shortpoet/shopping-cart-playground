#!/bin/bash
set -e

dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $dir)
filename=$(basename ${BASH_SOURCE})
dir_file="$(basename $dir)/$filename"
env_file="$PARENT/.env"
source $env_file
source "$PARENT/colors.cfg"

# export GREP_COLOR='31' # red
export GREP_COLOR='32' # green
# export GREP_COLOR='35' # magenta
# export GREP_COLOR='36' # cyan

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${dir_file} ${CY}script has been executed${NC}"


docker-compose build --force-rm | egrep --color "\b(cache)\b|$"
