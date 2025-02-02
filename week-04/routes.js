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



    // API:
    // I felt kind of lost doing this sorry if I misunderstood the assignment... @__@ I had to start it really late too... 

    // Get all objects from butterfly database. 
    app.get('/api/butterflies', (req, res) => {
        Butterfly.find({}).lean()

        .then((butterflies) => {
            res.json(butterflies.map((butterfly) => {
                console.log("Returned: " + butterfly.title);
                return butterflyObjects(butterfly);
            }))
        })
        
        .catch(err => {
            console.log(err);
            res.status(500).send('Database Error occurred');
        });
    })

    // Find a butterfly by title.
    app.get('/api/butterflies/:title', (req,res) => {
        Butterfly.findOne({ title: req.params.title }).lean()

        .then((butterfly) => {
            console.log("Returned: " + butterfly.title);
            res.json(butterflyObjects(butterfly));
        })

        .catch(err => {
            console.log(err);
            res.status(500).send('Database Error occurred');
        });
    });

    // Delete a butterfly by title.
    app.get('/api/delete/:title', (req,res) => {
        Butterfly.findOneAndDelete({ title: req.params.title }).lean()

        .then(butterfly => {
            console.log("Deleted: " + butterfly.title);
            res.json(butterfly);
        })

        .catch(err => {
            console.log(err);
            res.status(500).send('Database Error occurred');
        });
    });

    // Reinsert a butterfly by title.
    app.get("/api/reinsert/:title", (req, res) => {

        // Find if the butterfly being inserted already exists.
        Butterfly.findOne({title: req.params.title}).lean()

        .then((butterfly) => {
            // If it doesn't already exist, add it. 
            if (butterfly === null)
            {
                return Butterfly.create(backup_butterflies.find(({ title }) => title === req.params.title))

                .then(butterfly => {
                console.log(butterfly.title + " added.")
                res.json(butterfly);
                })

                .catch(err => {
                console.log(err);
                res.status(500).send('Database Error occurred');
                });
            }
            else
            {
                res.json({"Error": "This object is already in the database!"});
            }
        })

    })

    const backup_butterflies =
    [
        {"title":"Argynnis hyperbius","alt":"A butterfly with round wings covered with small spots.","src":"img/argynnis-hyperbius.gif","model_src":"https://sketchfab.com/3d-models/indian-fritillary-a-hyperbius-d068fb093aab4c35bed03ebdcc1c3da3","model":"fffish.asia"},
        {"title":"Pieris melete","alt":"A butterfly with round wings covered in a vein-like pattern.","src":"img/pieris-melete.gif","model_src":"https://sketchfab.com/3d-models/gray-veined-white-butterfly-0e0fc924cdf3418a95caabf8105f9751","model":"fffish.asia"},
        {"title":"Polygonia c‑album","alt":"A butterfly with jagged wings covered in stripy spots.","src":"img/polygonia-c-album.gif","model_src":"https://sketchfab.com/3d-models/comma-polygonia-c-album-8a404d37da044913b651bdc4bba552df","model":"fffish.asia"},
        {"title":"Papilio xuthus","alt":"A butterfly with swallowtail wings covered in striking stripes.","src":"img/papilio-xuthus.gif","model_src":"https://sketchfab.com/3d-models/asian-swallowtail-papilio-xuthus-4e7170d4d13d4eeebd53fadfcec1cee6","model":"fffish.asia"},
        {"title":"Junonia almana","alt":"A butterfly with jagged wings and large eyespots on each wing.","src":"img/junonia-almana.gif","model_src":"https://sketchfab.com/3d-models/peacock-pansy-junonia-almana-2d198037cb4641a5ae3b0f9bda859d85","model":"fffish.asia"}
    ]

    // Function to clean up the butterfly DB API results. They don't really need to be cleaned but
    // I like the way they're rearranged here & it removes the _id attribute which isn't needed here. 
    function butterflyObjects(butterfly)
    {
        return { 
            title: butterfly.title,
            alt: butterfly.alt,
            src: butterfly.src,
            model_src: butterfly.model_src,
            model: butterfly.model
        }
    }

    // :API



    // If the user is requesting a page that doesn't exist, show the HTML page "404.html".
    app.use((req, res) => {
        res.status(404);
        res.render('404');
    });
};
