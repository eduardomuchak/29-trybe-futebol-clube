# Welcome to Trybe Futebol Clube project!

The project is an informative website about soccer matches and rankings. In this project, the dockerized backend was developed with NodeJs, Typescript, Programming Object Oriented (OOP), SOLID principles, and Data modeling was also performed using Sequelize. Tests were also developed integration to ensure the operation of the application.

The project is composed of 4 essential entities for its structure:

**Database:**

- It will be a MySQL docker container already configured in docker-compose through a service defined as `db`.
- Has the role of providing data to the _backend_ service.
- During the execution of the tests it will always be accessed by `sequelize` and via port `3002` of `localhost`;

**Backend:**

- It must run on port `3001` because the front-end makes requests to it on that port by default;
- Your application must be started from the `app/backend/src/server.ts` file;
- Ensure that `express` is run and the application listens on the port coming from the environment variables;

**Frontend:**

- The front communicates with the backend service via the URL `http://localhost:3001` through the endpoints that you must build in the requirements.

**Docker:**

- `docker-compose` is responsible for joining all containerized services (backend, frontend, and db) and uploading the complete project with the command `npm run compose:up` or `npm run compose:up:dev`;

## How to install the application:

To download the code:

```
git clone git@github.com:eduardomuchak/29-trybe-futebol-clube.git
```

Enter the project root folder:

```
cd 29-trybe-futebol-clube
```

#

## Running the aplication Locally VS Docker (recommended: Docker):

## Locally:

### Requirements:

- NodeJs Version: >=16.0.0

### Steps:

Rename the .env.example file to only .env and set the enviroment variables:

```
JWT_SECRET=jwt_secret
APP_PORT=8080
DB_USER=root
DB_PASS=123456
DB_HOST=localhost
DB_PORT=3002
```

Install the dependencies:

```
  npm install
```

#

## Running with Docker:

### Requirements:

- Docker-Compose Version: >=1.29

### Steps:

Run all the containers with this command:

```bash
  npm run compose:up:dev
```

Run the following code to attach a container:

```bash
  docker exec -it app_backend bash
```

Rename the .env.example file to only .env and set the enviroment variables:

```
JWT_SECRET=jwt_secret
APP_PORT=8080
DB_USER=root
DB_PASS=123456
DB_HOST=localhost
DB_PORT=3002
```

Install the dependencies (inside a container):

```
  npm install
```
