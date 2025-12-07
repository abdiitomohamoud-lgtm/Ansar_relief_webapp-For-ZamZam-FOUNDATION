import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-primary-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white text-center">Terms of Service</h1>
          <p className="mt-2 text-center text-primary-100">Last Updated: June 1, 2023</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="prose max-w-none">
              <p>
                Welcome to Ansar Charity Organization. Please read these Terms of Service ("Terms", "Terms of Service") 
                carefully before using our website operated by Ansar Charity Organization.
              </p>
              
              <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with 
                these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              
              <p>
                <strong>By accessing or using the Service, you agree to be bound by these Terms. If you disagree 
                with any part of the terms, then you may not access the Service.</strong>
              </p>
              
              <h2>Use of Service</h2>
              <p>
                Our service allows you to learn about our humanitarian work, make donations to our programs, and 
                engage with our content. You are responsible for safeguarding the security of your account information 
                and for any activities or actions under your account.
              </p>
              
              <p>
                When making donations through our service, you agree to provide accurate and complete information 
                about yourself and your payment method. You authorize us to charge your payment method for the 
                donation amount you have specified, along with any applicable fees or taxes.
              </p>
              
              <h2>Donations</h2>
              <p>
                All donations made through our platform are considered charitable contributions to Ansar Charity 
                Organization. Donation receipts will be provided for tax purposes.
              </p>
              
              <p>
                By making a donation, you acknowledge that:
              </p>
              <ul>
                <li>All donations are final and non-refundable, except in cases of demonstrable error or fraud.</li>
                <li>While we make every effort to allocate funds according to donor designation, we reserve the right to use funds where needed most if a designated program is overfunded or no longer operational.</li>
                <li>A small percentage of donations may be used for administrative costs and operational expenses necessary to maintain our charitable activities.</li>
                <li>For recurring donations, you authorize us to charge your payment method on a regular basis until you cancel the recurring donation.</li>
              </ul>
              
              <h2>User Content</h2>
              <p>
                Our Service may allow you to post, link, store, share and otherwise make available certain information, 
                text, graphics, videos, or other material ("Content"). You are responsible for the Content that you 
                post on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              
              <p>
                By posting Content on or through the Service, you represent and warrant that:
              </p>
              <ul>
                <li>The Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms.</li>
                <li>The posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.</li>
              </ul>
              
              <p>
                We reserve the right to remove any Content from the Service at our discretion, without prior 
                notice, for any reason, including but not limited to, if we believe that such Content violates 
                these Terms.
              </p>
              
              <h2>Intellectual Property</h2>
              <p>
                The Service and its original content (excluding Content provided by users), features, and 
                functionality are and will remain the exclusive property of Ansar Charity Organization and its 
                licensors. The Service is protected by copyright, trademark, and other laws of both the Canada 
                and foreign countries. Our trademarks and trade dress may not be used in connection with any 
                product or service without the prior written consent of Ansar Charity Organization.
              </p>
              
              <h2>Limitation of Liability</h2>
              <p>
                In no event shall Ansar Charity Organization, nor its directors, employees, partners, agents, 
                suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or 
                punitive damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses, resulting from:
              </p>
              <ol>
                <li>Your access to or use of or inability to access or use the Service;</li>
                <li>Any conduct or content of any third party on the Service;</li>
                <li>Any content obtained from the Service; and</li>
                <li>Unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.</li>
              </ol>
              
              <h2>Disclaimer</h2>
              <p>
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" 
                basis. The Service is provided without warranties of any kind, whether express or implied, including, 
                but not limited to, implied warranties of merchantability, fitness for a particular purpose, 
                non-infringement or course of performance.
              </p>
              
              <p>
                Ansar Charity Organization, its subsidiaries, affiliates, and its licensors do not warrant that:
              </p>
              <ol>
                <li>The Service will function uninterrupted, secure or available at any particular time or location;</li>
                <li>Any errors or defects will be corrected;</li>
                <li>The Service is free of viruses or other harmful components; or</li>
                <li>The results of using the Service will meet your requirements.</li>
              </ol>
              
              <h2>External Links</h2>
              <p>
                Our Service may contain links to third-party websites or services that are not owned or controlled 
                by Ansar Charity Organization. We have no control over, and assume no responsibility for, the 
                content, privacy policies, or practices of any third-party websites or services. You further 
                acknowledge and agree that Ansar Charity Organization shall not be responsible or liable, directly 
                or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use 
                of or reliance on any such content, goods or services available on or through any such websites 
                or services.
              </p>
              
              <p>
                We strongly advise you to read the terms and conditions and privacy policies of any third-party 
                websites or services that you visit.
              </p>
              
              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any 
                reason whatsoever, including without limitation if you breach the Terms. Upon termination, your 
                right to use the Service will immediately cease.
              </p>
              
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of Canada and the province 
                of Ontario, without regard to its conflict of law provisions. Our failure to enforce any right or 
                provision of these Terms will not be considered a waiver of those rights. If any provision of 
                these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these 
                Terms will remain in effect.
              </p>
              
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a 
                revision is material, we will try to provide at least 30 days' notice prior to any new terms taking 
                effect. What constitutes a material change will be determined at our sole discretion. By continuing 
                to access or use our Service after those revisions become effective, you agree to be bound by the 
                revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
              
              <h2>Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <address>
                Ansar Charity Organization<br />
                123 Charity Lane<br />
                Toronto, ON M5V 2K7<br />
                Canada<br />
                <br />
                Phone: +1 (555) 123-4567<br />
                Email: legal@ansarcharity.org
              </address>
              
              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-500">
                  These terms are effective as of June 1, 2023.
                </p>
                <p className="mt-2">
                  <Link to="/legal/privacy" className="text-primary-600 hover:text-primary-500">
                    View our Privacy Policy
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

export default TermsOfService; 