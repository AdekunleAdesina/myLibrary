if(process.env.NODE_ENV !=="production"){
    require("dotenv").config()
    console.log(process.env.DATABASE_URL)
}

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const expressLayout = require("express-ejs-layouts")
const indexRouter = require("./routes/index")

app.set("view engine", "ejs")
app.set("views", __dirname+ "/views")
app.set("layout", "layouts/layout")

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true
})
const db = mongoose.connection
db.on("error" ,(error)=>{console.error(error)})
db.once("open", ()=>{console.log("connected to mongoose")})

app.use(express.static("public"))
app.use(expressLayout)
app.use(express.urlencoded({extended:true}))
app.use("/", indexRouter)



app.listen(process.env.PORT || 3000)