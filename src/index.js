require('./models/user');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 
'mongodb+srv://admin:Rhenj567@cluster0.bbo79.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    // useNewUrlParser: true,
    // useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb instance');
});

mongoose.connection.on('error', (err) => {
    console.error('error connected to mongodb instance:', err);
})

app.get('/', requireAuth, (req,res) => {
    // console.log(req.user.email);
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});