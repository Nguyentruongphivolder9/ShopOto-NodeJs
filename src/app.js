const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = 3005;

const routers = require('./routers');
const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.use(
    session({
        secret: 'Group3-HK3',
        resave: false,
        saveUninitialized: true,
    }),
);

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.message = req.session.message;
    res.locals.cartItems = req.session.cartItems;
    res.locals.checkoutOrder = req.session.checkoutOrder;
    delete req.session.message;
    delete req.session.errorMessage;
    next();
})

routers(app);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
