# Getting Started

This doc details how to run this project in production, you can find instructions to run locally [here](./CONTRIBUTING.md)


## Generating kubeconfig file

So the web app can authenticate with your Kubernetes Services, you need to generate to create a service account, give the proper permissions and generate a kubeconfig file. Below the instructios to do so.

### First of all, log in into your cluster as admin
```
# Using Azure Kubernetes Service, you can do so using the following commnad
az aks get-credentials --name myAks --resource-group myRg --admin
```

### Option A: Run the create_kubeconfig.bash script to create the necessary configurations
On the root of the project, run the command: `./create_kubeconfig.bash SERVICE_ACCOUNT_NAME SERVICE_ACCOUNT_NAMESPACE`

Example:

```
./create_kubeconfig.bash helm-rest default
```

### Option B: Step by Step

You can find the Step by Step instructions [here](./KUBECONFIG_DETAILED.md)

## Running the project with Docker

To run the project using docker, simply find a suitable image from the [project's docker registry](https://hub.docker.com/repository/docker/psbds/helm-rest/tags?page=1)

Than run the following command:
```
docker run -p 80:80 -e kubeconfig=<<base64stringhere>> psbds/helm-rest:v0.1.0
```

## Running the project inside Kubernetes
TBD

## Running the project with Helm

TBD

## Available Commands

You can find all available commands and parameters [here](./docs/API_DOCS.md) or navigating to the home page of the web server, where you will find a Swagger UI.