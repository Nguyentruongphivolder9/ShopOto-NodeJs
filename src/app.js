const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require("path");
const app = express();
const PORT = 3005;

const routers = require('./routers')
const db = require('./config/db');
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources", "views"));

app.use(session({
    secret:"Group3-HK3",
    resave:false,
    saveUninitialized:true,
}))

routers(app);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})