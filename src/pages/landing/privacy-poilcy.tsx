import PublicFooter from "../../components/footer"
import { PublicHeader } from "../../components/header"

const PrivacyPolicy = () => {
  return (
    <div className="landing_container">
      <PublicHeader />
      <div className="landing_content-wrapper">
        <div className="landing_sub-wrapper">
          <h2>Privacy Policy</h2>

          <section className="terms-section">
            <h2 className="landing_sub-heading">1. Introduction</h2>
            <div className="landing_paragraph">
              Welcome to CNNCT – Easy Scheduling System ("Platform"). This
              Privacy Policy explains how we collect, use, and protect your
              personal data when you use our services.
            </div>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">2. Information We Collect</h2>
            <ul className="unordered-list">
              <li>
                Personal information such as name, email address, and contact
                details provided during registration.
              </li>
              <li>
                Event-related data, including bookings, preferences, and
                participation history.
              </li>
              <li>
                Usage data such as IP address, browser type, and device
                information collected through cookies.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              3. How We Use Your Information
            </h2>
            <ul className="unordered-list">
              <li>To provide and improve our event management services.</li>
              <li>
                To personalize user experience and recommend relevant events.
              </li>
              <li>To communicate updates, promotions, or important notices.</li>
              <li>To ensure security and prevent fraudulent activities.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              4. Data Sharing & Third Parties
            </h2>
            <ul className="unordered-list">
              <li>We do not sell or rent user data to third parties.</li>
              <li>
                Data may be shared with event organizers for event management
                purposes.
              </li>
              <li>
                Third-party services (such as payment providers) may process
                user information as necessary.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              5. Data Protection & Security
            </h2>
            <ul className="unordered-list">
              <li>
                We implement industry-standard security measures to protect your
                data.
              </li>
              <li>
                Users are responsible for maintaining the confidentiality of
                their account credentials.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              6. Cookies & Tracking Technologies
            </h2>
            <p className="landing_paragraph">
              We use cookies to enhance user experience, analyze traffic, and
              improve our services. Users can control cookie preferences through
              browser settings.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">7. User Rights & Choices</h2>
            <ul className="unordered-list">
              <li>
                Users can access, update, or delete their personal data upon
                request.
              </li>
              <li>
                Users can opt out of promotional communications at any time.
              </li>
              <li>
                Requests regarding data access or deletion can be sent to our
                support team.
              </li>
            </ul>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">8. Data Retention</h2>
            <p className="landing_paragraph">
              We retain user data as long as necessary for service provision,
              legal compliance, and legitimate business purposes.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">
              9. Changes to Privacy Policy
            </h2>
            <p className="landing_paragraph">
              We may update this Privacy Policy periodically. Significant
              changes will be communicated to users.
            </p>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">10. Contact Information</h2>
            <div className="landing_paragraph">
              For any privacy-related queries, please contact us at
              shikharvarshney10@gmail.com.
            </div>
          </section>
        </div>
        <PublicFooter />
      </div>
    </div>
  )
}

export default PrivacyPolicy
