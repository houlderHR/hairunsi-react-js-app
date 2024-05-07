# HAIRUN SI

## Technologies

![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## Project architecture

The project is divided into 2 main parts:

- back
- front

## Prerequisites

First, ensure you have the following installed:

1. _Node_ - Download and install node version **>20.9.0**: [NodeJS](https://nodejs.org/en/download).
2. _Git_ - Download and install latest version of [Git](https://git-scm.com/).
3. _Docker_ - Install [docker](https://docs.docker.com/engine/install/).
4. _PgAdmin_ - Download and install [pgadmin](https://www.pgadmin.org/download/).

After that, open your terminal to clone repository on gitlab

## Clone repository

```
$ git clone git@gitlab.com:digitallforyou/formation/hairun-si/hairunsi-react-js-app.git
```

## Running APP locally

### back

Switch into the `back` folder:

```
cd hairunsi-react-js-app/back
```

#### **Configuration**

```
Copy file .env.example inside .env
```

After that, build the docker container

```
docker compose  build
```

And to start postgresql container, launch

```
docker compose up -d
```

#### **Install dependencies**

You'll need to install some node modules defined on the package.json to run the node app

```
npm install
```

#### **Run the App**

To run app on development mode, launch this command

```
npm run dev
```

To run app on production mode:

- first, build the app by launching the following command

  ```
  npm run build
  ```

- after that, launch the app

  ```
  npm run start
  ```

This commande create database on your local PC and run the API

Now open your browser on: _http://localhost:8080/_

You'll have available the following `RESTful` services on swagger documentation on:
[http://localhost:8080/api-hairunsi-docs/](http://localhost:8080/api-hairunsi-docs/)

#### **Build the App**

```
npm run build
```

This will generate a `build` directory(JavaScript output files).

### front

Switch into the `front` folder:

```

cd hairunsi-react-js-app/front

```

#### **Install dependencies**

You'll need to install some node modules defined on the package.json to run the React app

```

npm install

```

#### **Run the App**

```
npm run start
```

This command will start the React development server

Now open your browser on: [http://localhost:5173](http://localhost:5173) to see the project

#### **Build the App**

```
npm run build
```

This will generate a `dist` directory.
