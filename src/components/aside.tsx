import clsx from "clsx"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import AVAILABILITYICON from "../assets/availability.svg?react"
import BOOKINGICON from "../assets/booking.svg?react"
import EVENTICON from "../assets/event.svg?react"
import PLUSICON from "../assets/plus.svg?react"
import SETTINGSICON from "../assets/settings.svg?react"
import SIGNOUTICON from "../assets/sign-out.svg"
import USERICON from "../assets/user.png"
import { logoutUser } from "../redux/slice/user-slice"
import { AppDispatch, RootState } from "../redux/store"
import Button from "./button"
import "./css/aside.css"
import LogoWrapper from "./logo-wrapper"

const ASIDE_LIST = [
  {
    id: 1,
    title: "Events",
    navigationURL: "events",
    icon: EVENTICON,
    isButton: false,
  },
  {
    id: 2,
    title: "Bookings",
    navigationURL: "booking",
    icon: BOOKINGICON,
    isButton: false,
  },
  {
    id: 3,
    title: "Availabilities",
    navigationURL: "availability",
    icon: AVAILABILITYICON,
    isButton: false,
  },
  {
    id: 4,
    title: "Setting's",
    navigationURL: "settings",
    icon: SETTINGSICON,
    isButton: false,
  },
  {
    id: 5,
    title: "Create Event",
    navigationURL: "events/form",
    icon: PLUSICON,
    isButton: true,
  },
] as const

const Aside = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Set the initial state based on the window width
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    setIsMobile(mediaQuery.matches)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Handle User Logout Dispatch Function
  const handleDelete = useCallback(() => {
    dispatch(logoutUser())
  }, [])

  if (isMobile) {
    return (
      <>
        {/* Mobile Header (Fixed at Top) */}
        <div className="mobile-header">
          <LogoWrapper />
          <div className="user-wrapper">
            <div className="mobile-user">
              <img src={USERICON} alt="User" width={35} />
            </div>
            <div className="user-popup-content" onClick={handleDelete}>
              <img src={SIGNOUTICON} alt="sign-out" width={15} />
              Signout
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Fixed at Bottom) */}
        <div className="mobile-bottom-nav">
          {ASIDE_LIST.slice(0, 4).map((item) => (
            <NavLink
              key={item.id}
              to={`./${item.navigationURL}`}
              className={({ isActive }) =>
                clsx("mobile-nav-link", { "active-link": isActive })
              }
              end
            >
              <item.icon className="nav-icon" width={15} height={15} />
              <span className="nav-title">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="aside-header">
        <LogoWrapper />

        {/* Navigation */}
        <nav className="navigation-wrapper">
          {ASIDE_LIST.map((item) => (
            <NavLink
              key={item.id}
              to={`./${item.navigationURL}`}
              className={({ isActive }) =>
                clsx({
                  "nav-link": !item.isButton,
                  "active-link": isActive && !item.isButton,
                  "btn-link-wrapper": item.isButton,
                })
              }
              end
            >
              {({ isActive }) =>
                item.isButton ? (
                  <Button
                    size="sm"
                    variant={isActive ? "default" : "outline"}
                    className="btn-link"
                  >
                    <item.icon
                      width={12}
                      className={`${isActive ? "active-btn-icon" : "nav-icon"}`}
                    />
                    {item.title}
                  </Button>
                ) : (
                  <>
                    <item.icon width={18} className="nav-icon" />
                    <div className="nav-title">{item.title}</div>
                  </>
                )
              }
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="aside-footer">
        <div className="user-popup-trigger">
          <div className="img-wrapper">
            <img src={USERICON} alt="user" width={25} />
          </div>
          {user?.name ?? "User Name"}
        </div>

        <div className="user-popup-content" onClick={handleDelete}>
          <img src={SIGNOUTICON} alt="sign-out" />
          Sign Out
        </div>
      </div>
    </>
  )
}

export default Aside
