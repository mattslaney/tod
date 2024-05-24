podman run --rm -d --network=host --name freeswitch -v $(pwd)/configuration:/etc/freeswitch -v $(pwd)/tmp:/tmp freeswitch:latest
