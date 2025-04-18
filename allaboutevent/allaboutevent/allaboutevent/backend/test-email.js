const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error verifying email configuration:', error);
  } else {
    console.log('Email configuration successful:', success);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'test@example.com', // Replace with your email
      subject: 'Test Email',
      text: 'This is a test email from Nodemailer.',
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending test email:', err);
      } else {
        console.log('Test email sent:', info.response);
      }
    });
  }
});