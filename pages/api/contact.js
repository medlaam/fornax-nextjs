// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nodemailer from 'nodemailer';
export default async (req, res) => {
  const { name, email, message, phone } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'rakibur74@gmail.com',
      pass: "potwcvmmlnmuzcfn",
    },
  });

  try {
    const emailRes = await transporter.sendMail({
      from: email,
      to: 'rakibur5454@gmail.com',
      subject: `Contact form submission from ${name}`,
      html: `<p>You have a new contact form submission</p><br>
      <p><strong>Name: </strong> ${name} </p><br>
      <p><strong>Phone: </strong> ${phone} </p><br>
      <p><strong>Message: </strong> ${message} </p><br>

      `,
    });

    // console.log('Message Sent', emailRes);
  } catch (err) {
    console.log(err);
  }

  res.status(200).json(req.body);
};