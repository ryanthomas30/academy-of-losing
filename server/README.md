# Academy of Losing Server
Backend for Academy of Losing.
## Setup & Installation
#### Install Dependencies
```bash
yarn install
```
#### Set Local Environment Variables
Create a new file in the root directory called `.env.development.local` and populate it with these keys and the values for your local `postgres` instance.
```sh
TYPEORM_HOST=<database_hostname> # e.g. localhost
TYPEORM_USERNAME=<database_username> 
TYPEORM_PASSWORD=<database_password>
TYPEORM_DATABASE=<database_name>
TYPEORM_PORT=<database_port> # e.g. 5432
TYPEORM_SYNCHRONIZE=<true/false> # true is recommended in development mode
```
#### Run In Development Mode
```bash
yarn run dev
```

🚀 Access GraphQL Playground at http://localhost:4000/graphql
