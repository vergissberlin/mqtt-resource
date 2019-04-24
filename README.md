# Concourse MQTT  Resource 

![Status](https://img.shields.io/badge/status-in%20progress-red.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/concourse-resource/mqtt-resource.svg)
[![Build Status](https://travis-ci.org/concourse-resources/mqtt-resource.svg?branch=master)](https://travis-ci.org/concourse-resources/mqtt-resource)
[![dependencies Status](https://david-dm.org/concourse-resources/mqtt-resource/status.svg)](https://david-dm.org/concourse-resources/mqtt-resource)
[![devDependencies Status](https://david-dm.org/concourse-resources/mqtt-resource/dev-status.svg)](https://david-dm.org/concourse-resources/mqtt-resource?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/concourse-resources/mqtt-resource.svg)](https://greenkeeper.io/)


Subscribe to MQTT topic and trigger jobs.
Send MQTT messages to a topic from a MQTT broker.

Quick Example
-------------

### Listen MQTT

```yaml
- name: update-mqtt
  plan:
  - get: mqtt
    trigger: true
```

### Send MQTT
```yaml
- name: update-mqtt
  plan:
  - put: mqtt
    params:
      message: Change
      topic: mytopic
```

Source Configuration
--------------------

```yaml
resources:
- name: mqtt
  type: mqtt-resource
  source:
    url: https://mqttbroker.sample
    password: xxxxx
```

Resource Type Configuration
---------------------------

```yaml
resource_types:
- name: mqtt-resource
  type: docker-image
  source:
    repository: concourse-resources/mqtt-resource
```

Behavior
--------

### `in`: _Not implemented yet_


### `out`: Creates, updates and transitions a MQTT topic

#### Parameters

* `message`: The message for the MQTT topic
```yaml
message: The build was successfully
```
* `topic`: Override the topic if you want.
```yaml
topic: other/topic/to/publish
```

Real world example
------------------

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
  - get: version
  - put: docker-mqtt-resource    
  - put: mqtt
    params:
      topic: overridetopic
      message: Release done
    
```
