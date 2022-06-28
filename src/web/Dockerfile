FROM ubuntu:focal

RUN apt update -y && apt upgrade -y
RUN apt install -y curl sudo
RUN sudo curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN apt install -y nodejs build-essential
RUN npm install -g npm@latest
RUN npm install -g express
RUN mkdir /app

COPY src/ /app
COPY wait-for-it.sh /usr/local/bin/
COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3000