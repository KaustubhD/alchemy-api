# Weather and news API

## Specs
1. NestJS 8
2. Sqlite
3. Passport
4. OpenAPI
5. Axios
6. Jest

## Installation

```bash
$ npm install
```


## Env file

1. Create a `.env` file inside the project
2. Add the following values to the file
```
NEWS_API_KEY=<NEWS-API-KEY>
WEATHER_API_KEY=<WEATHER-API-KEY>
HEADLINES_URL=https://newsapi.org/v2/top-headlines/
WEATHER_FORECAST_URL=http://api.openweathermap.org/data/2.5/forecast
JWT_SECRET=secret-key
COUNTRY=in
PORT=3001
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
