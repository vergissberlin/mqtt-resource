FROM alpine:3.7

LABEL maintainer.1="André Lademann <vergissberlin@googlemail.com>"

RUN apk add --no-cache \
    bash \
    jq \
    nodejs

WORKDIR /opt/resource/

RUN npm install

RUN rm -rf \
    spec \
    package.json \
    package-lock.json

COPY . /opt/resource
RUN chmod +x /opt/resource/out /opt/resource/in /opt/resource/check

