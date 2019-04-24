# Concourse MQTT  Resource 

[![Build Status](https://travis-ci.org/concourse-resources/mqtt-resource.svg?branch=master)](https://travis-ci.org/concourse-resources/mqtt-resource)
[![dependencies Status](https://david-dm.org/concourse-resources/mqtt-resource/status.svg)](https://david-dm.org/concourse-resources/mqtt-resource)
[![devDependencies Status](https://david-dm.org/concourse-resources/mqtt-resource/dev-status.svg)](https://david-dm.org/concourse-resources/mqtt-resource?type=dev) [![Greenkeeper badge](https://badges.greenkeeper.io/concourse-resources/mqtt-resource.svg)](https://greenkeeper.io/)


Subscribe to MQTT feed and trigger jobs.
Send MQTT messages to a feed from a MQTT broker.

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
      payload: Change
      feed: myfeed
```

Source Configuration
--------------------

```yaml
resources:
- name: mqtt
  type: mqtt-resource
  source:
    url: https://io.adafruit.com
    token: xxxxx
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

### `in`: Listen on a MQTT feed

#### Parameters
*none*


### `out`: Creates, updates and transitions a MQTT feed

#### Parameters

* `payload`: The payload for the MQTT message
```yaml
payload: The build was successfully
```
* `feed`: Override the feed if you want.
```yaml
feed: otherfeed
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
    token: {{adafruit-token}}
    feed: defaultfeed

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
      feed: overridefeed
      payload: Release done
    
```
