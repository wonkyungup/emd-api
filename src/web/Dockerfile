FROM ubuntu:18.04

RUN apt update -y && apt upgrade -y
RUN apt install -y curl sudo
RUN sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt install -y nodejs build-essential
RUN npm install -g npm@latest
RUN npm install -g express
RUN mkdir /app

WORKDIR /app

COPY src/ /app
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
ENTRYPOINT ["sh", "/app/docker-entrypoint.sh"]

EXPOSE 3000