import { Link } from "react-router-dom"
import LOGO from "../assets/logo.svg"
import "./css/logo-wrapper.css"

const LogoWrapper = () => {
  return (
    <Link to={"/"} className="logo-link">
      <div className="logo-wrapper">
        <img src={LOGO} alt="CNNCT" width={25} />
        <span>CNNCT</span>
      </div>
    </Link>
  )
}

export default LogoWrapper
