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
        subject: "Invitation to TerraGreen Campaign",
        html: `<br> We are a community of people committed to improving the world that we live in. We aim to spread awareness about the various climate change phenomena and their causes, and encourage the public to take steps like recycling, minimise wastage and dedicate their time for a good cause by participating in environmental campaigns. To get notified about future campaigns, follow us on Instagram. <br> <br> <img src = "cid:unique@kreata.ee"/>`,
        attachments: [{
                filename: 'POSTER.png',
                path: 'public/images/POSTER.png',
                cid: 'unique@kreata.ee',
              }]
    }

    transporter
        .sendMail(mailOptions)
        // .then(() => alert("Email successfully sent!"))
        // .catch((error) => alert("Failed to send email."))
        .then(() => {
            alert("Email sent successfully")
        })
        .catch((error) => {
            alert("Some error occurred")
        })
 })


 app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/mainpage.html"));
 })

 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
 })