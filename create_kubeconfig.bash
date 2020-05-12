SERVICE_ACCOUNT_NAME=$1
SERVICE_ACCOUNT_NAMESPACE=$2

echo "Creating Service Acount $SERVICE_ACCOUNT_NAME at namespace $SERVICE_ACCOUNT_NAMESPACE"

# Create a Service Account name `helm-rest` in the default namespaces.
kubectl create serviceaccount $SERVICE_ACCOUNT_NAME -n $SERVICE_ACCOUNT_NAMESPACE

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
  name: $SERVICE_ACCOUNT_NAME
  namespace: $SERVICE_ACCOUNT_NAMESPACE
EOF

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

# Genereate the Base64 string
cat ./kubeconfig | base64 --wrap=0