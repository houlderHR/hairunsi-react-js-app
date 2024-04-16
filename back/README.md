# HAIRUN SI PROJECT API

A `node` server with a set of `RESTful` services using entirely `TypeScript` language.

## Technologies

1. NodeJs
2. TypeScript
3. PostGres

## Running server locally

### Prerequisites

First, ensure you have the following installed:

1. _Node_ - Download and install node version **21.7.^**: [NodeJS](https://nodejs.org/en/download).
2. _Git_ - Download and install latest version of [Git](https://git-scm.com/).
3. _Docker_ - Install [docker](https://docs.docker.com/engine/install/).

After that, open your terminal to clone repository on gitlab

### Clone repository

```
$ git clone git@gitlab.com:digitallforyou/formation/hairun-si/hairunsi-react-js-app.git
$ cd hairunsi-react-js-app/back
```

### Environment configuration

Create file `.env` on the back folder and make your configuration like that

```
PORT= <port api>
DATABASE_HOST= <Adresse of the database>
DATABASE_PORT= <Database port >
DATABASE_USERNAME= <Username>
DATABASE_PASSWORD= <Password>
DATABASE_NAME= <Database name>
```

### Install dependencies

You'll need to install some node modules defined on the package.json to run the API
`npm install`

### Run the App

`npm run start`

This commande create database on your local PC and run the API

Now open your browser on: _http://localhost:<PORT>/_

### Build the App

`npm run build`

This will generate a `dist` directory(JavaScript output files).
