import PublicFooter from "../../components/footer"
import { PublicHeader } from "../../components/header"

const TermsAndConditions = () => {
  return (
    <div className="landing_container">
      <PublicHeader />
      <div className="landing_content-wrapper">
        <div className="landing_sub-wrapper">
          <h2>Terms & Conditions</h2>

          <section className="terms-section">
            <h2 className="landing_sub-heading">1. Introduction</h2>
            <div className="landing_paragraph">
              Welcome to CNNCT – Easy Scheduling System ("Platform"). These
              Terms & Conditions govern your use of our event management
              platform and services. By accessing or using our platform, you
              agree to comply with these terms.
            </div>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">2. Definitions</h2>
            <ul className="unordered-list">
              <li>
                "Platform" refers to the event management system provided by
                [Company Name].
              </li>
              <li>
                "User" refers to individuals or organizations using the
                platform.
              </li>
              <li>
                "Event Organizer" refers to users creating and managing events.
              </li>
              <li>
                "Attendee" refers to users registering for or attending events.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              3. User Registration & Accounts
            </h2>
            <ul className="unordered-list">
              <li>
                Users must provide accurate information during registration.
              </li>
              <li>Accounts are personal and non-transferable.</li>
              <li>
                The platform reserves the right to suspend or terminate accounts
                in case of fraudulent activity.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              4. Event Listings & Participation
            </h2>
            <ul className="unordered-list">
              <li>
                Event Organizers are responsible for the accuracy of event
                details.
              </li>
              <li>
                The platform is not liable for any modifications or
                cancellations by organizers.
              </li>
              <li>
                Attendees must comply with the event’s specific rules and
                guidelines.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">6. Code of Conduct</h2>
            <ul className="unordered-list">
              <li>Users must not post or share inappropriate content.</li>
              <li>
                Harassment, discrimination, or any form of abuse is strictly
                prohibited.
              </li>
              <li>
                The platform reserves the right to remove content and suspend
                users violating these terms.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">7. Intellectual Property</h2>
            <div className="landing_paragraph">
              All content and materials on the platform are the property of
              CNNCT or respective event organizers.
            </div>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">8. Limitation of Liability</h2>
            <p className="landing_paragraph">
              The platform is not responsible for third-party interactions,
              including issues arising between attendees and organizers. We do
              not guarantee uninterrupted or error-free service.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">9. Privacy Policy</h2>
            <p className="landing_paragraph">
              Our Privacy Policy outlines data collection, usage, and protection
              measures. By using the platform, you consent to data processing as
              per our policy.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              10. Termination & Suspension
            </h2>
            <ul className="unordered-list">
              <li>
                The platform reserves the right to suspend or terminate any
                account violating these terms.
              </li>
              <li>Users can request account termination at any time.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">11. Changes to Terms</h2>
            <p className="landing_paragraph">
              We may update these Terms & Conditions periodically. Users will be
              notified of significant changes.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">12. Contact Information</h2>
            <div className="landing_paragraph">
              For any queries, please contact us at shikharvarshney10@gmail.com.
            </div>
          </section>
        </div>
        <PublicFooter />
      </div>
    </div>
  )
}

export default TermsAndConditions
