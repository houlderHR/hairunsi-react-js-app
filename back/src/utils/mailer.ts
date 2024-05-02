import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { google } from 'googleapis';
import jwtService from '../services/jwt.service';

export type AuthType = {
  user?: string;
  pass?: string;
  type?: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string;
  accessToken?: string;
};

class Mailer {
  private transporter: nodemailer.Transporter;
  private OAuth_client;
  private static instance;
  private constructor() {}

  getAccessToken(): Promise<string> {
    let OAuth2;
    try {
      OAuth2 = google.auth.OAuth2;
      this.OAuth_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
      return new Promise((resolve, reject) => {
        this.OAuth_client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
        this.OAuth_client.getAccessToken((error, token) => {
          if (error) reject(error);
          if (token) resolve(token);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  createTransporter(secure: boolean, auth?: AuthType) {
    try {
      let service: { service?: string } = {};
      if (process.env.MAIL_HOST && process.env.MAIL_HOST.includes('gmail')) {
        service.service = 'gmail';
      }
      return {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        ...service,
        secure: secure,
        auth: {
          user: process.env.MAIL_USER,
          ...auth,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  protected async initialize() {
    try {
      let auth: AuthType = { pass: process.env.MAIL_PASSWORD };
      if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.REFRESH_TOKEN) {
        auth = {
          type: 'OAuth2',
          user: process.env.MAIL_USER,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: await this.getAccessToken(),
        };
      }
      this.transporter = nodemailer.createTransport(
        this.createTransporter(!!auth.type, auth) as nodemailer.TransportOptions,
      );
    } catch (error) {
      throw error;
    }
  }

  public static async getInstance() {
    try {
      if (!Mailer.instance) {
        Mailer.instance = new Mailer();
        await Mailer.instance.initialize();
      }
      return Mailer.instance;
    } catch (error) {
      throw error;
    }
  }

  getTemplate(username: string, link: string) {
    const emailContent = {
      username: username,
      link: link,
    };
    const emailTemplateSource = fs.readFileSync('templates/reset-password/email.hbs', 'utf8');
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
    const token = await jwtService.generateTokenClassic(recipient);
    return new Promise(async (resolve, reject) => {
      if (this.transporter) {
        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject({ isSending: false, error: error });
          }
          if (info) resolve({ isSending: true, token: token });
        });
      } else reject();
    });
  }
}

export default Mailer;
