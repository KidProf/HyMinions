// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require
const express = require('express');
const env = require('dotenv');
const path = require('path');
const getMinionsApi = require('./routes/api/getMinionsApi');
const getProfileApi = require('./routes/api/getMinionsApi');

//constants
const app = express();
const port = process.env.PORT || 3000;

//ROUTING
//views
app.get('/',(req,res)=>{res.sendFile(path.join(__dirname, '/dist', 'index.html'))});
app.get('/events',(req,res)=>{res.sendFile(path.join(__dirname, '/dist', 'events.html'))});
app.get('/minions',(req,res)=>{res.sendFile(path.join(__dirname, '/dist', 'minions.html'))});

//api
app.get('/api/get-minions-api',getMinionsApi);
app.get('/api/get-profile-api/:name',getProfileApi);

//css, js
app.use(express.static('dist'));

//start
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))





// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

// keystone.init({
// 	'name': 'HyMinions',
// 	'brand': 'HyMinions',

// 	'less': 'public',
// 	'static': 'public',
// 	'favicon': 'public/favicon.ico',
// 	'views': 'templates/views',
// 	'view engine': 'pug',

// 	'auto update': true,
// 	'session': true,
// 	'auth': true,
// 	'user model': 'User',
// });

// // Setup common locals for your templates. The following are required for the
// // bundled templates and layouts. Any runtime locals (that should be set uniquely
// // for each request) should be added to ./routes/middleware.js
// keystone.set('locals', {
// 	_: require('lodash'),
// 	env: keystone.get('env'),
// 	utils: keystone.utils,
// 	editable: keystone.content.editable,
// });

// // Load your project's Routes
// express.set('routes', require('./routes'));


// // Configure the navigation bar in Keystone's Admin UI
// keystone.set('nav', {
// 	users: 'users',
// });

// // Start Keystone to connect to your database and initialise the web server



// keystone.start();
