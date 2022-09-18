const express = require("express");
const app = express()
const port = process.env.PORT || 5500;



require("dotenv").config();
const path = require("path");

const cors = require("cors");
app.use(cors());
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}));

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

app.post("/", (req, res) => {
    const to = req.body.to;
    const mailOptions = {
        
        from: "terra.green.campaign@gmail.com",
        to: to,
        subject: "Join the TerraGreen Community",
        html: `We are a community of people committed to improving the world that we live in. We aim to spread awareness about the various climate change phenomena and their causes, and encourage the public to take steps like recycling, minimise wastage and dedicate their time for a good cause by participating in environmental campaigns. To get notified about future campaigns, follow us on Instagram. <br> <br> <img src = "cid:unique@kreata.ee"/>`,
        attachments: [{
                filename: 'POSTER2.jpeg',
                path: 'public/images/POSTER2.jpeg',
                cid: 'unique@kreata.ee',
              }]
    }

    transporter
        .sendMail(mailOptions)
        .then(() => {
            res.sendFile(path.join(__dirname, "./public/mainpage.html"));
        })
        .catch((error) => {
            console.log(error);
            res.json({status: "FAILED", message: "Error occurred!"});
        })
 })


 app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/mainpage.html"));
 })

 app.listen(port, () => {
    console.log(`Server running on port ${port}`);
 })