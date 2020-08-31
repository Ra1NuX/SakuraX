const express = require('express'); 
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
// const fs = require('fs');

const app = express();

//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname , '..', 'Client', 'Views'));
app.use(express.static(path.join(__dirname ,'..' , 'Client' , 'Public')));
app.engine('ejs', require('ejs').renderFile);

app.set('view engine', 'ejs');

//
app.use(fileUpload())



//routes.
app.use(require('./Routes/Index.js'));

require("./Tree.js");

//port listen.
app.listen(8080);