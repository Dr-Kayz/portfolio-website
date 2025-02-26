const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Create new contact message
exports.createContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New contact message from ${req.body.name}`,
      text: `You have received a new message from your portfolio website:\n\nName: ${req.body.name}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(201).json({ success: true, message: 'Contact message received and email sent.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
