import Header from "../../components/header"
import AVAILABILITYICON from "../../assets/availability_tab.svg"
import CALENDARICON from "../../assets/calendar_tab.svg"
import { useState } from "react"
import AvailabilityForm from "../../components/availability-form"
import EventCalender from "../../components/calender"

const AvailabilityPageTabs = [
  {
    title: "Availability",
    slug: "availability",
    icon: AVAILABILITYICON,
  },
  {
    title: "Calendar",
    slug: "calendar",
    icon: CALENDARICON,
  },
]

const AvailabilityPage = () => {
  const [activeTab, setActiveTab] = useState(AvailabilityPageTabs[0].slug)

  const handleActiveTab = (slug: string) => {
    setActiveTab(slug)
  }
  return (
    <>
      <Header
        title="Availability"
        description="Configure times when you are available for bookings"
      />
      {/* Tabs */}
      <div className="tab-wrapper">
        {AvailabilityPageTabs.map((tab) => (
          <div
            key={tab.slug}
            className={`tab-link-item ${
              tab.slug === activeTab && "active-item"
            }`}
            onClick={() => handleActiveTab(tab.slug)}
          >
            <img src={tab.icon} alt={tab.title} width={15} height={15} />
            {tab.title}
          </div>
        ))}
      </div>

      <div className="my-2">
        {activeTab === AvailabilityPageTabs[0].slug ? (
          <AvailabilityForm />
        ) : (
          <EventCalender />
        )}
      </div>
    </>
  )
}

export default AvailabilityPage
