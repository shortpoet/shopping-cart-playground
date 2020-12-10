#!/bin/bash
set -e

dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
PARENT=$(dirname $dir)
filename=$(basename ${BASH_SOURCE})
dir_file="$(basename $dir)/$filename"
env_file="$PARENT/.env"
source $env_file
source "$PARENT/colors.cfg"

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${dir_file} ${CY}script has been executed${NC}"


if [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    echo -e "${GR}Running under ${LB}GNU/Linux"
    POSTGRES_HOST=172.17.0.1
    PGVOLUME=/var/lib/postgresql/pgdata
    echo -e "${YL}Setting POSTGRES_HOST to ${LB}${POSTGRES_HOST}"
    echo -e "${YL}Setting PGVOLUME to ${LB}${PGVOLUME}"
    
    # Do something under GNU/Linux platform
else
    echo -e "${GR}Not running under ${LB}GNU/Linux"
    POSTGRES_HOST=db.postgres
    PGVOLUME=/var/lib/postgresql/data
    echo -e "${YL}Setting POSTGRES_HOST to ${LB}${POSTGRES_HOST}"
    echo -e "${YL}Setting PGVOLUME to ${LB}${PGVOLUME}"
fi
# export POSTGRES_HOST=$POSTGRES_HOST

perl -i -pe "s/POSTGRES_HOST=.*/POSTGRES_HOST=${POSTGRES_HOST}/g" "${env_file}"
# replacement string contains '/' which is separator causing error:
    # unknown regexp modifier "/v" at -e line 1, at end of line
    # use different separator '#'
perl -i -pe "s#PGVOLUME=.*#PGVOLUME=${PGVOLUME}#g" "${env_file}"

grep -n "POSTGRES_HOST=.*" "${env_file}" | xargs echo -e "${GR}Current value and line number =>${LB}"
grep -n "PGVOLUME=.*" "${env_file}" | xargs echo -e "${GR}Current value and line number =>${LB}"

docker-compose up

# echo -e "Current value and line number => `grep -n "POSTGRES_HOST=.*" "${env_file}"`"