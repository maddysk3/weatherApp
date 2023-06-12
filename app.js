const express = require("express");
const app = express()
const https = require("https");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")

})

app.post('/', function (req, res) {
    const cityName = req.body.cityName;
    const url = "https://api.weatherapi.com/v1/current.json?key=d9974177c8b64537b05182348231206&q=" + cityName + "&aqi=yes"
    https.get(url, function (response) {
        response.on("data", function (data) {
            const wetherData = JSON.parse(data)
            const icon = wetherData.current.condition.icon;
            const iconUrl = "https:" + icon;
            const tempInCel = wetherData.current.temp_c;
            const weatherDescription = wetherData.current.condition.text;
            res.write("<h1>The Temperatur in " + cityName + " is " + tempInCel + " Degree Celcius</h1>")
            res.write("<h1>The Wether " + weatherDescription + " in " + cityName + " Today</h1>")
            res.write("<img src=" + iconUrl + " alt='weatherDescription'></img>")
            res.send()
            //res.send("The Wether " + weatherDescription + "in London Today")


        })
    })
})

app.listen(3000, function () {
    console.log("Server running on port 3000")
});

