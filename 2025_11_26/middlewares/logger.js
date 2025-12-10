const { getDb } = require("../mongo")

async function requestLogger(req, res, next) {
    try {
        const log = {
            method: req.method,
            url: req.originalUrl,
            time: new Date(),
            ip: req.ip,
        }

        const db = getDb()
        await db.collection("accessLogs").insertOne(log)

    } catch (err) {
        console.error("Błąd w requestLogger:", err)
    }

    next()
}

module.exports = requestLogger
