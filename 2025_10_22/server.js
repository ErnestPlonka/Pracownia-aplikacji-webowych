const express = require('express');
const app = express();
let fs = require('fs')
const path = require("path");
const {readFile} = require("fs/promises");
app.get('/', (req, res) => {
    res.send('Welcome');
})
app.get("/json", (req, res) => {
    res.json({hello: "world"});
})
app.get("/html", (req, res) => {
    res.send("<!DOCTYPE html>" +
        "<html lang='pl'>" +
        "<body>" +
        "<p>nerf miner</p>" +
        "</body>" +
        "</html>")
})
app.get("/html2", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get("/params", (req, res) => {
    fs.writeFile(`params_${Date.now()}`,JSON.stringify(req.query, null,2), (err) => {
        if (err){
            console.error(err)
            return
        }
        console.log("Dane zostały pomyślnie zapisane do pliku")
    })
    res.send("Dane zapisane do pliku")
})
app.get("*", (req, res) => {
    const filePath = path.join(__dirname, 'assets', req.path.slice(1));
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send("Plik nie znaleziony");
        } else {
            res.sendFile(filePath);
    }
    });
});

app.listen(8080, () => {
    console.log('Server started on http://localhost:8080');

})