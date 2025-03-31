import { Link } from "react-router-dom"
import FETURE_IMAGE_1 from "../../assets/Fantastical 1.svg"
import FETURE_IMAGE_2 from "../../assets/Fantastical 2.svg"
import HERO_IMAGE from "../../assets/hero-layout.svg"
import AUDIO_ICON from "../../assets/logo/audiomock.svg?react"
import BANDSINTOWN_ICON from "../../assets/logo/bandsintown.svg?react"
import BONFIRE_ICON from "../../assets/logo/bonfire.svg?react"
import BOOKS_ICON from "../../assets/logo/books.svg?react"
import CAMEO_ICON from "../../assets/logo/cameo.svg?react"
import CLUB_ICON from "../../assets/logo/clubhouse.svg?react"
import COMMUNITY_ICON from "../../assets/logo/community.svg?react"
import CONTACT_ICON from "../../assets/logo/contact.svg?react"
import GIFT_ICON from "../../assets/logo/gift.svg?react"
import STAR_ICON from "../../assets/star.svg"
import Button from "../../components/button"
import "../../components/css/landing.css"
import PublicFooter from "../../components/footer"
import { PublicHeader } from "../../components/header"

export const LinkButton = ({
  redirectTo = "../auth/sign-up",
  text = "Sign up free",
  color = "primary",
  className = "",
}: {
  redirectTo?: string
  text?: string
  color?: "primary" | "secondary" | "success" | "danger" | "warning" | "none"
  className?: string
}) => {
  return (
    <Link to={redirectTo} className="link-button">
      <Button type="button" color={color} className={className}>
        {text}
      </Button>
    </Link>
  )
}

const LandingPage = () => {
  return (
    <div className="landing_container">
      <PublicHeader />
      <div className="landing_content-wrapper">
        <div className="landing_hero-container">
          <h2 className="landing_hero-title">
            CNNCT – Easy <br /> Scheduling Ahead
          </h2>
          <LinkButton redirectTo="../auth/sign-up" text="Join Now" />
          <div className="landing_hero-image">
            <img src={HERO_IMAGE} alt="hero-image" />
          </div>
          <div className="landing_hero-descrion">
            <h3 className="landing_heading">
              Simplified scheduling for you and your team
            </h3>
            <div className="landing_paragraph">
              CNNCT eliminates the back-and-forth of scheduling meetings so you
              can focus on what matters. Set your availability, share your link,
              and let others book time with you instantly.
            </div>
          </div>
        </div>

        <div className="landing_feature-container">
          <div className="landing_feature-wrapper feature-left">
            <h2 className="landing_sub-heading">
              Stay Organized with Your Calendar & Meetings
            </h2>
            <div className="landing_paragraph">
              Seamless Event Scheduling. Customize event types:
            </div>
            <ul className="landing_paragraph unordered-list">
              <li>
                View all your upcoming meetings and appointments in one place.
              </li>
              <li>
                Syncs with Google Calendar, Outlook, and iCloud to avoid
                conflicts
              </li>
              <li>one-on-ones, team meetings, group sessions, and webinars.</li>
            </ul>
          </div>
          <div className="image-container feature-right">
            <img src={FETURE_IMAGE_1} alt="Calendar 1" className="image-one" />
            <img src={FETURE_IMAGE_2} alt="Calendar 2" className="image-two" />
          </div>
        </div>
        <div className="landing_feature-container-2">
          <div className="landing_feature-wrapper">
            <h1 className="landing_heading fw-normal">
              Here's what our <span className="text-primary">customer</span>{" "}
              <br /> has to says
            </h1>
            <div>
              <Button type="button" variant="outline" className="w-auto">
                Read customer stories
              </Button>
            </div>
          </div>
          <div className="loarem_container">
            <img src={STAR_ICON} alt="star 1" width={25} height={25} />
            <div>
              [short description goes in here] lorem ipsum is a placeholder text
              to demonstrate.
            </div>
          </div>
        </div>
        <div className="landing_testimonial-container">
          {Testimonials?.map((review, index) => (
            <div
              key={review.id}
              className={`testimonial ${
                (index === 0 || index === 3) && "testimonial-left"
              }`}
            >
              <div className="testimonial-content">
                <div className="testimonial-title">{review.title}</div>
                <div className="testimonial-description">
                  {review.description}
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-image" />
                  <div>
                    <div className="testimonial-name">{review.name}</div>
                    <small className="testimonial-position">
                      {review.position}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="landing_integration-container">
          <h2 className="landing_heading">All Link Apps and Integrations</h2>
          <div className="landing_integration-wrapper">
            {INTEGRATIONS.map((integration) => (
              <div key={integration.id} className="integration-item">
                <div className="integration-image">
                  <integration.image />
                </div>
                <div className="integration-content">
                  <div className="integration-title">{integration.title}</div>
                  <small className="integration-description">
                    {integration.desciption}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <PublicFooter />
      </div>
    </div>
  )
}

export default LandingPage

const Testimonials = [
  {
    id: 1,
    title: "Amazing tool! Saved me months",
    description:
      "This is a placeholder for your testimonials and what your client has to say, put them here and make sure it's 100% true and meaningful.",
    name: "John Master",
    position: "Director, Spark.com",
  },
  {
    id: 2,
    title: "Game-changer for our business!",
    description:
      "We've streamlined our workflow and improved efficiency by 50%. Highly recommended for any growing business.",
    name: "Sarah Thompson",
    position: "CEO, GrowthTech",
  },
  {
    id: 3,
    title: "User-friendly and powerful",
    description:
      "I was amazed by how easy it was to get started. The features are intuitive, and the support team is top-notch.",
    name: "Michael Lee",
    position: "Product Manager, InnovateX",
  },
  {
    id: 4,
    title: "Exceeded our expectations!",
    description:
      "Not only did this tool meet our needs, but it also helped us uncover new opportunities. A must-have for any team.",
    name: "Emily Davis",
    position: "Marketing Lead, BrandBoost",
  },
] as const

const INTEGRATIONS = [
  {
    id: 1,
    title: "Audiomack",
    desciption: "Add an Audiomack player to your Linktree",
    image: AUDIO_ICON,
  },
  {
    id: 2,
    title: "Bandsintown",
    desciption: "Drive ticket sales by listing your events",
    image: BANDSINTOWN_ICON,
  },
  {
    id: 3,
    title: "Bonfire",
    desciption: "Display and sell your custom merch",
    image: BONFIRE_ICON,
  },
  {
    id: 4,
    title: "Books",
    desciption: "Promote books on your Linktree",
    image: BOOKS_ICON,
  },
  {
    id: 5,
    title: "Buy Me A Gift",
    desciption: "Let visitors support you with a small gift",
    image: GIFT_ICON,
  },
  {
    id: 6,
    title: "Cameo",
    desciption: "Make impossible fan connections possible",
    image: CAMEO_ICON,
  },
  {
    id: 7,
    title: "Clubhouse",
    desciption: "Let your community in on the conversation",
    image: CLUB_ICON,
  },
  {
    id: 8,
    title: "Community",
    desciption: "Build an SMS subscriber list",
    image: COMMUNITY_ICON,
  },
  {
    id: 9,
    title: "Contact Details",
    desciption: "Easily share downloadable contact details",
    image: CONTACT_ICON,
  },
]
