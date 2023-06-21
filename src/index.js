// imports 
const express = require("express")
const jsonDb = require("simple-json-db")
// file imports
const config = require("./config")
const path = require("path")
const fs  = require("fs")
const morgan = require("morgan")
const ejs = require("ejs")
const db = new jsonDb(config.dbPath)
const app = express()
const renderContent = (filePath, ops) => {
    let text = fs.readFileSync(path.join(__dirname, 'views', filePath)).toString()

    return ejs.render(text, ops)
}
// console.log(renderContent("layout.html", { renderContent, title: "test" }))
app.set("views", path.join(__dirname, "views"))
app.use(morgan('dev'))
app.engine("html", (filePath, ops = { title: null }, cb) => {
    // let content = fs.readFileSync(filePath).toString();
    // const layout = fs.readFileSync(path.join(__dirname, "views", "layout.html"));
    const acContent = ejs.render(fs.readFileSync(filePath).toString(), ops)
    let content =  renderContent("layout.html", { renderContent, ...ops, content: acContent })
    console.debug("render ", filePath)
    cb(null, content)
})
app.set("view engine", "html")
app.get("/", (req,res) => {
    res.render('index.html', { title: "test" })
})
app.post("/request", (req,res) => {
    let requests = db.get("requests") || 0
    db.set("requests", requests++)
    res.status(201).end()
})
app.listen(config.port, () => {
    console.log("Listening on ::3000")
})