// Import Express and define the app as an Express instance.
'use strict'
import express from 'express';
const app = express();

// Import cors ("cross origin resource sharing").
import cors from 'cors';
app.use('/models', cors()); // set Access-Control-Allow-Origin header for api route

// Set the port being used to 3000.
app.set('port', process.env.PORT || 3000);
// Set the view engine to EJS.
app.set('view engine', 'ejs');
// Parse URL-encoded bodies. (Form information.)
app.use(express.urlencoded());



// Import path & fileURLToPath so that the root directory & file paths from the root directory
// can be easily defined. This is necessary(?) for returning non-EJS files. (Like the stylesheets.)
import path from 'path';
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Set location for static files.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //Used to parse JSON bodies



// Import routes.js. This file stores all of the routes (ways the app responds to client requests) in the app. 
import routes from './routes.js';
// Pass ‘app’ instance to the routes module.
const app_routes = routes(app); 
// Note that data.js is imported into routes & not index because it's only used with routes.



// Start the app and let the user know it has been started. 
app.listen(app.get('port'), () => {
    console.log('Express started!'); 
    console.log("Server open at http://localhost:3000.");
});