#!/bin/bash
set -e

# this throws bad substitution error
# also weird that there was no way to source colors file
# might be because it's run from another script
# was because this image uses ubuntu or something that uses bash not sh
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
. $dir/colors.cfg
filename=$(basename ${BASH_SOURCE[0]})
# filename=docker-entrypoint-db.sh

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

# for i in {1..50};
# do
#     /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P  -d master -i $dir/run.sql
#     if [ $? -eq 0 ]
#     then
#         echo -e "${GR}setup.sql completed${NC}"
#         break
#     else
#         echo "${LP}not ready yet...${NC}"
#         sleep 1
#     fi
# done

# https://docs.docker.com/compose/startup-order/
# host="$1"
# shift
# cmd="$@"

# serious issues
# https://github.com/Microsoft/mssql-docker/issues/2
# https://github.com/microsoft/sql-server-samples/tree/master/samples/containers/dtc
# https://github.com/microsoft/mssql-docker/tree/master/linux/preview/examples/mssql-customize
# https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-mssql-conf?view=sql-server-2017
# https://github.com/microsoft/sql-server-samples/tree/master/samples/tutorials
# https://github.com/lkurzyniec/netcore-boilerplate/tree/master/db/mssql
# https://www.mrjamiebowman.com/devops/docker-devops/docker-mssql-server/
# https://towardsdatascience.com/build-a-mssql-docker-container-800166ecca21
# https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-docker?view=sql-server-ver15#customcontainer
# https://stackoverflow.com/questions/56728643/how-to-iterate-over-bash-sqlcmd-output

# # RESULT=`/opt/mssql-tools/bin/sqlcmd -h -1 -t 1 -S localhost -U sa -P  -d shortpoetdb -Q "set nocount on; select count(*) from vcc.admin_users"`
# RESULT=`/opt/mssql-tools/bin/sqlcmd -h -1 -t 1 -S localhost -U sa -P  -d master -Q "SELECT name FROM master.sys.databases WHERE name = 'shortpoetdb'"`

# if [ $RESULT -gt 0 ]; then
#   echo "${LP}There appears to be a database with $RESULT users. Skipping initialization.${NC}"
# else
#   echo -e "${GR}Starting Database ${BO}init process test ${GR}- now"
#   until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 8H7gF5d -d master -i $dir/run.sql; do
#     >&2 echo -e "${GR}Mssql is ${BO}unavailable ${GR}- sleeping"
#     sleep 2
#   done
#   echo -e "${GR}Ending ${BO}init process test ${GR}- now"
    
#   >&2 echo -e "${LB}Mssql is up - ${RD}executing command sql startup command${NC}"
# fi


echo -e "${GR}Starting Database ${BO}init process test ${GR}- now"
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${MSSQL_PASSWORD} -d master -i $dir/run.sql; do
  >&2 echo -e "${GR}Mssql is ${BO}unavailable ${GR}- sleeping"
  sleep 2
done
echo -e "${GR}Ending ${BO}init process test ${GR}- now"
  
>&2 echo -e "${LB}Mssql is up - ${RD}executing command sql startup command${NC}"



# echo test

# export MY_DIR="${PWD:2}"

# ls

# exec docker-entrypoint.sh

# exec "$@"
# cd /usr/src/app
# /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P  -d master -i run.sql

# Sqlcmd: Error: Microsoft ODBC Driver 17 for SQL Server : Login timeout expired.
