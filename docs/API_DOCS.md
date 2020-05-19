# API Docs

## Commands

* [Install](#Install)
* [Get](#Get)

### Install

[Helm Docs](https://helm.sh/docs/helm/helm_install)

Path: ```/helm/install```

Method: ```POST```

Headers: 
* ```Content-Type: application/json```

Body Parameters:

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |--- |---
|releaseName   |string    |true     |```ingress``` |Release name of the chart to be installed.
|chart         |string    |true     |```stable/ingress-controller``` |Name of the chart to be installed.
|args          |string    |false    |```--set controller.replicaCount=2``` |Additional arguments to the helm install command

Example:

```curl -X POST 'http://localhost:80/helm/install' --header 'Content-Type: application/json' --data-raw '{ "releaseName": "ingress", "chart": "stable/nginx-ingress", "args": "--set controller.replicaCount=2" }'```


### Get

[Helm Docs](https://helm.sh/docs/helm/helm_get_all)

Path: ```/helm/get```

Method: ```GET```

Headers: 
* ```Content-Type: application/json```

Query Parameters:

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |--- |---
|subcommand    |string    |true     |```all``` |Subcommand of the helm get command. Options: ```all,hooks,manifest,notes,values```.
|releaseName   |string    |true     |```ingress``` |Release name of the chart to be get.
|args          |string    |false    |```--template "{ \"Release:\": \"{{.Release.Name}}\"}"``` |Additional arguments to the helm install command

Example:

```curl -X GET 'http://localhost:81/helm/get?subcommand=all&releaseName=ingress&args=--template%20%22{%20\%22Release:\%22:%20\%22{{.Release.Name}}\%22}%22'```


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