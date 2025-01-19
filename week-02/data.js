// An array containing five illustration objects.
let butterflies = 
[
{src : "img/argynnis-hyperbius.gif", alt : "A one-bit (black and red) dithered render of an Argynnis hyperbius butterfly.", title : "Argynnis hyperbius", model : "fffish.asia", model_src : "https://sketchfab.com/3d-models/indian-fritillary-a-hyperbius-d068fb093aab4c35bed03ebdcc1c3da3"},
{src : "img/pieris-melete.gif", alt : "A one bit (black and red) dithered render of a Pieris melete butterfly.", title : "Pieris melete", model : "fffish.asia", model_src : "https://sketchfab.com/3d-models/gray-veined-white-butterfly-0e0fc924cdf3418a95caabf8105f9751"},
{src : "img/polygonia-c-album.gif", alt : "A one bit (black and red) dithered render of a Polygonia c‑album butterfly.", title : "Polygonia c‑album", model : "fffish.asia", model_src : "https://sketchfab.com/3d-models/comma-polygonia-c-album-8a404d37da044913b651bdc4bba552df"},
{src : "img/papilio-xuthus.gif", alt : "A one bit (black and red) dithered render of a Papilio xuthus butterfly.", title : "Papilio xuthus", model : "fffish.asia", model_src : "https://sketchfab.com/3d-models/asian-swallowtail-papilio-xuthus-4e7170d4d13d4eeebd53fadfcec1cee6 "},
{src : "img/junonia-almana.gif", alt : "A one bit (black and red) dithered render of a Junonia almana butterfly.", title : "Junonia almana", model : "fffish.asia", model_src : "https://sketchfab.com/3d-models/peacock-pansy-junonia-almana-2d198037cb4641a5ae3b0f9bda859d85 "},
];

// A function that returns the entirety of a selected array.
const getAll = (selected_array) => 
{
    return selected_array;
};

// A functiom that returns an object from an array with a matching value inside of it. 
const getItem = (selected_array, value) => 
{
    let item = selected_array.find((obj) => obj.title === value);
    return item;
};



// Export the illustration array and two new functions to any module importing this one.
export default {
    butterflies,
    getAll,
    getItem
};
