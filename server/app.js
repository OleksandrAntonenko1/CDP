const express = require('express');
const path = require('path');
const User = require('./User');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    databaseName: 'connect_mongodb_session_test',
    collection: 'mySessions'
});

// Catch errors
store.on('error', function(error) {
    console.log(error);
});

app.use(session({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.post('/register', (req, res) => {
    const {
        body: {
            email,
            username,
            password,
        }
    } = req;
    if (email && username && password) {
        User.create({ email, username, password})
            .then((user) => {res.send(user);})
            .catch(
                (err) => {
                    res
                        .status(500)
                        .send(err.message);
                }
            );
    } else {
        res.sendStatus(404);
    }
});

app.post('/login', (req, res) => {
    const {
        body: {
            email,
            password,
        }
    } = req;

    if (email && password) {
        User.authenticate({email, password}, (error, user) => {
            if(error){
                res
                    .status(500)
                    .send(error.message);
            } else {
                res.send(user);
            }
        })
    } else {
        res.sendStatus(404);
    }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
