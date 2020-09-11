# Contributing

This document, explains how to contribute for this project and how to run locally.

## Contribution Guidelines

Feel free to contribute with fork/pull Requests or raising issues/questions.

To contribute, please make sure of the following:
- All new features or feature changes, must have unit tests
- Please follow the [GitFlow Guidelines](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- Suggestions of how to improve the code (refactoring) are always welcome.

## Setting up Environment Variables

To set up the environment variables for the projects simply, create a .env file at the root of the project.

This file will be read whenever the NODE_ENV variable is set to ```develop```. Example:
```
kubeconfig=<<base64stringhere>>
```
Obs: The kubeconfig file is the only mandatory field to run the project, you can find the complete documentation of how to generate it [here](./GETTING_STARTED).

## Running the Project

It's recommended to run using VSCode and Remote Containers Extensions, which contains all the necessary dependencies to run. You can find the full documentation [here](https://code.visualstudio.com/docs/remote/containers).


After starting VSCode in a Container Environment, you have the following options:

#### VSCode Launch

Inside the ```.vscode/launch.json```, there's the following configurations:

| Configuration Name | Description|
|---                 |---|
| Debug              | Run the Project with debug attached.|
| Test               | Run the Unit Tests with debug attached.|


#### NPM Scripts

Inside the package.json, you will find the following commands:

| Command            | Description|
|---                 |---|
| ```compile```      | Run the typescript transipler to create the project .js files inside the ```bin``` folder, also runs the ```swagger``` command.|
| ```debug```        | Runs the ```compile``` command and starts the project in debug mode.|
|```start```         | Starts the project in non-debug mode. OBS: ```compile``` command is required before.|
| ```test```         | Runs unit tests and write results to the ```testReport/test-results.xml``` file|
| ```test-debug```   | Runs unit tests in debug mode.|
| ```test-local```   | Runs unit tests and show results in console.|
| ```test-mutation```| Runs mutation tests using [Stryker](https://stryker-mutator.io/).|
| ```coverage```         | Runs the compile command and check code coverage from the unit tests writing results to the ```testReport/cobertura-coverage.xml``` file.|
| ```coverage-local```         | Runs the compile command and check code coverage from the unit tests writing results to the console.|
| ```swagger```     | Read the Swagger annotations in the code, and create the ```bin/swagger.json``` file.|

## Continuous Integration

The setup for continuous integration is done using Azure DevOps.

You can find the public project [here](https://dev.azure.com/padasil/helm-rest).

With the pipeplines

| Pipeline           | Description
|---                 |---
| Integration Master | For builds regarding the master branch. [Link](https://dev.azure.com/padasil/helm-rest/_build?definitionId=18&_a=summary)
| Integration Develop| For builds regarding the develop branch. [Link](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17&_a=summary)