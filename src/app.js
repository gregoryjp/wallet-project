require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('../src/config/mongo');
const app = express();

const routes = require('./routes');
const { handleHttpError } = require('./utils/handleError');

app.use(cors());
app.use(express.json())
app.use(express.static('storage'));
const port = process.env.PORT || 3000;

// localhost/api/loquevenga
app.use('/api', routes);

app.use(handleHttpError)


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})


dbConnect();
