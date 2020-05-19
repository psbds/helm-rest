# API Docs

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