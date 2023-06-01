import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();


const PORT = process.env.EMAIL_PORT;
const SMTP_PORT = process.env.SMTP_PORT;
const HOST_SERVICE = process.env.HOST_SERVICE ;

const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASSWORD = process.env.USER_PASSWORD;

const SENDERS_EMAIL = "adarsh.igtechso@gmail.com"; 
let RECEIVERS_EMAIL = "adarsh91094@gmail.com";
const CC = []; 
const BCC = []; 
const EMAIL_SUBJECT = "Code";
let EMAIL_BODY_HTML ;

const fillValues = (email,token) => {
    RECEIVERS_EMAIL = email;
    EMAIL_BODY_HTML = `<h3>Find your password recovery token below<h3><br><em>${token}<em>`
}

const emailOptions = {
  from: SENDERS_EMAIL,
  to: RECEIVERS_EMAIL,
  cc: CC,
  bcc: BCC,
  subject: EMAIL_SUBJECT,
  html: EMAIL_BODY_HTML,
};



const transporter = nodemailer.createTransport({
  host: HOST_SERVICE,
  port: SMTP_PORT,
  secure: false, 
  auth: {
    user: USER_EMAIL,
    pass: USER_PASSWORD,
  },
});

export const sendMail = (email,token) => {
    fillValues(email, token);
  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
