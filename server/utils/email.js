import transporter from "../config/mail.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from './emailTemplate.js'

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await transporter.sendMail({
            from: `"Stepora" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
        });

        console.log("Verification email sent:", response.messageId);
    } catch (error) {
        console.error("Error in sending verification email", error);
        throw error;
    }
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: `"Stepora" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Welcome to Stepora",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name).replace("{email}", email)
        });

        console.log("Welcome email sent:", response.messageId);
    } catch (error) {
        console.error("Error in sending welcome email", error);
        throw error;
    }
}

export const sendPaswordResetEmail = async (email, resetUrl) => {
    try {
        const response = await transporter.sendMail({
            from: `"Stepora" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl)
        });

        console.log("Reset password email:", response.messageId);
    } catch (error) {
        console.error("Error in reset password email", error);
        throw error;
    }
}

export const sendResetPasswordEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: `"Stepora" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Reset password successfully",
            html: PASSWORD_RESET_REQUEST_TEMPLATE
        });

        console.log("Successful reset password email:", response.messageId);
    } catch (error) {
        console.error("Error in successful reset password email", error);
        throw error;
    }
}