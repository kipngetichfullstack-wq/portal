import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(email: string, code: string) {
  const mailOptions = {
    from: `"EastSecure Cyber Solutions" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Email Verification Code - EastSecure',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #1e40af 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🛡️ EastSecure</h1>
          <p style="color: #e0f2fe; margin: 5px 0 0 0;">Cyber Solutions</p>
        </div>
        
        <div style="padding: 40px 30px; background: #ffffff;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Email Verification</h2>
          <p style="color: #475569; font-size: 16px; line-height: 1.6;">
            Thank you for signing up with EastSecure Cyber Solutions. Please use the verification code below to complete your registration:
          </p>
          
          <div style="background: #f1f5f9; border: 2px dashed #0891b2; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
            <div style="font-size: 32px; font-weight: bold; color: #0891b2; letter-spacing: 4px; font-family: monospace;">
              ${code}
            </div>
          </div>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; margin: 0;">
              EastSecure Cyber Solutions<br>
              Safeguarding East Africa's Digital Landscape
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

export async function sendContactNotification(inquiry: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
}) {
  const mailOptions = {
    from: `"EastSecure Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `New Contact Inquiry - ${inquiry.service}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #0891b2 0%, #1e40af 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🛡️ New Contact Inquiry</h1>
        </div>
        
        <div style="padding: 30px; background: #ffffff; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${inquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${inquiry.email}</td>
            </tr>
            ${inquiry.company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Company:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${inquiry.company}</td>
            </tr>
            ` : ''}
            ${inquiry.phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${inquiry.phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Service:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b;">${inquiry.service}</td>
            </tr>
          </table>
          
          <h3 style="color: #1e293b; margin: 30px 0 15px 0;">Message:</h3>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0891b2;">
            <p style="color: #475569; margin: 0; line-height: 1.6;">${inquiry.message}</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Contact notification email failed:', error);
    return { success: false, error };
  }
}