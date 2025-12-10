const { getDb } = require("../mongo")

async function errorHandler(err, req, res, next) {
    console.error("Middleware error:", err)
    try {
        const log = {
            message: err.message,
            stack: err.stack,
            time: new Date(),
            method: req.method,
            url: req.originalUrl,
        }
        const db = getDb()
        await db.collection("errorLogs").insertOne(log)
    } catch (dbErr) {
        console.error("Błąd zapisu w errorHandler:", dbErr)
    }
    res.status(500).json({ error: "Wewnętrzny błąd serwera" })
}

module.exports = errorHandler
