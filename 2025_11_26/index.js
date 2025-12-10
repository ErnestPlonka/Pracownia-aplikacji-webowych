require("dotenv").config()
const express = require("express")
const app = express()

const { connectMongo } = require("./mongo")
const requestLogger = require("./middlewares/logger")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())

app.use(requestLogger)

app.use("/post", require("./routers/post"))
app.use("/comment", require("./routers/comment"))
app.use("/category", require("./routers/category"))

app.use(errorHandler)

const PORT = process.env.PORT || 8080

async function start() {
    await connectMongo()
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

start()
