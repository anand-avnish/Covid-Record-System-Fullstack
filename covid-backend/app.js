const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');

const db = require('./config/database');

db.authenticate()
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log('Error: '+ err))

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('INDEX');
});

app.use('/patient', require('./routes/patientDb'));
app.use('/hospital', require('./routes/hospitalDb'));
app.use('/treatment', require('./routes/treatmentDb'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));