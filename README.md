# Helm Rest

[![Build Status ](https://img.shields.io/azure-devops/build/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/17/develop?label=build%3A%20develop)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)
[![Build Status ](https://img.shields.io/azure-devops/build/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/18?label=build%3A%20master)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)


[![Build Status ](https://img.shields.io/azure-devops/tests/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/17?label=tests%3A%20develop&passed_label=good&failed_label=bad&skipped_label=n%2Fa)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)
[![Build Status ](https://img.shields.io/azure-devops/tests/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/18?label=tests%3A%20master&passed_label=good&failed_label=bad&skipped_label=n%2Fa)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)

[![Build Status ](https://img.shields.io/azure-devops/coverage/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/17?label=coverage%3A%20develop)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)
[![Build Status ](https://img.shields.io/azure-devops/coverage/padasil/7756fbc8-a76f-45bb-bbca-63811b5a93a4/18?label=coverage%3A%20master)](https://dev.azure.com/padasil/helm-rest/_build?definitionId=17)

Web Application to enable to run helm commands using REST

* [Getting Started](./docs/GETTING_STARTED.md)
* [Contributing](./docs/CONTRIBUTING.md)
* [API Docs](./docs/API_DOCS.md)

## Examples

### Installing a Helm Chart
```
# Request
curl -X POST 'http://localhost:80/helm/install' --header 'Content-Type: application/json' --data-raw '{ "releaseName": "ingress", "chart": "stable/nginx-ingress", "args": "--set controller.replicaCount=2" }'

# Response
"NAME: ingress\nLAST DEPLOYED: Tue May 19 08:27:25 2020\nNAMESPACE: default\nSTATUS: deployed\nREVISION: 1\nTEST SUITE: None\nNOTES:\nThe nginx-ingress controller has been installed.\nIt may take a few minutes for the LoadBalancer IP to be available.\nYou can watch the status by running 'kubectl --namespace default get services -o wide -w ingress-nginx-ingress-controller'\n\nAn example Ingress that makes use of the controller:\n\n  apiVersion: extensions/v1beta1\n  kind: Ingress\n  metadata:\n    annotations:\n      kubernetes.io/ingress.class: nginx\n    name: example\n    namespace: foo\n  spec:\n    rules:\n      - host: www.example.com\n        http:\n          paths:\n            - backend:\n                serviceName: exampleService\n                servicePort: 80\n              path: /\n    # This section is only required if TLS is to be enabled for the Ingress\n    tls:\n        - hosts:\n            - www.example.com\n          secretName: example-tls\n\nIf TLS is enabled for the Ingress, a Secret containing the certificate and key must also be provided:\n\n  apiVersion: v1\n  kind: Secret\n  metadata:\n    name: example-tls\n    namespace: foo\n  data:\n    tls.crt: <base64 encoded cert>\n    tls.key: <base64 encoded key
```

### Listing Helm Charts
```
# Request
curl -X GET 'http://localhost:81/helm/list?args=-o%20json'

# Response
"[{\"name\":\"ingress\",\"namespace\":\"default\",\"revision\":\"1\",\"updated\":\"2020-05-19 08:27:25.9591898 +0000 UTC\",\"status\":\"deployed\",\"chart\":\"nginx-ingress-1.37.0\",\"app_version\":\"0.32.0\"}]"
```

