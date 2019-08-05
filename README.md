# Concourse MQTT Resource  [![Twitter](https://img.shields.io/twitter/url/https/github.com/vergissberlin/mqtt-resource.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Fvergissberlin%2Fmqtt-resource)

![GitHub release](https://img.shields.io/github/release/vergissberlin/mqtt-resource.svg)
![GitHub release](https://img.shields.io/github/release-pre/vergissberlin/mqtt-resource.svg)
[![Build Status](https://travis-ci.org/vergissberlin/mqtt-resource.svg?branch=master)](https://travis-ci.org/vergissberlin/mqtt-resource)
![Docker Build Status](https://img.shields.io/docker/build/vergissberlin/mqtt-resource.svg)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/vergissberlin/mqtt-resource/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/vergissberlin/mqtt-resource/?branch=master)
[![dependencies Status](https://david-dm.org/vergissberlins/mqtt-resource/status.svg)](https://david-dm.org/vergissberlins/mqtt-resource)
![GitHub last commit](https://img.shields.io/github/last-commit/vergissberlin/mqtt-resource.svg)
[![GitHub issues](https://img.shields.io/github/issues/vergissberlin/mqtt-resource.svg)](https://github.com/vergissberlin/mqtt-resource/issues)
![Docker Pulls](https://img.shields.io/docker/pulls/vergissberlin/mqtt-resource.svg)

> Send MQTT payloads to a topic from a MQTT broker.
> Subscribing to MQTT topic to trigger jobs is not implemented yet.

## Quick Example

### Send MQTT

```yaml
- name: update-mqtt
  plan:
  - put: mqtt
    params:
      payload: Change
      topic: mytopic
```

## Source configuration

```yaml
resources:
- name: mqtt
  type: mqtt-resource
  source:
    url: mqtt://mybroker.eu
    username: xxxxx
    password: xxxxx
```

## Resource type configuration

```yaml
resource_types:
- name: mqtt-resource
  type: docker-image
  source:
    repository: vergissberlins/mqtt-resource
```

## Behavior

### `in`: _Not implemented yet_

### `out`: Creates, updates and transitions a MQTT topic

#### Parameters

* `payload`: The payload for the MQTT topic

```yaml
payload: The build was successfully
```

* `topic`: Override the topic if you want.

```yaml
topic: other/topic/to/publish
```

## Real world example

```yaml
resources:
- name: git-mqtt-resource
  type: git
  source:
    uri: git@github.com:vergissberlins/mqtt-resource.git
    branch: master
    private_key: {{private-repo-key}}

- name: docker-mqtt-resource
  type: docker
  source:
    repository: hulk/bigthing

- name: mqtt
  type: mqtt-resource
  source:
    url: https://io.adafruit.com
    password: {{adafruit-password}}
    topic: do/something

resource_types:
- name: mqtt-resource
  type: docker-image
  source:
    repository: vergissberlins/mqtt-resource
    tag: latest

jobs:
- name: build
  plan:
  - get: git-mqtt-resource
    trigger: true
  - put: docker-mqtt-resource
  - put: mqtt
    params:
      topic: do/something
      payload: Release done
      qos: 2
```
