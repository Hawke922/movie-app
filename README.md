# Movie App
This is a simple React application that allows you to search for movies using the OMDB API, view their search results and details, and add or remove them from your favourites. Hosted live on [Netflify](https://magnificent-muffin-9a364c.netlify.app/).

## Features
- Search for movies using the OMDB API and display the search results with "infinite scrolling"
- View the details of a movie
- Add movies to favourites
- Save your favourites to local storage so they persist between sessions
- Preserve search bar value and scroll position using React Context
- Page navigation with React Router

## Prerequisites
Node.js, npm  
An OMDB API key. You can get one for free by registering at [omdbapi.com](https://www.omdbapi.com/apikey.aspx).

## Installation
1. Clone this repository  
2. Run `npm install` to install the required packages  
3. Create a `.env` file at the root of the project and add the following line, replacing `[YOUR_API_KEY]` with your own OMDB API key:
```
VITE_OMDB_API_KEY=[YOUR_API_KEY]
```
4. Run `npm run dev` to start the development server and view the application in your browser at [localhost:5173](http://localhost:5173/).

## Scripts
`npm run dev` : Starts a development server  
`npm run build` : Generates a set of static files for deployment  
`npm run preview` : Compiles and serves source code and assets from `dist` folder, and provides a live preview of the application  

## Deployment
The application can be deployed to a static hosting service such as Netlify or GitHub Pages. To deploy, run `npm run build` to create the production build, then upload the contents of the dist folder to your hosting service.
