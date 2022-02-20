import mailer from "../utils/email/mailer";
import compileEmail from "../utils/email/compile-email";

export default async (to: string, replacements: object) => {
    await mailer.sendMail({
        to,
        from: 'keymanager@example.com',
        subject: "Register Code",
        html: compileEmail('register-code-email', replacements),
    });
}
