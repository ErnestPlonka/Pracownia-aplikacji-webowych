const express = require('express')
const path = require("path");
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get("/o-nas", (req, res) => {
    res.sendFile(path.join(__dirname, 'o-nas.html'))
})
app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'oferta.html'))
})
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'kontakt.html'))
})
app.post('/submited', (req, res) => {
    const { imie, nazwisko, email, tresc } = req.body

    console.log("=== Otrzymano wiadomość kontaktową ===")
    console.log(`Imię: ${imie}`)
    console.log(`Nazwisko: ${nazwisko}`)
    console.log(`Email: ${email}`)
    console.log(`Treść: ${tresc}`)
    console.log("=====================================")
    res.redirect("/")
})
app.listen(8080, () => {
    console.log('Server started on http://localhost:8080')
})
