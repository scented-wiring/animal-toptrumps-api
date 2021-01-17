# Animal Top Trumps API

## Instructions

To run the API:

⋅⋅\*Clone this repo

⋅⋅\*Create/run a [docker](https://www.docker.com/) container using the command:

⋅⋅⋅`docker run -d -p 3307:3306 --name animal_top_trumps_mysql -e password=password mysql`
⋅⋅⋅(You may set your own password if you wish)

⋅⋅\*Create a .env file in the root of the project folder with the following content:

⋅⋅⋅DB_PASSWORD=password
⋅⋅⋅DB_NAME=animal_top_trumps_mysql
⋅⋅⋅DB_USER=root
⋅⋅⋅DB_HOST=localhost
⋅⋅⋅DB_PORT=3307

⋅⋅\*install project dependencies with the command:

⋅⋅⋅`npm i express mysql2 sequelize`

⋅⋅\*run npm start

## Testing

To run tests:

⋅⋅\*Create a .env.test file in the root of the project folder with the following content:

⋅⋅⋅DB_PASSWORD=password
⋅⋅⋅DB_NAME=animal_top_trumps_test
⋅⋅⋅DB_USER=root
⋅⋅⋅DB_HOST=localhost
⋅⋅⋅DB_PORT=3307

⋅⋅\*install dev dependencies with the command:

⋅⋅⋅`npm i —-save-dev chai dotenv mocha nodemon supertest`

⋅⋅\*run npm t
