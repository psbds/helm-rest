FROM node:12 as build
 
# Building Application
WORKDIR /build
ENV NODE_ENV=development 
COPY package.json package.json
RUN npm install typescript -g
RUN npm install

COPY . .

RUN npm run-script compile

WORKDIR /services
RUN mkdir kubectl
RUN mkdir helm

# Downloading System Dependencies
RUN cd ~ \
    && mkdir Downloads

# Download kubectl v1.18.2
RUN cd ~/Downloads \
    && curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.18.2/bin/linux/amd64/kubectl --insecure \
    && mv ./kubectl /services/kubectl

# Install Download 3.1.0
RUN cd ~/Downloads \
    && curl -LO https://get.helm.sh/helm-v3.1.0-linux-amd64.tar.gz \
    && tar -zxvf helm-v3.1.0-linux-amd64.tar.gz \
    && mv linux-amd64/helm /services/helm

# ---
FROM node:12.16.3-alpine3.11

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /build/bin bin/.
COPY --from=build /build/package.json .
COPY --from=build /build/package-lock.json .
COPY --from=build /services/kubectl /usr/local/bin/
COPY --from=build /services/helm /usr/local/bin/

RUN npm install

ENTRYPOINT [ "npm" , "start"]