// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require
const express = require('express');
const env = require('dotenv');
const lessMiddleware = require('less-middleware');
const path = require('path');
// const getMinionsApi = require('./routes/api/getBazaarApiForge');
// const getProfileApi = require('./routes/api/getProfileApiForge');
const minionsView = require("./routes/views/minions.js");
const minionsCostView = require("./routes/views/minionsCost.js");
const forgeView = require("./routes/views/forge.js");
const auctionsView = require("./routes/views/auctions.js");
const indexView = require("./routes/views/index.js");
const apiTest = require('./routes/api/apiTest');

//constants
const app = express();
const port = process.env.PORT || 3000;

//to allow POST request 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROUTING
//views
app.get('/',indexView);
app.get('/events',(req,res)=>{res.render("events");});
//app.get('/minions',(req,res)=>{res.sendFile(path.join(__dirname, '/dist', 'minions.html'))});
app.get('/minionscost',minionsCostView);
app.get('/minionscost-beta',(req,res)=>{res.redirect("/minionscost")});
app.get('/minions',minionsView);
app.get('/forge',forgeView);
app.get('/new-forge',(req,res)=>{res.redirect("/forge")});
app.get('/auctions',auctionsView);
app.get('/abouts',(req,res)=>{res.render("abouts");});
app.get('/abouts/pastupdates',(req,res)=>{res.render("pastUpdates");});
app.get('/contact',(req,res)=>{res.render("contact");});
app.get('/contribute',(req,res)=>{res.render("contribute");});

app.get('/info/minions',(req,res)=>{res.render("infos/infoMinions");});
app.get('/info/forge',(req,res)=>{res.render("infos/infoForge");});
app.get('/info/minionscost',(req,res)=>{res.render("infos/infoMinionsCost")})
app.get('/info/api',(req,res)=>{res.render("infos/infoApi");});
app.get('/info/sourcecode',(req,res)=>{res.render("infos/infoSourceCode");});

//new public api
app.get('/api',apiTest);
app.get('/api/minions',(req,res)=>{
    req.api = true;
    minionsView(req,res);
});
app.get('/api/minionscost',(req,res)=>{
    req.api = true;
    minionsCostView(req,res);
});
app.get('/api/forge',(req,res)=>{
    req.api = true;
    forgeView(req,res);
});



//old api
// app.get('/api/get-minions-api',getMinionsApi);
// app.get('/api/get-profile-api/:name',getProfileApi);

//app.set, app.use
app.set("view engine","pug");
app.set('views','templates/views/');

//css, js
app.use(lessMiddleware('dist'));
app.use(express.static('dist'));

app.get("*",(req,res)=>{res.render("errors/404");});

//start
app.listen(port, () => console.log(`HyMinions listening at http://localhost:${port}`));