import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// TODO: Create a template for email and add env variables

/**
 * Send an email
 *
 * @param to Recipient email
 * @param subject Email subject
 * @param html Email body
 * @return {Promise<void>}
 */
const send = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: to,
            subject: subject,
            html: html
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const sendOTP = async (to, otp) => {
    await send(to, 'Email Confirmation OTP', `<h1>${otp}</h1>`);
};

const sendToken = async (to, token) => {
    await send(to, 'Email Confirmation', `<a>http://localhost:3000/confirm-email?token=${token}</a>`);
};

const sendPasswordResetEmail = async (to, token) => {
    await send(to, 'Password Reset', `<a>http://localhost:3000/reset-password?token=${token}</a>`);
}

const sendPasswordResetOTP = async (to, otp) => {
    await send(to, 'Password Reset OTP', `<h1>${otp}</h1>`);
}


const Email = {
    send,
    sendOTP,
    sendToken,
    sendPasswordResetEmail,
    sendPasswordResetOTP
}

export default Email;