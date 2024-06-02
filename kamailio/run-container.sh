#!/bin/sh
#podman run --rm -d --network=host -v $(pwd)/configuration:/etc/kamailio --name kamailio kamailio:latest
#podman run --rm -d --network=host --name kamailio kamailio:latest
podman run --rm -d --network=host -v $(pwd)/supervisord.conf:/etc/supervisor/conf.d/supervisord.conf -v $(pwd)/configuration:/etc/kamailio --name kamailio kamailio:latest