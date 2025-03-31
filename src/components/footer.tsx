import { Link } from "react-router-dom"
import LOGO_ICON from "../assets/logo.svg?react"
import INSTAGRAM_ICON from "../assets/logo/instagram.svg?react"
import TIKTOK_ICON from "../assets/logo/tiktok.svg?react"
import TWIITER_ICON from "../assets/logo/twitter.svg?react"
import YOUTUBE_ICON from "../assets/logo/youtube.svg?react"
import { LinkButton } from "../pages/landing/landing"
import "./css/footer.css"

const PublicFooter = () => {
  return (
    <div className="landing_footer-container">
      <div className="footer-wrapper">
        <div className="footer-btn-wrapper">
          <LinkButton redirectTo="../auth/sign-up" text="Login" />
          <LinkButton
            redirectTo="../auth/sign-up"
            text="Sign up free"
            color="secondary"
          />
        </div>
        <div className="footer-item-wrapper">
          <Link to="../about-cnnct">About CNNCT</Link>
          <Link to="../blog">Blog</Link>
          <Link to="../press">Press</Link>
          <Link to="../social-good">Social Good</Link>
          <Link to="../contact">Contact</Link>
        </div>

        <div className="footer-item-wrapper">
          <Link to="../careers">Careers</Link>
          <Link to="../getting-started">Getting Started</Link>
          <Link to="../features-and-how-tos">Features and how-Tos</Link>
          <Link to="../faqs">FAQs</Link>
          <Link to="../report-a-violation">Report a Violation</Link>
        </div>
        <div className="footer-item-wrapper">
          <Link to="../terms-and-conditions">Terms and Condition</Link>
          <Link to="../privacy-policy">Privacy Policy</Link>
          <Link to="../cookie-policy">Cookie Notice</Link>
          <Link to="../trust-center">Trust Center</Link>
        </div>
      </div>
      <div className="footer-sub-wrapper">
        <small className="footer-item-text">
          We acknowledge the Traditional Custodians of the land on which our
          office stands, The Wurundjeri people of the Kulin Nation, and pay our
          respects to Elders past, present and emerging.
        </small>
        <div className="footer-icons">
          <TWIITER_ICON width={25} height={25} className="secondary-logo" />
          <INSTAGRAM_ICON width={25} height={25} className="secondary-logo" />
          <YOUTUBE_ICON width={25} height={25} className="secondary-logo" />
          <TIKTOK_ICON width={25} height={25} className="secondary-logo" />
          <LOGO_ICON width={25} height={25} className="secondary-logo" />{" "}
        </div>
      </div>
    </div>
  )
}

export default PublicFooter
