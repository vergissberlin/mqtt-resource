FROM alpine:3.7

LABEL maintainer.1="André Lademann <vergissberlin@googlemail.com>"

RUN apk add --no-cache \
    bash \
    nodejs

WORKDIR /opt/resource/
COPY . /opt/resource

RUN ls -lisah

RUN chmod +x /opt/resource/out /opt/resource/in /opt/resource/check

RUN npm install
RUN npm test

RUN rm -rf \
    spec \
    package.json \
    package-lock.json

RUN ls -lisah
