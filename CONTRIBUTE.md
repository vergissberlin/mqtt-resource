# Contribute

## Environment

### Concourse ci

1. Change to the `ci` directory `cd cd`
2. Start a concourse ci test instance with vagrant `vagrant up`
3. Install concourse ci cli tool with `make fly-osx` or `make fly-linux`
4. Login to your concourse ci test instance `make login` (password: _changeme_)
5. Create you own config file `cp resources/config.yml.example resources/config.yml` and configure your credentials
6. Setup a test pipeline `make pipeline`
7. Setup another test pipeline `make example`
8. Unpause your pipelines `make unpause`

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
docker build -t concourse-resources/mqtt-resource .
```

## Test pipeline

```shell
fly login -t local -c http://0.0.0.0:8080
fly set-pipeline -t local -p mqtt-resource -c spec/fixtures/pipeline.yml -n
fly -t local unpause-pipeline -p mqtt-resource
```
