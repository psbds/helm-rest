# API Docs

## Commands

* [Install](#Install)
* [Get](#Get)
* [List](#List)
* [Upgrade](#Upgrade)
* [Delete](#Delete)
* [Rollback](#Rollback)
* [Repo Add](#Repo-Add)
* [Repo Update](#Repo-Update)
* [Command](#Command)

## Options
* [Add Simple Authentication](#Add-Simple-Authentication)
* [Add Default Repositories](#Add-Default-Repositories)
### Install

[Helm Docs](https://helm.sh/docs/helm/helm_install)

**Path:** ```/helm/install```

**Method:** ```POST```

**Headers:**
* ```Content-Type: application/json```

**Body Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|releaseName   |string    |true     |```ingress``` |Release name of the chart to be installed.
|chart         |string    |true     |```stable/ingress-controller``` |Name of the chart to be installed.
|args          |string    |false    |```--set controller.replicaCount=2``` |Additional arguments to the helm install command

**Example:**

```curl -X POST 'http://localhost:80/helm/install' --header 'Content-Type: application/json' --data-raw '{ "releaseName": "ingress", "chart": "stable/nginx-ingress", "args": "--set controller.replicaCount=2" }'```


### Get

[Helm Docs](https://helm.sh/docs/helm/helm_get_all)

**Path:** ```/helm/get```

**Method:** ```GET```

**Headers:**
* ```Content-Type: application/json```

**Query Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|subcommand    |string    |true     |```all``` |Subcommand of the helm get command. Options: ```all,hooks,manifest,notes,values```.
|releaseName   |string    |true     |```ingress``` |Release name of the chart to be get.
|args          |string    |false    |```--template "{ \"Release:\": \"{{.Release.Name}}\"}"``` |Additional arguments to the helm get command

**Example:**

```curl -X GET 'http://localhost:80/helm/get?subcommand=all&releaseName=ingress&args=--template%20%22{%20\%22Release:\%22:%20\%22{{.Release.Name}}\%22}%22' --header 'Content-Type: application/json' ```

### List

[Helm Docs](https://helm.sh/docs/helm/helm_list)

**Path:** ```/helm/list```

**Method:** ```GET```

**Headers:**
* ```Content-Type: application/json```

**Query Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|args          |string    |false    |```-o json``` |Additional arguments to the helm list command

**Example:**

```curl -X GET 'http://localhost:80/helm/list?args=-o%20json' --header 'Content-Type: application/json'```

### Upgrade

[Helm Docs](https://helm.sh/docs/helm/helm_list)

**Path:** ```/helm/upgrade```

**Method:** ```PUT```

**Headers:**
* ```Content-Type: application/json```

**Body Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|releaseName   |string    |true     |```ingress``` |Release name of the chart to be upgraded.
|chart         |string    |true     |```stable/ingress-controller``` |Name of the chart to be upgraded.
|args          |string    |false    |```--set controller.replicaCount=3``` |Additional arguments to the helm upgrade command

**Example:**

```curl -X PUT 'http://localhost:80/helm/upgrade' --header 'Content-Type: application/json' --data-raw '{ "releaseName": "ingress", "chart": "stable/nginx-ingress", "args": "--set controller.replicaCount=3" }'```

### Delete

[Helm Docs](https://helm.sh/docs/helm/https://helm.sh/docs/helm/helm_uninstall/#helm)

**Path:** ```/helm/delete```

**Method:** ```GET```

**Headers:**
* ```Content-Type: application/json```

**Query Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|releaseName   |string    |true     |```ingress``` |Release name of the chart to be deleted.
|args          |string    |false    |```--dry-run``` |Additional arguments to the helm delete command

**Example:**

```curl -X DELETE 'http://localhost:80/helm/delete?releaseName=ingress&args=--dry-run' --header 'Content-Type: application/json' ```

### Rollback

[Helm Docs](https://helm.sh/docs/helm/helm_rollback)

**Path:** ```/helm/rollback```

**Method:** ```PUT```

**Headers:**
* ```Content-Type: application/json```

**Body Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|releaseName   |string    |true     |```ingress```|Release name of the chart to be rolled back.
|revision      |string    |true     |```0```      |Revision (version) number.
|args          |string    |false    |```--wait``` |Additional arguments to the helm rollback command

**Example:**

```curl -X PUT 'http://localhost:80/helm/rollback' --header 'Content-Type: application/json' --data-raw '{ "releaseName": "ingress", "revision": "0", "args": "--wait" }'```

### Repo Add

[Helm Docs](https://helm.sh/docs/helm/helm_repo_add)

**Path:** ```/helm/repo/add```

**Method:** ```POST```

**Headers:**
* ```Content-Type: application/json```

**Body Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|repoName      |string    |true     |```stable``` |Name of the repo to be added
|repoUrl       |string    |true     |```https://kubernetes-charts.storage.googleapis.com``` |Url of the repo to be added
|username      |string    |false    |```myUsername``` |Username of to login if it's a private repo.
|password      |string    |false    |```myPassword``` |Password of to login if it's a private repo.
|args          |string    |false    |```--debug``` |Additional arguments to the helm repo add command

**Example:**

```curl -X POST 'http://localhost:80/helm/repo/add' --header 'Content-Type: application/json' --data-raw '{ "repoName": "stable", "repoUrl": "https://kubernetes-charts.storage.googleapis.com", "username": "myUsername", "password": "myPassword", "args": "--debug"}'```

### Repo Update

[Helm Docs](https://helm.sh/docs/helm/helm_repo_update)

**Path:** ```/helm/repo/update```

**Method:** ```POST```

**Headers:**
* ```Content-Type: application/json```

**Body Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|args          |string    |false    |```--debug``` |Additional arguments to the helm repo update command

**Example:**

```curl -X POST 'http://localhost:80/helm/repo/update' --header 'Content-Type: application/json' --data-raw '{ "args": "--debug" }```

### Command

Command is the current Jack of all trades, to use commands that are not available as API yet.

**Path:** ```/helm/command```

**Method:** ```POST```

**Headers:**
* ```Content-Type: application/json```

**Body Parameters:**

|Parameter     |Type      |Required |Example |Description
|---           |---       |---      |---     |---
|command       |string    |true     |```version``` |Helm Command to be executed

**Example:**

```curl -X POST 'http://localhost:80/helm/repo/update' --header 'Content-Type: application/json' --data-raw '{ "args": "--debug" }```

## Options

### Add Simple Authentication

To add a simple authentication, you can set the environment variable ```authenticationKey```, in this way, only calls to the ```/helm``` path having the ```Authorization``` header will be executed.

Example:

```
# on the enviroment variables
authenticationKey="myVerySpecialKey"
``` 

```
# Calling the API
curl -X POST 'http://localhost:80/helm/repo/update' --header 'Content-Type: application/json' 
# Returns 401 Unauthorized

curl -X POST 'http://localhost:80/helm/repo/update' --header 'Content-Type: application/json' --header 'Authorization: myVerySpecialKey'
# Returns 200 OK
```
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