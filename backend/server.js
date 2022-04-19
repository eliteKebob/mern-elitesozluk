const path = require("path")
const express = require("express")

const dotenv = require("dotenv").config()

const connectDB = require("./config/db")
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/userRoutes.js"))
app.use("/api/posts", require("./routes/postRoutes.js"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  )
} else {
  app.get("/", (req, res) => res.send("Sunucu çalışır durumda..."))
}

app.listen(port, () => console.log(`Server running on port ${port}`))
