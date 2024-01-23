import nodemailer from "nodemailer";
import cron from "node-cron";

let mailTransporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  // port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

let details = {
  from: process.env.MAIL_USER,
  to: "mayoush89k@gmail.com",
  subject: "Weekly Tracker",
  text: 'req.body.text '
};

const sendWeeklyEmails = (req, res, next) => {
  try {
    mailTransporter.sendMail(details, (err) => {
      console.log('req ', req.body)
      try {
        res.send("email has been sent");
      } catch (error) {
        console.log(error);
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};

// sendWeeklyEmails()
// cron.schedule("0 12 * * 6", () => {
//   console.log("second");
//   sendWeeklyEmails();
// });

export default sendWeeklyEmails;
