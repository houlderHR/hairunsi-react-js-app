# HAIRUN SI PROJECT API

A `node` server with a set of `RESTful` services using entirely `TypeScript` language.

## Technologies

<div>
  <img align="left" alt="node" style="margin-right: 10px; margin-top: 5px;" width="80px" height="50px" src="https://cdn4.iconfinder.com/data/icons/logos-3/454/nodejs-new-pantone-white-512.png" /> 
   <img alt="node" width="80px" style="margin-right: 5px;" height="30px" src="https://miro.medium.com/v2/resize:fit:679/0*vq-JSMynSHUPXx70" /> 
  <img alt="node" width="80px" style="margin-top: 15px;" height="30px" src="https://miro.medium.com/v2/resize:fit:1200/1*C8fBN7YOpw44gn5t8cIeWA.png" /> 
  <img alt="node" width="80px" style="margin-left: 10px;" height="30px" src="https://c8j9w8r3.rocketcdn.me/wp-content/uploads/2021/05/postgresql-database-logo-1.jpeg" /> 
</div>

## Running server locally

### Prerequisites

First, ensure you have the following installed:

1. _Node_ - Download and install node version **21.7.^**: [NodeJS](https://nodejs.org/en/download).
2. _Git_ - Download and install latest version of [Git](https://git-scm.com/).
3. _Docker_ - Install [docker](https://docs.docker.com/engine/install/).
4. _PgAdmin_ - Download and install [pgadmin](https://www.pgadmin.org/download/).

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

Now open your browser on: _http://localhost:PORT/_

You'll have available the following `RESTful` services:

```
GET http://localhost:PORT/role
GET http://localhost:PORT/role/:id
POST http://localhost:PORT/role
PUT http://localhost:PORT/role/:id
DELETE http://localhost:PORT/role/:id

GET http://localhost:PORT/department
GET http://localhost:PORT/department/:id
POST http://localhost:PORT/department
PUT http://localhost:PORT/department/:id
DELETE http://localhost:PORT/department/:id

GET http://localhost:PORT/user
GET http://localhost:PORT/user/:id
POST http://localhost:PORT/user
PUT http://localhost:PORT/user/:id
DELETE http://localhost:PORT/user/:id

GET http://localhost:PORT/persmission
GET http://localhost:PORT/persmission/:id
POST http://localhost:PORT/persmission
PUT http://localhost:PORT/persmission/:id
DELETE http://localhost:PORT/persmission/:id

GET http://localhost:PORT/file
GET http://localhost:PORT/file/:id
POST http://localhost:PORT/file
PUT http://localhost:PORT/file/:id
DELETE http://localhost:PORT/file/:id
```

### Build the App

`npm run build`

This will generate a `dist` directory(JavaScript output files).
