import data from "./data.js";

// Routes using res.render are using EJS, and expect files under the "views" folder with a ".ejs" extension.
export default (app) => {
    // On http://localhost:3000/, show the HTML page "home.html".
    app.get('/', (req, res) => {
        res.render('index', {butterflies: data.butterflies});
    });

    // On http://localhost:3000/detail?___ pages, first use the URL after the ? to determine which illustration object to show, then
    // show the page detail.html with that illustration object's data.
    app.get('/detail', (req, res) => {

        let result = data.getItem(data.butterflies, req.query.title);
        res.render('detail', {result: result});
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
