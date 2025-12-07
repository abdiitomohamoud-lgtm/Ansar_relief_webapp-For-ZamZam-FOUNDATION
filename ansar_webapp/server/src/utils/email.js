const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const htmlToText = require('html-to-text');

/**
 * Email service for Ansar webapp
 */
class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.url = url;
    this.from = `Ansar Organization <${process.env.EMAIL_FROM || 'noreply@ansarorganization.org'}>`;
  }

  /**
   * Create appropriate email transport based on environment
   * @returns {nodemailer.Transporter} Email transporter
   */
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid configuration for production
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    // Development email configuration
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
      port: process.env.EMAIL_PORT || 2525,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  /**
   * Read HTML template and compile with Handlebars
   * @param {string} templateName - Template file name
   * @param {object} variables - Variables to inject into template
   * @returns {string} Compiled HTML
   */
  async compileTemplate(templateName, variables) {
    const templatePath = path.join(__dirname, '../views/emails', `${templateName}.html`);
    
    try {
      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const compiledTemplate = handlebars.compile(templateSource);
      return compiledTemplate(variables);
    } catch (error) {
      console.error(`Error compiling email template: ${templateName}`, error);
      // Fallback to a simple template if the file doesn't exist
      return `
        <h1>Hello ${this.firstName},</h1>
        <p>${variables.message || ''}</p>
        <p>If you need to visit our site, <a href="${this.url}">click here</a>.</p>
        <p>Thank you,<br>Ansar Organization Team</p>
      `;
    }
  }

  /**
   * Send email with specified template and subject
   * @param {string} templateName - Email template name
   * @param {string} subject - Email subject
   * @param {object} variables - Variables for the template
   */
  async send(templateName, subject, variables = {}) {
    // Combine default variables with custom variables
    const templateVars = {
      firstName: this.firstName,
      lastName: this.lastName,
      url: this.url,
      subject,
      ...variables
    };

    // Compile HTML template
    const html = await this.compileTemplate(templateName, templateVars);

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // Send email
    await this.newTransport().sendMail(mailOptions);
  }

  /**
   * Send welcome email
   */
  async sendWelcome() {
    await this.send('welcome', 'Welcome to Ansar Organization', {
      message: 'Thank you for registering with Ansar Organization. We are excited to have you join our community.'
    });
  }

  /**
   * Send password reset email
   * @param {string} resetToken - Reset token
   */
  async sendPasswordReset(resetToken) {
    await this.send('password-reset', 'Your Password Reset Instructions', {
      resetToken,
      message: 'You requested to reset your password. Please click the button below to set a new password.',
      resetUrl: `${this.url}/reset-password?token=${resetToken}`
    });
  }

  /**
   * Send donation confirmation email
   * @param {object} donation - Donation details
   */
  async sendDonationConfirmation(donation) {
    await this.send('donation-confirmation', 'Thank You for Your Donation', {
      donation,
      message: 'Thank you for your generous donation. Your contribution will help make a difference.'
    });
  }
}

module.exports = Email;
