const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host:"mail.infomaniak.com",
    secureConnection: false,
    port: 465,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user:"thomas.brandt@afci-formation.fr",
        pass: "h7yJcg(4"
    }
})

const mailOptions = {
    from: "thomas.brandt@afci-formation.fr",
    to: "thomas.brandt@gmx.fr",
    cc: "thomas.brandt@afci-formation.fr",
    subject: "email de test",
    text: 
    `Bonjour Monica, 

Aujourd'hui pour la formation *** mettre le code formation ***, 
    
10 personnes sont présentes. Il n'y a pas d'absent. 
    
Cordialement, 
Brandt Thomas`
}

transporter.sendMail(mailOptions, (error, info)=> {
    if (error){
        console.log(error)
    }
    else {
        console.log("email envoyé" + info.response)
    }
})