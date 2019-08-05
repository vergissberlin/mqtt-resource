# Concourse MQTT Resource

![Status](https://img.shields.io/badge/status-in%20progress-red.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/concourse-resource/mqtt-resource.svg)
[![Build Status](https://travis-ci.org/concourse-resources/mqtt-resource.svg?branch=master)](https://travis-ci.org/concourse-resources/mqtt-resource)
[![dependencies Status](https://david-dm.org/concourse-resources/mqtt-resource/status.svg)](https://david-dm.org/concourse-resources/mqtt-resource)
[![devDependencies Status](https://david-dm.org/concourse-resources/mqtt-resource/dev-status.svg)](https://david-dm.org/concourse-resources/mqtt-resource?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/concourse-resources/mqtt-resource.svg)](https://greenkeeper.io/)

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
    url: https://mqttbroker.sample
    password: xxxxx
```

## Resource type configuration

```yaml
resource_types:
- name: mqtt-resource
  type: docker-image
  source:
    repository: concourse-resources/mqtt-resource
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
    uri: git@github.com:concourse-resources/mqtt-resource.git
    branch: master
    private_key: {{private-repo-key}}

- name: docker-mqtt-resource
  type: docker
  source:
    uri:

- name: mqtt
  type: mqtt-resource
  source:
    url: https://io.adafruit.com
    password: {{adafruit-password}}
    topic: defaulttopic

resource_types:
- name: mqtt-resource
  type: docker-image
  source:
    repository: concourse-resources/mqtt-resource
    tag: latest

jobs:
- name: build
  plan:
  - get: git-mqtt-resource
    trigger: true
  - put: docker-mqtt-resource
  - put: mqtt
    params:
      topic: overridetopic
      payload: Release done
      qos: 2
```
