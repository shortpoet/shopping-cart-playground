#!/bin/sh
GR="\033[0;32m"
BO="\033[0;33m"

set -e

echo -e "${GR}The alpine Client Dockerfile ${BO}ENTRYPOINT ${GR}has been executed!"

# export MY_DIR="${PWD:2}"

exec "$@"
