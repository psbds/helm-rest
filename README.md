# Helm Rest

[![Build Status ](https://img.shields.io/azure-devops/build/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/17/develop?label=build%3A%20develop)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)
[![Build Status ](https://img.shields.io/azure-devops/build/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/18?label=build%3A%20master)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)


[![Build Status ](https://img.shields.io/azure-devops/tests/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/17?label=tests%3A%20develop&passed_label=good&failed_label=bad&skipped_label=n%2Fa)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)
[![Build Status ](https://img.shields.io/azure-devops/tests/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/18?label=tests%3A%20master&passed_label=good&failed_label=bad&skipped_label=n%2Fa)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)

[![Build Status ](https://img.shields.io/azure-devops/coverage/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/17?label=coverage%3A%20develop)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)
[![Build Status ](https://img.shields.io/azure-devops/coverage/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/18?label=coverage%3A%20master)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)

## Running the Project

### Running using Node Debugger

1. First restore node dependencies using ```npm install```

2. Then, at the root of the project, create a .env file with the following content
    ```
    kubeconfig=<<base64stringhere>>
    ```

3. Run ```npm start```

### Running with Docker locally

1. At the root of the project, build the image from the Dockerfile
    ```
    docker build . -t helm-rest:latest
    ```
2. Run the docker image
    ```
    docker run -p 80:80 -e kubeconfig=<<base64stringhere>> helm-rest
    ```

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
#### 1. Create the Service Account
```
# Create a Service Account name `helm-rest` in the default namespaces.
kubectl create serviceaccount helm-rest -n default
```

#### 2. Create the service account permissions
```
# Create a Cluster Role and Cluster Role Binding with the permissions for the service account, 
# you can edit this command to have more granular and secure set of permissions

cat <<EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  name: helm-rest-role
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: helm-rest-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: helm-rest-role
subjects:
- kind: ServiceAccount
  name: helm-rest
  namespace: default
EOF
```

#### 3. Create the Kubeconfig file
```
SERVICE_ACCOUNT_NAME="helm-rest"
SERVICE_ACCOUNT_NAMESPACE="default"
SA_SECRET=$( kubectl get sa -n $SERVICE_ACCOUNT_NAMESPACE $SERVICE_ACCOUNT_NAME -o jsonpath='{.secrets[0].name}' )

# Pull the bearer token and cluster CA from the service account secret.
BEARER_TOKEN=$( kubectl get secrets -n $SERVICE_ACCOUNT_NAMESPACE $SA_SECRET -o jsonpath='{.data.token}' | base64 -d )

# Get Certificate File
CERTIFICATE=$(kubectl get secrets -n default $SA_SECRET -o jsonpath='{.data.ca\.crt}')

# Get Cluster Url
CURRENT_CONTEXT=$(kubectl config current-context)
CURRENT_CLUSTER=$(kubectl config view -o jsonpath="{.contexts[?(@.name == \"$CURRENT_CONTEXT\")].context.cluster}")
CLUSTER_URL=$(kubectl config view -o jsonpath="{.clusters[?(@.name == \"$CURRENT_CLUSTER\")].cluster.server}")

# Generate KubeConfig File
KUBECONFIG=./kubeconfig
kubectl config --kubeconfig=$KUBECONFIG \
    set-cluster \
    $CLUSTER_URL \
    --server=$CLUSTER_URL 

kubectl config --kubeconfig=$KUBECONFIG \
    set clusters.$CLUSTER_URL.certificate-authority-data $CERTIFICATE

kubectl config --kubeconfig=$KUBECONFIG \
    set-credentials $SERVICE_ACCOUNT_NAME --token=$BEARER_TOKEN

kubectl config --kubeconfig=$KUBECONFIG \
    set-context registry \
    --cluster=$CLUSTER_URL \
    --user=$SERVICE_ACCOUNT_NAME

kubectl config --kubeconfig=$KUBECONFIG \
    use-context registry
```

#### 4. Genereate the Base64 string
```
KUBECONFIG=./kubeconfig

cat ./kubeconfig | base64 --wrap=0
```


## Options

### Add Default Repositories

To add default repositories that will be setup every time the application is started, you can use the environment variable ```repositories``` following the approach below:

```
# Enviroment Variable: repositories
# Format for Public Repos:  name=url
# Format for Private Repos: name=username:password@url
# Example:

repositories=stable=https://kubernetes-charts.storage.googleapis.com,bitnami=https://charts.bitnami.com/bitnami

# or

repositories=myPrivateRepo=myUsername:myPassword@https://privateRepo.com,myPrivateRepo2=myUsername:myPassword@https://privateRepo2.com
```

