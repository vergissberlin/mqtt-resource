# Concourse MQTT Resource

![Status](https://img.shields.io/badge/status-ALPHA-blue.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/vergissberlin/mqtt-resource.svg)
[![Build Status](https://travis-ci.org/vergissberlin/mqtt-resource.svg?branch=master)](https://travis-ci.org/vergissberlin/mqtt-resource)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a5994d1cacb9429cbaf36e324a05b9ab)](https://www.codacy.com/app/vergissberlin/mqtt-resource?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=vergissberlin/mqtt-resource&amp;utm_campaign=Badge_Grade)
[![dependencies Status](https://david-dm.org/vergissberlins/mqtt-resource/status.svg)](https://david-dm.org/vergissberlins/mqtt-resource)

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
    prefix: /topic/prefix/${BUILD_TEAM_NAME}/${BUILD_PIPELINE_NAME}
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
    topic: defaulttopic

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
      topic: overridetopic
      payload: Release done
      qos: 2
```
