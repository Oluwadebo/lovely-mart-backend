const express = require("express");
const path = require('path');
const dotenv = require('dotenv')
const http = require("http");
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary')
const { Server } = require("socket.io");

const app = express();
dotenv.config();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['POST', 'PUT', 'GET']
    }
});

const { checker } = require("./middleware/middleware");
const { users, adduser } = require("./store");
const { sendmail } = require("./mailer");
const { adminregist, adminlogin, admin, file, adminfiles, delproduct } = require("./control/admincontroler");
const { display, login, regist, addtocart, goods, Viewproduct, getaddtocart, removeaddtocart } = require("./control/customercontroler");

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, }).then((res) => {
    console.log("connected successfuly")
}).catch(err => {
    console.log(err);
})

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.post("/adminsignup", adminregist)
app.post("/adminsignin", adminlogin)
app.get("/Admin", admin)
app.post("/adminfiles", adminfiles)
app.post("/admindel", delproduct)
app.post("/files", file)

app.get("/dashboard", display)
// app.post("/customersignup", regist)
// app.post("/customersignin", login)
app.get("/goods", goods)
app.post("/Viewproduct", Viewproduct)
// app.post("/getaddtocart", getaddtocart)
// app.post("/addtocart", addtocart)
// app.post("/removeaddtocart", removeaddtocart)

const port = process.env.PORT || 5010

app.listen(port, () => {
    // sendmail(["adewoleadekulemercy@gmail.com","felixadegboyega2019@gmail.com","bakareoluwatobi22@gmail.com"])
    console.log("Server started");
})