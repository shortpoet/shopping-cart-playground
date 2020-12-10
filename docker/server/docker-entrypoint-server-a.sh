#!/bin/sh
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

else
  echo -e "${GR}Running under ${LB}Sql Server"
  until /opt/mssql-tools/bin/sqlcmd -S localhost -U test -P ${MSSQL_PASSWORD} -d shortpoetdb; do
  >&2 echo -e "${GR}Mssql is ${BO}unavailable ${GR}- sleeping"
  sleep 2
done
fi

  
>&2 echo -e "${LB}${PROVIDER} Database is up - ${RD}executing command${NC}"
exec $cmd

# while ! nc -z rabbitmq 5672; do sleep 3; done

# exec "$@"
