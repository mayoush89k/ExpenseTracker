import NodeMailer from "nodemailer";

export const transporter = NodeMailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const emailConfig = (userEmail, expensesOfTheWeek) => {
  const sum = expensesOfTheWeek.reduce((acc, cur) => acc + cur.priceNIS, 0);
  const emailOptions = {
    from: process.env.MAIL_USER,
    to: userEmail,
    subject: "Your Weekly Report",
    html: `<div>
    <h1>Weekly Report</h1>
    <ul>
        ${expensesOfTheWeek.map((e) => `<li>${e.productName}</li>`).join("")}
    </ul>
    <p><b>Total price in NIS:</b>${sum}</p>
</div>`,
  };
  return emailOptions;
};
