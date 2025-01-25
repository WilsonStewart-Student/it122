import mongoose from 'mongoose';
const { Schema } = mongoose;



// Connect to the database via connection string & the name of the database.
import connection_string from '../private/connection-string.js';

mongoose.connect(connection_string, {
    dbName: 'scc_projects'
});



// Let the user know when the connection has been made.
mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});



// Define the data model as JSON key/value pairs.
const butterfly_schema = new Schema({
src: String,
alt: String,
title: { type: String, required: true },
model: String,
model_src: String },
{ collection : 'it122_butterflies' });



export const Butterfly = mongoose.model('Butterfly', butterfly_schema);