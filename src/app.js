const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("../models/shortUrl");
const path = require('path')

const app = express();
const port = process.env.PORT;
const viewsPath = path.join(__dirname, '../views')
const publicDirectoryPath = path.join(__dirname, '../public')


const dbUrl = process.env.DB_URL;


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.set("view engine", "ejs");
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

app.use(express.urlencoded({
    extended: false
}));

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render("index", {
        shortUrls
    });
});

app.post("/short", async (req, res) => {
    await ShortUrl.create({
        full: req.body.fullUrl,
    });
    res.redirect("/");
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({
        short: req.params.shortUrl
    });
    if (shortUrl == null)
        return res.send.status(404);

    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})

app.listen(port, () => {
    console.log("App running on port " + port);
});