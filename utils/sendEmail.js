import formData from "form-data";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Replace with your SMTP server
  port: 587, // Replace with the port your SMTP server uses (typically 587 for TLS, 465 for SSL)
  secure: false, // true for 465, false for other ports (set to true if using SSL)
  auth: {
    user: "81035b001@smtp-brevo.com", // Replace with your email
    pass: "32AnwybtVXEMTgNh", // Replace with your password
  },
});

// Email message options
let mailOptions = (to, subject, text) => {
  return {
    from: "mostak35-1952@diu.edu.bd",
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
