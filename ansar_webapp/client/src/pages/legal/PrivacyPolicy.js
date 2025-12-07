import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">Privacy Policy</h1>
          <p className="mt-2 text-center text-primary-100">Last Updated: June 1, 2023</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p>
                Ansar Charity Organization ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you visit our website, use our services, or make donations.
              </p>
              
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy 
                policy, please do not access the site or use our services.
              </p>
              
              <h2>Collection of Your Information</h2>
              <p>
                We may collect information about you in a variety of ways. The information we may collect 
                via the website includes:
              </p>
              
              <h3>Personal Data</h3>
              <p>
                Personally identifiable information, such as your name, shipping address, email address, 
                telephone number, and demographic information (such as your age, gender, nationality) that 
                you voluntarily give to us when you register with the website, make a donation, or when you 
                choose to participate in various activities related to the website. You are under no obligation 
                to provide us with personal information of any kind, however, your refusal to do so may prevent 
                you from using certain features of the website.
              </p>
              
              <h3>Derivative Data</h3>
              <p>
                Information our servers automatically collect when you access the website, such as your IP 
                address, browser type, operating system, access times, and the pages you have viewed directly 
                before and after accessing the website.
              </p>
              
              <h3>Financial Data</h3>
              <p>
                Financial information, such as data related to your payment method (e.g., valid credit card 
                number, card brand, expiration date) that we may collect when you make a donation. We store 
                very limited, if any, financial information that we collect. Otherwise, all financial information 
                is stored by our payment processor and you are encouraged to review their privacy policy and 
                contact them directly for responses to your questions.
              </p>
              
              <h3>Mobile Device Data</h3>
              <p>
                Device information, such as your mobile device ID, model, and manufacturer, and information 
                about the location of your device, if you access the website from a mobile device.
              </p>
              
              <h2>Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you with a smooth, efficient, 
                and customized experience. Specifically, we may use information collected about you via the 
                website to:
              </p>
              
              <ul>
                <li>Process donations and transactions.</li>
                <li>Send you donation confirmations and receipts.</li>
                <li>Send administrative information regarding your account or donations.</li>
                <li>Send you email newsletters or updates about our work, if you have opted in.</li>
                <li>Request feedback and contact you about your use of the website.</li>
                <li>Respond to your inquiries and solve any potential issues you might have.</li>
                <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
                <li>Create and manage your account.</li>
                <li>Deliver targeted advertising, newsletters, and other information regarding our organization.</li>
                <li>Notify you of updates to the website.</li>
                <li>Increase the efficiency and operation of the website.</li>
                <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
                <li>Perform other business activities as needed.</li>
              </ul>
              
              <h2>Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information 
                may be disclosed as follows:
              </p>
              
              <h3>By Law or to Protect Rights</h3>
              <p>
                If we believe the release of information about you is necessary to respond to legal process, 
                to investigate or remedy potential violations of our policies, or to protect the rights, property, 
                and safety of others, we may share your information as permitted or required by any applicable 
                law, rule, or regulation.
              </p>
              
              <h3>Third-Party Service Providers</h3>
              <p>
                We may share your information with third parties that perform services for us or on our behalf, 
                including payment processing, data analysis, email delivery, hosting services, customer service, 
                and marketing assistance.
              </p>
              
              <h3>Marketing Communications</h3>
              <p>
                With your consent, or with an opportunity for you to withdraw consent, we may share your 
                information with third parties for marketing purposes.
              </p>
              
              <h3>Interactions with Other Users</h3>
              <p>
                If you interact with other users of the website, those users may see your name, profile photo, 
                and descriptions of your activity.
              </p>
              
              <h3>Online Postings</h3>
              <p>
                When you post comments, contributions, or other content to the website, your posts may be 
                viewed by all users and may be publicly distributed outside the website in perpetuity.
              </p>
              
              <h3>Third-Party Advertisers</h3>
              <p>
                We may use third-party advertising companies to serve ads when you visit the website. These 
                companies may use information about your visits to the website and other websites that are 
                contained in web cookies in order to provide advertisements about goods and services of 
                interest to you.
              </p>
              
              <h2>Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal 
                information. While we have taken reasonable steps to secure the personal information you provide 
                to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, 
                and no method of data transmission can be guaranteed against any interception or other type of 
                misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized 
                parties. Therefore, we cannot guarantee complete security if you provide personal information.
              </p>
              
              <h2>Policy for Children</h2>
              <p>
                We do not knowingly solicit information from or market to children under the age of 13. If you 
                become aware of any data we have collected from children under age 13, please contact us using 
                the contact information provided below.
              </p>
              
              <h2>Options Regarding Your Information</h2>
              <p>
                You may at any time review or change the information in your account or terminate your account by:
              </p>
              <ul>
                <li>Logging into your account settings and updating your account</li>
                <li>Contacting us using the contact information provided below</li>
              </ul>
              <p>
                Upon your request to terminate your account, we will deactivate or delete your account and 
                information from our active databases. However, some information may be retained in our files 
                to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of 
                Use and/or comply with legal requirements.
              </p>
              
              <h3>Emails and Communications</h3>
              <p>
                If you no longer wish to receive correspondence, emails, or other communications from us, you 
                may opt-out by:
              </p>
              <ul>
                <li>Noting your preferences at the time you register your account with the website</li>
                <li>Logging into your account settings and updating your preferences</li>
                <li>Contacting us using the contact information provided below</li>
                <li>Using the unsubscribe link in emails</li>
              </ul>
              
              <h2>Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <address>
                Ansar Charity Organization<br />
                123 Charity Lane<br />
                Toronto, ON M5V 2K7<br />
                Canada<br />
                <br />
                Phone: +1 (555) 123-4567<br />
                Email: privacy@ansarcharity.org
              </address>
              
              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-500">
                  This policy is effective as of June 1, 2023.
                </p>
                <p className="mt-2">
                  <Link to="/legal/terms" className="text-primary-600 hover:text-primary-500">
                    View our Terms of Service
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 