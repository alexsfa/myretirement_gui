FROM node:20-alpine

WORKDIR /app

# We copy those files so Docker can cache npm install if they have not changed
COPY package.json ./
COPY package-lock.json ./

# Installs the dependencies listed on package.json
RUN npm install

COPY . .
