// This is 99% just my work from last quarter but I did fix the 'path' variable to use ES6's appropriate 'const' keyword.
// I also altered my CSS to be WAY more simplistic so it'll be easier to update since this will be built on further.

// Import necessary modules.
import http from 'http';
import fs from 'fs';

console.log("Starting server at http://localhost:3000.")

// Start a server on port 3000. (http://localhost:3000)
http.createServer((req, res) => {

    // Get the URL being requested by the user.
    const path = req.url.toLowerCase(); 

    switch(path) {
        // On http://localhost:3000/, show the HTML page "home.html".
        case '/':
            fs.readFile("index.html", (err, data) => {
                if (err) return console.error(err);
                
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
            break;
        // On http://localhost:3000/about, show the HTML page "about.html".
        case '/about':
            fs.readFile("about.html", (err, data) => {
                if (err) return console.error(err);
                
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
            break;
        // Load the CSS whenever it is requested.
        case '/styles.css':
            fs.readFile("styles.css", (err, data) => {
                if (err) return console.error(err);
                
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(data.toString());
            });
            break;
        // If the user is requesting a page that doesn't exist, show the HTML page "404.html".
        default:
            fs.readFile("404.html", (err, data) => {
                if (err) return console.error(err);
                
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data.toString());
            });
            break;
        }

}).listen(process.env.PORT || 3000);