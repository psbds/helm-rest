#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

# To fully customize the contents of this image, use the following Dockerfile instead:
# https://github.com/microsoft/vscode-dev-containers/tree/v0.112.0/containers/typescript-node-12/.devcontainer/Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-12

RUN cd ~ \
    && mkdir Downloads

# Install kubectl v1.18.2
RUN cd ~/Downloads \
    && curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.18.2/bin/linux/amd64/kubectl --insecure \
    && chmod +x ./kubectl \
    && sudo mv ./kubectl /usr/local/bin/kubectl

# Install Helm 3.1.0
RUN cd ~/Downloads \
    && curl -LO https://get.helm.sh/helm-v3.1.0-linux-amd64.tar.gz \
    && tar -zxvf helm-v3.1.0-linux-amd64.tar.gz \
    && mv linux-amd64/helm /usr/local/bin/helm

RUN rm -rf ~/Downloads