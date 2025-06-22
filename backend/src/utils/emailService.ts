import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const emailConfig = {
  user: process.env.MAIL_USER || "",
  pass: process.env.MAIL_PASS || "",
  fromName: "E_School Team",
  projectName: "E-School",
  projectUrl: "",
  supportEmail: "eschool@gmail.com",
};

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

const generateOtpEmailTemplate = (otp: string): { html: string; text: string } => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP Code</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: #007bff; padding: 20px; text-align: center; color: #ffffff; }
        .header img { max-width: 150px; height: auto; }
        .content { padding: 20px; }
        .otp { font-size: 24px; font-weight: bold; color: #007bff; text-align: center; margin: 20px 0; letter-spacing: 2px; }
        .content p { color: #333333; line-height: 1.6; }
        .footer { background: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #666666; }
        .footer a { color: #007bff; text-decoration: none; }
        @media (max-width: 600px) {
          .container { margin: 10px; }
          .header img { max-width: 120px; }
          .otp { font-size: 20px; }
        }
      </style>
    </head>
    <body>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
          <td align="center">
            <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td class="header">
                  <h1 style="margin: 10px 0; font-size: 30px;">${emailConfig.projectName}</h1>
                </td>
              </tr>
              <tr>
                <td class="content">
                  <h2 style="color: #333333; margin-top: 0;">Your OTP Code</h2>
                  <p>Hello,</p>
                  <p>You requested an OTP to verify your account. Please use the code below to complete the verification process:</p>
                  <div class="otp" role="region" aria-label="OTP Code">${otp}</div>
                  <p>This code is valid for <strong>5 minutes</strong>. If you did not request this OTP, please contact our support team at <a href="mailto:${
                    emailConfig.supportEmail
                  }" style="color: #007bff;">${emailConfig.supportEmail}</a>.</p>
                  <p>Thank you for choosing ${emailConfig.projectName}!</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <p>&copy; ${new Date().getFullYear()} ${emailConfig.projectName}. All rights reserved.</p>
                  <p>
                    <a href="${emailConfig.projectUrl}" style="color: #007bff;">Visit our website</a> | 
                    <a href="mailto:${emailConfig.supportEmail}" style="color: #007bff;">Contact Support</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
Your OTP Code for ${emailConfig.projectName}

Hello,

You requested an OTP to verify your account. Please use the code below to complete the verification process:

OTP: ${otp}

This code is valid for 2 minutes. If you did not request this OTP, please contact our support team at ${
    emailConfig.supportEmail
  }.

Thank you for choosing ${emailConfig.projectName}!

---
© ${new Date().getFullYear()} ${emailConfig.projectName}. All rights reserved.
Visit our website: ${emailConfig.projectUrl}
Contact Support: ${emailConfig.supportEmail}
`;

  return { html, text };
};

const generateForgotPasswordEmailTemplate = (magicLink: string): { html: string; text: string } => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: #007bff; padding: 20px; text-align: center; color: #ffffff; }
        .header-logo { max-width: 150px; height: auto; }
        .header-text { font-size: 24px; font-weight: 600; font-style: italic; margin: 10px 0 0 5px; display: inline-block; vertical-align: bottom; }
        .content { padding: 20px; }
        .reset-button { display: inline-block; padding: 12px 24px; background: #007bff; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; text-align: center; margin: 20px 0; }
        .content p { color: #333333; line-height: 1.6; }
        .footer { background: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #666666; }
        .footer a { color: #007bff; text-decoration: none; }
        @media (max-width: 600px) {
          .container { margin: 10px; }
          .header-logo { max-width: 120px; }
          .header-text { font-size: 20px; }
          .reset-button { padding: 10px 20px; font-size: 14px; }
        }
      </style>
    </head>
    <body>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
        <tr>
          <td align="center">
            <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td class="header">
                  <span class="header-text">${emailConfig.projectName}</span>
                </td>
              </tr>
              <tr>
                <td class="content">
                  <h2 style="color: #333333; margin-top: 0;">Reset Your Password</h2>
                  <p>Hello,</p>
                  <p>You requested a password reset for your ${emailConfig.projectName} account. Please click the button below to reset your password:</p>
                  <a href="${magicLink}" class="reset-button" role="button" aria-label="Reset Password">Reset Password</a>
                  <p>If you did not request this password reset, please ignore this email or contact our support team at <a href="mailto:${emailConfig.supportEmail}" style="color: #007bff;">${emailConfig.supportEmail}</a>.</p>
                  <p>This link will expire in <strong>1 hour</strong>.</p>
                  <p>Thank you for using ${emailConfig.projectName}!</p>
                </td>
              </tr>
              <tr>
                <td class="footer">
                  <p>© ${new Date().getFullYear()} ${emailConfig.projectName}. All rights reserved.</p>
                  <p>
                    <a href="${emailConfig.projectUrl}" style="color: #007bff;">Visit our website</a> | 
                    <a href="mailto:${emailConfig.supportEmail}" style="color: #007bff;">Contact Support</a>
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const text = `
Reset Your Password for ${emailConfig.projectName}

Hello,

You requested a password reset for your ${emailConfig.projectName} account. Please use the link below to reset your password:

${magicLink}

If you did not request this password reset, please ignore this email or contact our support team at ${emailConfig.supportEmail}.

This link will expire in 1 hour.

Thank you for using ${emailConfig.projectName}!

---
© ${new Date().getFullYear()} ${emailConfig.projectName}. All rights reserved.
Visit our website: ${emailConfig.projectUrl}
Contact Support: ${emailConfig.supportEmail}
`;

  return { html, text };
};

export const sendOtpEmail = async (email: string, otp: string): Promise<void> => {
  try {
    const { html, text } = generateOtpEmailTemplate(otp);

    const mailOptions = {
      from: `"${emailConfig.fromName}" <${emailConfig.user}>`,
      to: email,
      subject: `Your OTP Code for ${emailConfig.projectName} Verification`,
      html,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error sending OTP email";
    console.error(`[Email Error] Failed to send OTP to ${email}: ${errorMessage}`);
    throw new Error(`Failed to send OTP email: ${errorMessage}`);
  }
};

export const sendForgotPasswordMail = async (email: string, magicLink: string): Promise<void> => {
  try {

    const { html, text } = generateForgotPasswordEmailTemplate(magicLink);

    const mailOptions = {
      from: `"${emailConfig.fromName}" <${emailConfig.user}>`,
      to: email,
      subject: `Reset Your Password for ${emailConfig.projectName}`,
      html,
      text,
    };

    const res = await transporter.sendMail(mailOptions);
    console.log('message sent', res)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error sending password reset email';
    console.error(`[Email Error] Failed to send password reset email to ${email}: ${errorMessage}`);
    throw new Error(`Failed to send password reset email: ${errorMessage}`);
  }
};