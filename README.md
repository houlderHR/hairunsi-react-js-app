# HAIRUN SI FRONT

## Technologies Front

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Running server locally

### Prerequisites

First, ensure you have the following installed:

1. Node - Download and install node version **>20.9.0**.
2. Git - Download and install Git.

After that, open your terminal to clone repository on gitlab

### Clone repository

```
git clone git@gitlab.com:digitallforyou/formation/hairun-si/hairunsi-react-js-app.git
cd hairunsi-react-js-app/front
```

### Install dependencies

You'll need to install some node modules defined on the package.json to run the React app

```
npm install
```

### Run the App

```
npm run dev
```

This command will start the React development server

Now open your browser on: [http://localhost:5173](http://localhost:5173) to see the project

# HAIRUN SI API

A `node` server with a set of `RESTful` services using entirely `TypeScript` language.

## Technologies

![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## Running server locally

### Prerequisites

First, ensure you have the following installed:

1. _Node_ - Download and install node version **>20.9.0**: [NodeJS](https://nodejs.org/en/download).
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
