#!/bin/sh

. ./.env

podman build -t freeswitch . --build-arg TOKEN=$PAT --build-arg FS_PASSWORD=$FS_PASSWORD

