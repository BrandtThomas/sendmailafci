const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nbAbsentes;
let effectifComplet;
let message;
let date = new Date().toLocaleDateString('fr-FR');

const now = new Date(); 
const currentHour = now.getHours();
let demiJournee;

if (currentHour < 12) {
  demiJournee = 'matin';
} else {
  demiJournee = 'après-midi';
}
console.log("Envoi de l'effectif par mail :")
console.log("date : ", date, " heure : ", demiJournee);

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.infomaniak.com",
    secureConnection: false,
    port: 465,
    tls: {
        ciphers: "SSLv3"
    },
    auth: {
        user: "thomas.brandt@afci-formation.fr",
        pass: ""
    }
})

rl.question("Combien de personnes sont absentes ?", function (nbAbsentes) {
    console.log(nbAbsentes + " personne(s) sont absente(s)");

    rl.question("Quel est l'effectif complet de la formation ?", function (effectifComplet) {
        console.log("Il y a " + effectifComplet + " personne(s) au total dans la formation");

        if (nbAbsentes == 0) { // Utilisation de l'opérateur de comparaison "==" plutôt que l'opérateur d'assignation "=" pour la condition "nbAbsentes == 0"
            message = `Bonjour Monica,

Pour la formation 22DK-714DWWM05, ${effectifComplet} / ${effectifComplet} sont présentes pour le ${date} ${demiJournee}. Tout le monde est présent.

Cordialement,

Brandt Thomas`;

            const mailOptions = {
                from: "thomas.brandt@afci-formation.fr",
                to: "thomas.brandt@gmx.fr",
                cc: "thomas.brandt@afci-formation.fr",
                subject: `Effectif 22DK-714DWWM05 - ${date} ${demiJournee}`,
                text: message
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log("email envoyé" + info.response)
                }
            })
        } else { // Ajout d'un bloc "else" pour le cas où il y a des absents
            message = `Bonjour Monica,

Pour la formation 22DK-714DWWM05, ${effectifComplet - nbAbsentes} / ${effectifComplet} sont présentes pour le ${date} ${demiJournee}. Il y a ${nbAbsentes} personne(s) absente(s).

Cordialement,

Brandt Thomas`;

            const mailOptions = {
                from: "thomas.brandt@afci-formation.fr",
                to: "thomas.brandt@gmx.fr",
                cc: "thomas.brandt@afci-formation.fr",
                subject: `Effectif 22DK-714DWWM05 - ${date} ${demiJournee}`,
                text: message
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                }
                else {
                    console.log("email envoyé" + info.response)
                }
            })
        }
        rl.close();
    });
});
