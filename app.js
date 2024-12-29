// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // API 1: Send Email to User and Predefined Email (Your email)
// app.post('/send-email', async (req, res) => {
//     const { to, subject, text } = req.body;

//     if (!to || !subject || !text) {
//         return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
//     }

//     // Predefined email (your email) where user details will be sent
//     const predefinedEmail = process.env.PREDEFINED_EMAIL;
//     if (!predefinedEmail) {
//         return res.status(500).json({ error: 'Predefined email not configured' });
//     }

//     try {
//         // Create a transporter object
//         const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST,
//             port: process.env.SMTP_PORT,
//             secure: false,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         // Send email to both the user's email and the predefined email (your email)
//         const emailOptionsToUser = {
//             from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
//             to: to,
//             subject: 'Congrats! You have successfully submitted your details!',
//             text: `Hello, Congrats! Your details have been successfully submitted to Udaan Digital. We will get back to you shortly.`,
//         };

//         const emailOptionsToAdmin = {
//             from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
//             to: predefinedEmail, // Send details to your predefined email
//             subject: `New Submission from ${to}`,
//             text: `A new user has submitted their details. \n\nEmail: ${to}\nSubject: ${subject}\nMessage: ${text}`,
//         };

//         // Send both emails
//         await transporter.sendMail(emailOptionsToUser); // Send email to the user
//         await transporter.sendMail(emailOptionsToAdmin); // Send email to your email

//         res.status(200).json({ success: 'Email sent successfully to both user and admin!' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Failed to send email' });
//     }
// });

// // API 2: Send Email to User (Welcome email)
// app.post('/send-email-to-user', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ error: 'Email is required' });
//     }

//     // Predefined email (your email) where the user details will be sent
//     const predefinedEmail = process.env.PREDEFINED_EMAIL;

//     try {
//         const transporter = nodemailer.createTransport({
//             host: process.env.SMTP_HOST,
//             port: process.env.SMTP_PORT,
//             secure: false,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         // Send email to predefined email with the user's details
//         const emailOptionsToPredefined = {
//             from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
//             to: predefinedEmail,
//             subject: 'New User Signed Up',
//             text: `A new user has signed up with the email: ${email}`,
//         };

//         // Send email to the predefined email (admin)
//         await transporter.sendMail(emailOptionsToPredefined);

//         // Send a welcome email to the user's email
//         const emailOptionsToUser = {
//             from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: 'Welcome to Udaan Digital!',
//             text: `Hello, Welcome aboard to Udaan Digital! We are excited to have you on our platform.`,
//         };

//         // Send email to the user
//         await transporter.sendMail(emailOptionsToUser);

//         res.status(200).json({ success: 'Email sent successfully!' });
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Failed to send email' });
//     }
// });



// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Dummy data for projects
const projects = [
    {
        id: 1,
        name: 'Project A',
        image: 'https://cdn.pixabay.com/photo/2019/03/20/21/01/arc-de-triomphe-4069577_1280.jpg',
        location: 'New York, USA',
        description: 'This is the description for Project A.',
    },
    {
        id: 2,
        name: 'Project B',
        image: 'https://cdn.pixabay.com/photo/2019/03/20/21/01/arc-de-triomphe-4069577_1280.jpg',
        location: 'London, UK',
        description: 'This is the description for Project B.',
    },
    {
        id: 3,
        name: 'Project C',
        image: 'https://cdn.pixabay.com/photo/2019/03/20/21/01/arc-de-triomphe-4069577_1280.jpg',
        location: 'Sydney, Australia',
        description: 'This is the description for Project C.',
    },
    {
        id: 4,
        name: 'Project C',
        image: 'https://cdn.pixabay.com/photo/2019/03/20/21/01/arc-de-triomphe-4069577_1280.jpg',
        location: 'Sydney, Australia',
        description: 'This is the description for Project C.',
    },
    {
        id: 5,
        name: 'Project C',
        image: 'https://cdn.pixabay.com/photo/2019/03/20/21/01/arc-de-triomphe-4069577_1280.jpg',
        location: 'Sydney, Australia',
        description: 'This is the description for Project C.',
    },
];

// Email API 1: Send email to the user and admin
app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
    }

    const predefinedEmail = process.env.PREDEFINED_EMAIL;
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

        const emailOptionsToUser = {
            from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Congrats! You have successfully submitted your details!',
            text: `Hello, Congrats! Your details have been successfully submitted to Udaan Digital. We will get back to you shortly.`,
        };

        const emailOptionsToAdmin = {
            from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
            to: predefinedEmail,
            subject: `New Submission from ${to}`,
            text: `A new user has submitted their details. \n\nEmail: ${to}\nSubject: ${subject}\nMessage: ${text}`,
        };

        await transporter.sendMail(emailOptionsToUser);
        await transporter.sendMail(emailOptionsToAdmin);

        res.status(200).json({ success: 'Emails sent successfully to both user and admin!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Email API 2: Send welcome email to the user and notify admin
app.post('/send-email-to-user', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const predefinedEmail = process.env.PREDEFINED_EMAIL;

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

        const emailOptionsToPredefined = {
            from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
            to: predefinedEmail,
            subject: 'New User Signed Up',
            text: `A new user has signed up with the email: ${email}`,
        };

        const emailOptionsToUser = {
            from: `"Udaan Digital" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to Udaan Digital!',
            text: `Hello, Welcome aboard to Udaan Digital! We are excited to have you on our platform.`,
        };

        await transporter.sendMail(emailOptionsToPredefined);
        await transporter.sendMail(emailOptionsToUser);

        res.status(200).json({ success: 'Emails sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// API 1: Get all project names and images
app.get('/api/projects', (req, res) => {
    const projectSummaries = projects.map(({ id, name, image }) => ({ id, name, image }));
    res.status(200).json({ success: true, projects: projectSummaries });
});

// API 2: Get details of a specific project by ID
app.get('/api/project/:id', (req, res) => {
    const projectId = parseInt(req.params.id, 10);
    console.log('Requested Project ID:', projectId);  // Debug log

    const project = projects.find((proj) => proj.id === projectId);
    console.log('Found Project:', project);  // Debug log

    if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.status(200).json({ success: true, project });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
