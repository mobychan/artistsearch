# last.fm Artist Search
Looks up artists using the last.fm API artist.search.

# Purpose
This repository was created to solve the following Coding Challenge:

```
Write a Node.js REST API application that handles the following:

Search for an artist by name based on the following endpoint [artist.search](https://www.last.fm/api/show/artist.search), return all the results for this artist.
Write the result to a user-supplied CSV filename.
The CSV file should include the following information (name, mbid, url, image_small, image)

⇒ If no results returned from the artist.search endpoint, retrieve random artist names from a JSON dictionary source file for example:

['artistName1', 'artistName2', 'artistName3']

Repeat as necessary until you have gathered a list of artists.

Though this is a small app, please pay attention to your application structure.
Host your code on github or bitbucket and include a README with instructions on how to install and run your application.
```

# Installation - Vue Frontend
## Running the Application
To run the project install the npm packages:
```
$ npm install
```

Then build and serve it using:
```
$ npm run build
$ npm install -g serve
$ serve -s dist
```

The application will be available on http://localhost:3000

# Installation - Express Backend
## Setting the API Key
Rename the '.env.default' file to '.env' and set the VITE_API_KEY value to the API Key you receive from [last.fm](https://www.last.fm/api/authentication).

## Running the Application
To run the project install the npm packages:
```
$ npm install
```

Then build and serve it using:
```
$ npm run build
$ npm run start
```

The API will be available on http://localhost:3001