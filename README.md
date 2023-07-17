# EventGPT

EventGPT is a intelligent event recommendation system.

_For a link to the live site, click here: [EventGPT](https://eventgpt-6bd7d46eb8b3.herokuapp.com/)._

## Development

To start the dev server:
1. Pull the code from `main`
2. Open a terminal and cd into app/
3. Run `npm install`
4. Create a .env file inside the app/ directory according to the .env.example
5. Create a Postgres database user with `psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"
6. Create the database with `npx dotenv sequelize db:create`
7. Migrate the database with `npx dotenv sequelize db:migrate`
8. Run the seed data with `npx dotenv sequelize db:seed:all`
9. Run `npm start` to start the express server
10. In another terminal window, cd into client/ and run `npm install`
11. Run `npm start` to start the React app
<br />

*Useful Heroku Commands*
- `git push heroku main`
- `heroku run npm run sequelize db:migrate`
