# Witchermancer

A full stack web application made for creating and storing character sheets for The Witcher RPG. Hosted at https://witchermancer.onrender.com/.

## Deploy

The `deploy` branch is set up to auto-deploy on Render. The dockerfile and the server setup are specifically created to be deployed on render and will require tweaking to work on a different hosting. 

The Vue app expects a single enviornment variable, `VUE_APP_LOCALIZATION_URL` which should contain the url to a Google Sheets document, containing localization, output in a CSV format. The .NET app requires two environment variables, `Google__ClientId` and `Google__ClientSecret`, both generated in Google dashboard and used for OAuth2.

## Running locally

It is recommended to run the application by building the front-end app and serving it from the server. 

To do so, first clone the repository. Then enter the `client` directory and run

```console
npm install
```

Then either export an environment variable, or create a `.env` file with the following content

```
VUE_APP_LOCALIZATION_URL=<link to your localization doc>
```

Then build the client app with

```console
npm run build
```

With the client app successfully built, add a `Google` section to your `appsettings.json`. In it, add `ClientId` and `ClientSecret` with values gathered from the Google dashboard.

Finally, run 

```console
dotnet run --launch-profile https
```

### Note

.NET 6 is specifically required to run, as in .NET 7 a bug was introduced which no longer allows the app to run correctly.

## License

The project is licensed under the MIT license. For full license text, see the `LICENSE` file.
