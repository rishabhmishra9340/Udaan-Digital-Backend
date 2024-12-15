const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); 
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// API 1: Send Email (Existing)
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
        });

        res.status(200).json({ success: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// API 2: Send Email to Given Email (New)
app.post('/send-email-to-user', async (req, res) => {
    const predefinedEmail = process.env.PREDEFINED_EMAIL; // This should be the predefined email

    if (!predefinedEmail) {
        return res.status(500).json({ error: 'Predefined email not configured' });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
            to: predefinedEmail, // Send to predefined email
            subject: 'Welcome to Udaan Digital',
            text: `Hello, We noticed you signed up on Udaan Digital. Welcome aboard!`,
        });

        res.status(200).json({ success: 'Email sent successfully to the predefined email!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
