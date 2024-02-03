import nodemailer from "nodemailer";
import dotenv from "dotenv";
import emailTemplate from "./emailTemplate.js";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SEND_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendEmail(email, url) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"iti-e-commerce" <${process.env.SEND_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: emailTemplate(url), // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}
export default sendEmail;
