import { Butterfly } from "./models/butterfly.js";

// Routes using res.render are using EJS, and expect files under the "views" folder with a ".ejs" extension.
export default (app) => {

    // On http://localhost:3000/, show the HTML page "home.html" with each butterfly object from the database.
    app.get('/', (req, res) => {

        Butterfly.find({}).lean()
        .then((butterflies) => {
            res.render('index', { butterflies })
        })

        .catch(err => console.log(err));
    });

    // On http://localhost:3000/detail?___ pages, first use the URL after the ? to determine which butterfly object to show, then
    // show the page detail.html with that butterfly object's data.
    app.get('/detail', (req, res) => {

        Butterfly.findOne({ title: req.query.title }).lean()
        .then((butterfly) => {
            res.render('detail', {result: butterfly} );
        })

        .catch(err => console.log(err));
    });
    
    // On http://localhost:3000/about, show the HTML page "about.html".
    app.get('/about', (req, res) => {
        res.render('about');
    });

    // If the user is requesting a page that doesn't exist, show the HTML page "404.html".
    app.use((req, res) => {
        res.status(404);
        res.render('404');
    });
};
