const nodemailer = require("nodemailer");

const EmailHelper = async (email, EmailText, EmailSubject) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
            user: "fjfahim1999@gmail.com",
            pass: "pfez fxhw tipb hnox",
        },
    });

    let mailOptions = {
        from: "Your OTP CODE <fjfahim1999@gmail.com>",
        to: `${email}`,
        subject: EmailSubject,
        html: `<div>${EmailText}</div> <div> <p> Email: ${email}</p></div> 
    <br/> <b>This Email Send From Sarkar</b>`,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = EmailHelper;
