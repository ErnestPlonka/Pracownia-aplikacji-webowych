const express = require('express')
const path = require("path");
const app = express()
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "messages",
})
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected successfully");
})
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
    connection.query(`INSERT INTO messages(imie,nazwisko,email,tresc) VALUES ('${imie}','${nazwisko}','${email}','${tresc}')`,(error) => {
        if (error) throw error;
        console.log("Inserted successfully");
    })
    console.log("=== Otrzymano wiadomość kontaktową ===")
    console.log(`Imię: ${imie}`)
    console.log(`Nazwisko: ${nazwisko}`)
    console.log(`Email: ${email}`)
    console.log(`Treść: ${tresc}`)
    console.log("=====================================")

    res.redirect("/")
})
app.get('/api/contact-messages', (req, res) => {
    connection.query("SELECT * FROM messages", (error, result) => {
        if (error) throw error;
        res.json(result)
    })

})
app.get('/api/contact-messages/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM messages WHERE id = ${id}`
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if(result.length === 0){
            res.status(404).send('Not Found')
        }
        else{
            res.status(200).json(result)
        }
    })
})
app.listen(8080, () => {
    console.log('Server started on http://localhost:8080')
})
