#!/bin/bash
docker build . --file Dockerfile --tag liz3/illyria:lol-profile
docker push liz3/illyria:lol-profile