# Contribute

| context          | value         |
| ---------------- | ------------- |
| **Branch**       | development   |
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
docker build --build-arg CODACY_PROJECT_TOKEN -t vergissberlin/mqtt-resource .
docker push vergissberlin/mqtt-resource
```

## Test pipeline

### Setup Concourse CI and MQTT test server

```shell
docker-compose -f spec/fixtures/docker-compose.yml up
```

### Set the pipeline

```shell
fly login -t local -c http://0.0.0.0:8010
fly set-pipeline -t local -p mqtt-resource -c spec/fixtures/pipeline.yml -n
fly -t local unpause-pipeline -p mqtt-resource
```

## Debug pipeline

```shell
fly hijack -t local -j mqtt-resource/test
```
