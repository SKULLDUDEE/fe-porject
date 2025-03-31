import { Calendar } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import useCalendar from "../hooks/use-calendar"
import CommonHeader from "./common-header"
import "./css/calendar.css"

const EventCalendar = () => {
  const {
    events,
    localizer,
    CustomToolbar,
    currentView,
    currentDate,
    CustomEvent,
  } = useCalendar()
  return (
    <div className="card calendar_wrapper">
      {/* Common Header for the Calendar */}
      <CommonHeader />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={currentView}
        date={currentDate}
        style={{ height: 600 }}
        eventPropGetter={() => {
          return {
            className: "parent-custom-event",
          }
        }}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
      />
    </div>
  )
}

export default EventCalendar
