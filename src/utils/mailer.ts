import nodemailer from "nodemailer";

export default nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_AUTH_USER,
        pass: process.env.MAILTRAP_AUTH_PASSWORD
    }
});
