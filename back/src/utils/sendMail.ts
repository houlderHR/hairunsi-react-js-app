import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

const emailTemplateSource = fs.readFileSync('src/template/email.hbs', 'utf8');

const template = handlebars.compile(emailTemplateSource);

const sendMail = async (subject: string, recipient: string, link: string) => {
  return new Promise((resolve, reject) => {
    const emailContent = {
      title: 'Réinitialisation de mot de passe',
      content: "Cet email vient de l'équipe de hairun.",
      link: link,
    };
    const htmlToSend = template(emailContent);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.MAIL_USER,
      to: recipient,
      subject: subject,
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error);
      resolve(info.response);
    });
  });
};

export default sendMail;
