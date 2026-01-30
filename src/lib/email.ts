import { Resend } from 'resend';

// Initialize with a dummy key if not present to prevent build failures
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://micro-learning.app';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Microlearning';

export interface EmailData {
  to: string;
  name: string;
  message?: string;
}

/**
 * Send initial confirmation email after form submission
 */
export async function sendConfirmationEmail(data: EmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Thank you for contacting ${SITE_NAME}`,
      html: generateConfirmationEmailHTML(data),
      text: generateConfirmationEmailText(data),
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
}

/**
 * Send resend confirmation email (24 hours after initial confirmation)
 */
export async function sendResendConfirmationEmail(data: EmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.to,
      subject: `Following up on your ${SITE_NAME} inquiry`,
      html: generateResendEmailHTML(data),
      text: generateResendEmailText(data),
    });
  } catch (error) {
    console.error('Error sending resend confirmation email:', error);
    throw new Error('Failed to send resend confirmation email');
  }
}

/**
 * Generate HTML for initial confirmation email
 */
function generateConfirmationEmailHTML(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for contacting us</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #14b8a6 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                ${SITE_NAME}
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                AI-Powered Training for Frontline Workers
              </p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #0f172a; font-size: 24px; font-weight: 600;">
                Thank you for reaching out, ${data.name}!
              </h2>
              
              <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.6;">
                We've received your message and our team will review it shortly. Here's what you can expect:
              </p>
              
              <ul style="margin: 0 0 24px; padding-left: 20px; color: #475569; font-size: 16px; line-height: 1.8;">
                <li>Our team will respond within 24 hours</li>
                <li>We'll provide personalized recommendations for your needs</li>
                <li>You'll learn how we can help your frontline workforce</li>
              </ul>
              
              ${data.message ? `
              <div style="background-color: #f1f5f9; border-left: 4px solid #14b8a6; padding: 16px 20px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                  Your Message
                </p>
                <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6;">
                  ${data.message}
                </p>
              </div>
              ` : ''}
              
              <div style="margin: 32px 0; text-align: center;">
                <a href="${SITE_URL}" style="display: inline-block; background: linear-gradient(135deg, #14b8a6 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Visit Our Website
                </a>
              </div>
              
              <p style="margin: 24px 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                In the meantime, feel free to explore our website to learn more about how we're empowering 250M+ frontline workers across India.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 12px; color: #64748b; font-size: 14px;">
                ${SITE_NAME} - Empowering India's Frontline Workforce
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text for initial confirmation email
 */
function generateConfirmationEmailText(data: EmailData): string {
  return `
${SITE_NAME} - Thank you for reaching out!

Hi ${data.name},

We've received your message and our team will review it shortly.

What to expect:
- Our team will respond within 24 hours
- We'll provide personalized recommendations for your needs
- You'll learn how we can help your frontline workforce

${data.message ? `Your Message:\n${data.message}\n\n` : ''}

In the meantime, feel free to explore our website to learn more about how we're empowering 250M+ frontline workers across India.

Visit us at: ${SITE_URL}

---
${SITE_NAME} - Empowering India's Frontline Workforce
© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.
  `.trim();
}

/**
 * Generate HTML for resend confirmation email
 */
function generateResendEmailHTML(data: EmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Following up on your inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #14b8a6 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                ${SITE_NAME}
              </h1>
              <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                AI-Powered Training for Frontline Workers
              </p>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #0f172a; font-size: 24px; font-weight: 600;">
                Still interested, ${data.name}?
              </h2>
              
              <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.6;">
                We wanted to follow up on your recent inquiry about ${SITE_NAME}. We're here to help answer any questions you might have!
              </p>
              
              <p style="margin: 0 0 16px; color: #475569; font-size: 16px; line-height: 1.6;">
                Our AI-powered training platform is helping companies transform how they train their frontline workers:
              </p>
              
              <ul style="margin: 0 0 24px; padding-left: 20px; color: #475569; font-size: 16px; line-height: 1.8;">
                <li><strong>No App Required</strong> - Training via WhatsApp, SMS & Telegram</li>
                <li><strong>12+ Languages</strong> - Reach every worker in their language</li>
                <li><strong>2-3 Minute Modules</strong> - Bite-sized learning that works</li>
                <li><strong>250M+ Workers</strong> - Built for India's frontline workforce</li>
              </ul>
              
              <div style="background-color: #f0fdfa; border: 2px solid #14b8a6; padding: 20px; margin: 24px 0; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 12px; color: #0f172a; font-size: 18px; font-weight: 600;">
                  Ready to see it in action?
                </p>
                <p style="margin: 0 0 16px; color: #475569; font-size: 14px;">
                  Book a 7-day pilot and experience the difference
                </p>
                <a href="${SITE_URL}#contact" style="display: inline-block; background: linear-gradient(135deg, #14b8a6 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                  Book Your Pilot
                </a>
              </div>
              
              <p style="margin: 24px 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                Have questions? Simply reply to this email and our team will get back to you right away.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 12px; color: #64748b; font-size: 14px;">
                ${SITE_NAME} - Empowering India's Frontline Workforce
              </p>
              <p style="margin: 0 0 12px; color: #94a3b8; font-size: 12px;">
                © ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.
              </p>
              <p style="margin: 0; color: #cbd5e1; font-size: 11px;">
                You're receiving this because you contacted us at ${SITE_URL}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text for resend confirmation email
 */
function generateResendEmailText(data: EmailData): string {
  return `
${SITE_NAME} - Following up on your inquiry

Hi ${data.name},

We wanted to follow up on your recent inquiry about ${SITE_NAME}. We're here to help answer any questions you might have!

Our AI-powered training platform is helping companies transform how they train their frontline workers:

• No App Required - Training via WhatsApp, SMS & Telegram
• 12+ Languages - Reach every worker in their language
• 2-3 Minute Modules - Bite-sized learning that works
• 250M+ Workers - Built for India's frontline workforce

Ready to see it in action?
Book a 7-day pilot and experience the difference: ${SITE_URL}#contact

Have questions? Simply reply to this email and our team will get back to you right away.

---
${SITE_NAME} - Empowering India's Frontline Workforce
© ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.

You're receiving this because you contacted us at ${SITE_URL}
  `.trim();
}
