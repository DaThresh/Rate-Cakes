const express = require('express');
const app = express();
const mongoose = require('./config/mongoose');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public/dist/public'));

require('./config/routes')(app);

app.listen(8000, () => console.log('Listening on port 8000'));