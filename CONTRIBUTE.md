# Contribute

| context          | value                                                      |
| ---------------- | ---------------------------------------------------------- |
| **Branch**       | development                                                |
| **Code review**  | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/vergissberlin/mqtt-resource/badges/quality-score.png?b=development)](https://scrutinizer-ci.com/g/vergissberlin/mqtt-resource/?branch=development)  |

## Environment

### Concourse resource

1. Install all dependencies `npm install` and `sudo gem install terminal-notifier` (for OSX notifications)
2. Run the tests `npm test`
3. Run the tests with a change watcher `npm run test-watch`
4. Run the tests with a change watcher and debugger `npm run test-watch-debug`

## Make code changes

1. Make a fork
2. Run all tests
3. Create a pull request

## Custom build

```shell
docker-compose build --build-arg CODACY_PROJECT_TOKEN
docker-compose push
docker-compose up -d
docker push vergissberlin/mqtt-resource
```

```shell
docker build -t vergissberlin/mqtt-resource:development . && docker push vergissberlin/mqtt-ressource:development
```

## Test pipeline

### Setup Concourse CI and MQTT test server

```shell
docker-compose -f spec/fixtures/docker-compose.yml up
```

### Set the pipeline

```shell
fly login -t local -c http://0.0.0.0:8010
fly set-pipeline -t local -p mqtt-resource -c examples/concourse/pipeline.yml -n
fly -t local unpause-pipeline -p mqtt-resource
```

### Destroy pipeline

```shell
fly -t local destroy-pipeline -p mqtt-resource
```

## Debug

Set ``debug: true`` in the pipeline at the source cobfiguration part.

```yml
resource_types:
- name: mqtt-resource
  type: docker-image
  source:
    repository: vergissberlin/mqtt-resource
    tag: development
    debug: true
```

### Pipeline

```shell
fly hijack -t local -j mqtt-resource/test
```

### Listen MQTT messages

#### With Docker

```shell
docker-compose exec mqtt mosquitto_sub -t 'test' -h 'test.mosoquitto.org'
```

#### With node

```shell
./node_modules/.bin/mqtt_sub -t 'test' -h 'test.mosoquitto.org'
```

### Send MQTT messages

#### Send MQTT messages with Docker

```shell
docker-compose exec mqtt mosquitto_pub -t 'test' -h 'test.mosquitto.org' -m 'test message' -r
```

#### Send MQTT messages with node

```shell
./node_modules/.bin/mqtt_pub -t 'test' -h 'test.mosquitto.org' -m 'test message' -r
```
