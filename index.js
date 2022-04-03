const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes/pet')
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const port = 5000;

app.get('/', (req, res) => {
    res.json({ test: 'test' });
});

app.use('/', routes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
});