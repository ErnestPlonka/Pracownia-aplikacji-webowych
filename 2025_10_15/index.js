let http = require('http')
const {readFile} = require("fs/promises")
let url = require('url')
let fs = require('fs')
let PORT = 8080
let mime = require('mime-types')
let path = require('path')
http.createServer(async (req, res) => {
    const parsedurl = url.parse(req.url, true)
    const params = parsedurl.query
    switch (parsedurl.pathname) {
        case "/":
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'})
            res.write("Strona główna")
            break
        case "/json":
            res.writeHead(200,{'Content-Type': 'text/json; charset=utf-8'})
            const obj = { name: "John", age: 30, city: "New York" };
            const json = JSON.stringify(obj);
            res.write(json)
            break
        case "/html":
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write("<!DOCTYPE html>" +
                "<html lang='pl'>" +
                "<body>" +
                "<p>nerf miner</p>" +
                "</body>" +
                "</html>")
            break
        case "/html2":
            const file = await readFile('index.html','utf8')
            res.end(file)
            break
        case "/get_params":
            console.log(JSON.stringify(params, null,2))
            fs.writeFile(`params_${Date.now()}`,JSON.stringify(params, null,2), (err) => {
                if (err){
                    console.error(err)
                    return
                }
                console.log("Dane zostały [pmyślnie zapisane do pliku")
            })
            const Object = {'ok':'ok'}
            res.end(JSON.stringify(Object));
            break
        default:

            const filePath = path.join(__dirname, 'assets', parsedurl.pathname.slice(1));
            try{
                const file2 = await readFile(filePath,'utf8')
                res.writeHead(200, {'Content-Type': mime.contentType(filePath)})
                await fs.stat(filePath,(err,stats) => {throw new Error("File does not exist")})
                res.end(file2)
            }
            catch{
                res.writeHead(404, {'Content-Type': 'text/json; charset=utf-8'})
                res.end("404 Not Found " + filePath)
            }
    }
    res.end()
}).listen(PORT, () => {
    console.log(`Serwer dziala na http://localhost:${PORT}`)

})