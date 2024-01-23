import nodemailer from "nodemailer";
import cron from "node-cron";

let mailTransporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "kasey.weimann@ethereal.email",
    pass: "fVuWGduUeBVwcT3R8R",
  },
});

let details = {
  from: process.env.MAIL_USER,
  to: "wwhatever70@gmail.com",
  subject: "Weekly Tracker",
};

const sendWeeklyEmails = (req, res, next) =>
  mailTransporter.sendMail({ ...details, text: req.body.text }, (err) => {
    try {
      res.send("email has been sent");
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

// sendWeeklyEmails()
// cron.schedule("0 12 * * 6", () => {
//   console.log("second");
//   sendWeeklyEmails();
// });

export default sendWeeklyEmails;
