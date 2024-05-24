#!/bin/sh

. ./.env

podman build -t freeswitch . --build-arg TOKEN=$PAT

