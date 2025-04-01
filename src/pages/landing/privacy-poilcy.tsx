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
              Privacy Policy outlines the rules and regulations for the use of
              our services.
            </div>
          </section>

          <section className="terms-section">
            <h2 className="landing_sub-heading">2. Contact Information</h2>
            <div className="landing_paragraph">
              For any privacy-related queries, please contact us at
              contact10@gmail.com.
            </div>
          </section>
        </div>
        <PublicFooter />
      </div>
    </div>
  )
}

export default PrivacyPolicy
