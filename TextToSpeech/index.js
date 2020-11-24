const path = require("path");
const express = require("express");
const gTTS = require("gtts");

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine","ejs")

app.get("/", (_req, res) => {
    res.render("index");
})

app.post("/", (req, res) => {
    const gtts = new gTTS(req.body.text, 'en');
    const filename = Date.now() + ".mp3";
    gtts.save(`./audio/${filename}`, function (err, _result) {
        if(err) 
            return;
        else 
            return res.redirect(`/audio/${filename}`);
    })
});

app.use("/audio", express.static(path.join(__dirname, "./audio")));

app.listen(5000, function () {
    console.log("Server is listening on Port 5000");
})