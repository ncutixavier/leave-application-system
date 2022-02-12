import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  var mailOptions = {
    from: `Leave Application System <${process.env.USER_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};

export default sendEmail;
