FROM ubuntu:18.04

EXPOSE 3000

RUN apt update -y && apt upgrade -y

# install node
RUN apt install -y curl sudo
RUN sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt install -y nodejs build-essential
RUN npm install -g npm@latest

# install express
RUN npm install -g express

# make folder
RUN mkdir -p /app/src

# copy shell file
COPY src/ /app
COPY docker-entrypoint.sh /app/docker-entrypoint.sh

# npm install
WORKDIR /app