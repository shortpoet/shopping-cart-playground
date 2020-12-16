#!/bin/bash
set -e

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
. $dir/colors.cfg
filename=$(basename ${BASH_SOURCE[0]})

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

echo -e "${GR}Starting Database ${BO}init process test ${GR}- now"
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${MSSQL_PASSWORD} -d master -i $dir/main.sql; do
  >&2 echo -e "${GR}Mssql is ${BO}unavailable ${GR}- sleeping"
  sleep 2
done
echo -e "${GR}Ending ${BO}init process test ${GR}- now"
  
>&2 echo -e "${LB}Mssql is up - ${RD}executing sql startup command${NC}"
