import React from "react";
import PopupForm from "./PopupFrom";
import "./termsandcondition.css"

class TermsAndConditions extends React.Component {
    render() {
        return (
          <div id="terms-container" className="container">
            <h1>Terms and Conditions</h1>
            <p>Welcome to Health Vista, your ultimate health management app. By accessing or using Health Vista, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully before using our app. If you do not agree with any part of these terms, you may not access or use Health Vista.</p>
            <ol>
         <li><strong>Acceptance of Terms</strong>: By accessing or using Health Vista, you agree to be bound by these terms and conditions, which constitute a legally binding agreement between you and Health Vista.</li>
         <li><strong>Use of Health Vista</strong>: You agree to use Health Vista solely for your personal health management purposes. You may not use Health Vista for any unlawful or prohibited purposes.</li>
         <li><strong>Privacy Policy</strong>: Your use of Health Vista is also subject to our Privacy Policy, which governs the collection and use of your personal information. By using Health Vista, you consent to the collection and use of your personal information as outlined in the Privacy Policy.</li>
         <li><strong>Account Registration</strong>: In order to access certain features of Health Vista, you may be required to register an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date.</li>
         <li><strong>Security</strong>: You are responsible for maintaining the confidentiality of your account credentials and for any activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</li>
         <li><strong>Intellectual Property</strong>: Health Vista and its content, including but not limited to text, graphics, logos, images, and software, are the property of Health Vista or its licensors and are protected by copyright and other intellectual property laws. You may not modify, reproduce, distribute, or otherwise use any part of Health Vista without prior written consent.</li>
         <li><strong>Disclaimer of Warranties</strong>: Health Vista is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We do not warrant that Health Vista will be uninterrupted or error-free, or that any defects will be corrected.</li>
         <li><strong>Limitation of Liability</strong>: In no event shall Health Vista or its affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of Health Vista, even if we have been advised of the possibility of such damages.</li>
         <li><strong>Indemnification</strong>: You agree to indemnify and hold Health Vista and its affiliates, officers, directors, employees, and agents harmless from any claims, damages, liabilities, costs, or expenses (including reasonable attorneys' fees) arising out of or in connection with your use of Health Vista or your violation of these terms and conditions.</li>
         <li><strong>Changes to Terms</strong>: We reserve the right to modify or revise these terms and conditions at any time, without prior notice. Your continued use of Health Vista following the posting of changes will constitute your acceptance of such changes.</li>
         <li><strong>Governing Law</strong>: These terms and conditions shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of laws principles.</li>
       </ol>
       <p>If you have any questions or concerns about these terms and conditions, please <span><PopupForm 
                buttonText="Contact Us"
                buttonClassName="Popup-term-link"
                buttonType="link"
        /></span>. Thank you for using Health Vista!</p>

     </div>
   );
 }
}


export default TermsAndConditions;

                