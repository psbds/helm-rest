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

You can find the helm chart to deploy this application in the deployments/helm path.


The only required parameter is the ```secrets.kubeconfig```.

Example:

```
helm install myHelmRest deployments/helm --set secrets.kubeconfig=<<base64stringhere>>
```

|Parameter                            |Type   |Required | Description|
|---                                  |---    |---      | ---|
|```secrets.kubeconfig```             |string |true     | kubeconfig base64 string to authenticate with the target cluster.
|```secrets.authenticationKey```      |string |false    | [Key to authenticate with the API in plain string](./API_DOCS.md#Add-Simple-Authentication).
|```secrets.repositories```           |string |false    | [Repositories that will be setup every time the application is started in plain string](API_DOCS.md#add-default-repositories).
|```secrets.base64AuthenticationKey```|string |false    | [Key to authenticate with the API in base64](./API_DOCS.md#Add-Simple-Authentication).
|```secrets.base64Repositories```     |string |false    | [Repositories that will be setup every time the application is started in base64](API_DOCS.md#add-default-repositories).
|```replicaCount```                   |string |true     | Number of replicas for the application running on the cluster.
|```image.tag```                      |string |true     | Tag of this project Docker image. Defaults to ```v0.1.0```.
|```service.type```                   |string |false    | Sets service type. Defaults to ```ClusterIP```.
|```service.ports```                  |string |false    | Sets service http port. Defaults to ```80```.
|```resources.limits.cpu```	          |string |false    | Set pod CPU resource limits. Defaults to ```200m```.
|```resources.limits.memory```        |string |false    | Set pod CPU resource limits. Defaults to ```256Mi```.
|```resources.requests.cpu```	      |string |false    | Set pod CPU resource limits. Defaults to ```100m```.
|```resources.requests.memory```	  |string |false    | Set pod CPU resource limits. Defaults to ```128Mi```.
|```nodeSelector```	                  |object |false    | Node labels for pod assignment.
|```tolerations```	                  |object |false    | Node taints to tolerate (requires Kubernetes >=1.6).
|```affinity```	                      |object |false    | Node/pod affinities (requires Kubernetes >=1.6).	


## Available Commands

You can find all available commands and parameters [here](./API_DOCS.md) or navigating to the home page of the web server, where you will find a Swagger UI.