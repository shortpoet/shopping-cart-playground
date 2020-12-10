#!/bin/bash
set -e


if [ "${DOCKER}" == "1" ]; then
  filename=$(basename $0)
  source colors.cfg

else
  dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
  PARENT=$(dirname $dir)
  source "$PARENT/.env"
  source "$PARENT/colors.cfg"
  filename=$(basename ${BASH_SOURCE})
  echo $PROVIDER
fi

. ~/.bashrc

# source colors.cfg
# filename=$(basename $0)


# dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
# PARENT=$(dirname $dir)
# source "$PARENT/.env"
# source "$PARENT/colors.cfg"
# filename=$(basename ${BASH_SOURCE})
# echo $PROVIDER

echo -e "${CY}The ${YL}${COMPOSE_PROJECT_NAME} ${filename} ${CY}script has been executed"

# https://docs.docker.com/compose/startup-order/
host="$1"
echo -e "${LP}Host is $host${NC}"
shift
cmd="$@"

if [ "${PROVIDER}" == "postgres" ]; then
  echo -e "${GR}Running under ${LB}Postgres"
  until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" "$POSTGRES_DB" -c '\q'; do
  >&2 echo -e "${GR}Postgres is ${BO}unavailable ${GR}- sleeping"
  sleep 2
done

# https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-configure-docker?view=sql-server-ver15
# The IP address in the connection string is the IP address of the host machine that is running the container.
else
  echo -e "${GR}Running under ${LB}Sql Server"
  # sqlcmd -?
  # sqlcmd -S db.mssql -U test -P  -d shortpoetdb -q "Select * from vcc.admin_users"
  # sqlcmd -S 192.168.1.108 -U test -P  -d shortpoetdb -q "Select * from vcc.admin_users"
  until sqlcmd -S db.mssql -U "${MSSQL_USER}" -P "${MSSQL_PASSWORD}" -d shortpoetdb -q ":exit"; do
  >&2 echo -e "${GR}Mssql is ${BO}unavailable ${GR}- sleeping"
  sleep 2
done
fi

>&2 echo -e "${LB}${PROVIDER} Database is up - ${RD}executing command${NC}"
exec $cmd

# while ! nc -z rabbitmq 5672; do sleep 3; done

# exec "$@"
