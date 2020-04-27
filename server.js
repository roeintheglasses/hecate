const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = "./models/shortUrl";

mongoose.connect("URL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index");
});
app.post("/short", async(req, res) => {
    await ShortUrl.create({
        full: req.body.fullUrl,
    });
    res.redirect("/");
});
app.listen(port);