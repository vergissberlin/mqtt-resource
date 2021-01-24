FROM alpine:3.13

ARG CODACY_PROJECT_TOKEN

LABEL maintainer.1="André Lademann <vergissberlin@googlemail.com>"

RUN apk add --no-cache \
    bash \
    git \
    jq \
    nodejs

WORKDIR /opt/resource/

ENV CODACY_PROJECT_TOKEN=$CODACY_PROJECT_TOKEN

COPY . /opt/resource

RUN npm install

RUN rm -rf \
    spec \
    package.json \
    package-lock.json

RUN chmod +x /opt/resource/out /opt/resource/in /opt/resource/check
