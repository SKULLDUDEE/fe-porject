import { Outlet } from "react-router-dom"
import Aside from "../../components/aside"
import "../../components/css/layout.css"

const DashboardLayout = () => {
  return (
    <div className={`layout-wrapper`}>
      <aside className="aside-wrapper">
        <Aside />
      </aside>
      <main className="main-wrapper hidden-scrollbar">
        <Outlet />
        <div className="private-footer" />
      </main>
    </div>
  )
}

export default DashboardLayout
