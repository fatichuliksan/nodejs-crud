const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./db');
const productRoute = require('./routes/product.route');


mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }
);


let route = express.Router();
route.get("/", function (req, res) {
    return res.json('index');
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(route);
app.use('/products', productRoute);
let port = process.env.PORT || 4000;

const server = app.listen(4000, function () {
    console.log('Listening on port ' + port);
});