require("dotenv").config()
const express = require("express")
const app = express()

app.use(express.json())

app.use("/post", require("./routers/post"))
app.use("/comment", require("./routers/comment"))
app.use("/category", require("./routers/category"))

app.listen(8080, () => console.log(`Server running on port 8080`))

