import formData from "form-data";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: process.env.SMTP_PORT, 
  secure: false, // true for 465, false for other ports (set to true if using SSL)
  auth: {
    user: process.env.SMTP_USER, // Replace with your email
    pass: process.env.SMTP_PASS, // Replace with your password
  },
});

// Email message options
let mailOptions = (to, subject, text) => {
  return {
    from: process.env.SMTP_FROM_EMAIL,
    to: to,
    subject: subject, // Subject line
    text: text, // Plain text body
  };
};

// Send email
const sendEmail = (to, subject, text) => {
  return transporter.sendMail(mailOptions(to, subject, text), (error, info) => {
    if (error) {
      return console.log("Error occurred:", error);
    }
    console.log("Email sent:", info.response);
  });
};
export default sendEmail;
