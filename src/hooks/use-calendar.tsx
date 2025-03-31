import moment from "moment"
import { useEffect, useState } from "react"
import { Event, momentLocalizer, View } from "react-big-calendar"
import SEARCH_ICON from "../assets/search.svg"
import Button from "../components/button"
import {
  TCalendarEventList,
  useGetEventListForCalendarQuery,
} from "../redux/slice/event-slice"

const localizer = momentLocalizer(moment)
type TEvent = TCalendarEventList & Event

const useCalendar = () => {
  const { data: bookingList } = useGetEventListForCalendarQuery()
  const [events, setEvents] = useState<TEvent[]>([])
  const [currentView, setCurrentView] = useState<View>("month")
  const [currentDate, setCurrentDate] = useState<Date>(new Date())


  useEffect(() => {
    if (bookingList) {
      const fitleredList = bookingList?.map((event) => {
        return {
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          status: event.status,
        }
      })
      setEvents(fitleredList)
    }
  }, [bookingList])

  const CustomToolbar = () => (
    <div className="calendar-toolbar">
      {/* Navigation Buttons */}
      <div className="calendar_navigation-wrapper">
        <Button
          size="sm"
          color="secondary"
          onClick={() => {
            setCurrentDate((prev) => moment(prev).subtract(1, "day").toDate())
          }}
        >
          {"<"}
        </Button>
        <Button
          size="sm"
          color="secondary"
          onClick={() => setCurrentDate(new Date())}
        >
          Today
        </Button>
        <Button
          size="sm"
          color="secondary"
          onClick={() =>
            setCurrentDate((prev) => moment(prev).add(1, "days").toDate())
          }
        >
          {">"}
        </Button>
        <span className="calendar_current-date">
          {currentDate.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>

      <div className="calendar_view-options">
        {["day", "week", "month", "agenda"].map((v) => (
          <div
            key={v}
            className={`view-option ${currentView === v && "active-view"}`}
            onClick={() => setCurrentView(v as View)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </div>
        ))}
      </div>

      <span className="calendar_search-label">
        <img src={SEARCH_ICON} alt="Search Icon" width={15} height={15} />
        <input
          type="text"
          placeholder="Search"
          className="calendar_search-input"
        />
      </span>
    </div>
  )

  const CustomEvent = ({ event }: { event: TEvent }) => {
    return (
      <div
        className={`custom-event ${
          event.status === "rejected" && "rejected-event-class"
        }`}
      >
        <span className="event-time">
          {moment(event.start).format("h:mm A")}
        </span>
        <span className="calender_event-title">{event.title}</span>
      </div>
    )
  }

  return {
    events,
    localizer,
    CustomToolbar,
    currentView,
    currentDate,
    CustomEvent,
  }
}

export default useCalendar
