const express = require("express");
const app = express()
const port = process.env.PORT || 5500;
let alert = require("alert");

require("dotenv").config();
const path = require("path");

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))

const nodemailer = require("nodemailer");
const { triggerAsyncId } = require("async_hooks");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "terra.green.campaign@gmail.com",
        pass: "hpqcaflbvxjnbouk"
        
    }
})

// transporter.verify(({error, success})=> {
//     if(error){
//         console.log(error);
//     } else {
//         console.log("Ready for messages");
//         console.log(success);
//     }
// });

app.post("/sendmail", (req, res) => {
    const to = req.body.to;
    const mailOptions = {
        from: "terra.green.campaign@gmail.com",
        to: to,
        subject: "Pyar mohabbat dhoka hai lekin",
        html: `<br> We found love in a hopeless place (i.e, yeh bakwas college) <br> <br> <img src = "cid:unique@kreata.ee"/>`,
        attachments: [{
                filename: 'POSTER.png',
                path: 'public/images/POSTER.png',
                cid: 'unique@kreata.ee',
              }]
    }

    transporter
        .sendMail(mailOptions)
        .then(() => alert("Email successfully sent!"))
        .catch((error) => alert("Failed to send email."))
        // .then(() => {
        //     res.json({
        //         status: "SUCCESS",
        //         message: "Message sent successfully"
        //     })
        // })
        // .catch((error) => {
        //     console.log(error);
        //     res.json({status: "FAILED", message: "Error occurred!"});
        // })
 })


 app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, ".public/mainpage.html"));
 })

 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
 })