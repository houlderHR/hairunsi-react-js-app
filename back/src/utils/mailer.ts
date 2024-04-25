import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { google } from 'googleapis';
import { generateToken } from './utils.method';

class Mailer {
  private transporter: nodemailer.Transporter;
  private OAuth_client;

  constructor() {
    if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.REFRESH_TOKEN) {
      const OAuth2 = google.auth.OAuth2;
      this.OAuth_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
      this.OAuth_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
      this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USER,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: this.OAuth_client.getAccessToken(),
        },
      });
    } else {
      this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
    }
  }

  getTemplate(username: string, link: string) {
    const emailContent = {
      username: username,
      link: link,
    };
    const emailTemplateSource = fs.readFileSync('template/email.hbs', 'utf8');
    const template = handlebars.compile(emailTemplateSource);
    return template(emailContent);
  }

  async sendMail(subject: string, username: string, recipient: string, link: string) {
    const htmlToSend = this.getTemplate(username, link);

    var mailOptions = {
      from: process.env.MAIL_USER,
      to: recipient,
      subject: subject,
      html: htmlToSend,
    };
    return new Promise((resolve, reject) => {
      const token = generateToken({ link: link }, '2 min');
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) reject({ isSending: false, error: error });
        resolve({ isSending: true, token: token });
      });
    });
  }
}

export default Mailer;
