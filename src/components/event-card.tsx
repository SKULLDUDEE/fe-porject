import CONFLICTICON from "../assets/conflict.svg?react"
import COPYICON from "../assets/copy.svg?react"
import DELETEICON from "../assets/delete.svg?react"
import EDITICON from "../assets/edit.svg?react"
import { TEventList } from "../redux/slice/event-slice"
import "./css/event.css"

type EventCardProps = {
  event: TEventList
  handleToggle: (id: string) => void
  handleDelete: (id: string) => void
  handleCopy: (id: string) => void
  handleEdit: (id: string) => void
}

const EventCard = ({
  event,
  handleToggle,
  handleDelete,
  handleCopy,
  handleEdit,
}: EventCardProps) => {
  return (
    <div className="event-card">
      <div
        className={`event-header ${event.isActive ? "bg-primary" : "bg-dark"} `}
      />
      <div className="event-content">
        {event.hasConflict && (
          <div className="event-conflict">
            <CONFLICTICON width={15} height={15} />
            <span className="event-text conflict-text">Conflict of timing</span>
          </div>
        )}
        <div className="event-header-wrapper">
          <h2 className="event-title">{event.eventTitle}</h2>
          <span className="event-btn" onClick={() => handleEdit(event.eventID)}>
            <EDITICON width={15} height={15} />
          </span>
        </div>
        <div className="event-content-wrapper">
          <div className="event-text">
            {new Date(event.eventDate).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </div>
          <div className="event-text event-time">
            {event.eventStTime} – {event.eventEdTime}
          </div>
          <div className="event-text mt-2">
            {event.eventDuration}, Group Meeting
          </div>
        </div>
      </div>
      <div className="event-footer">
        <label className="toggle-switch">
          <input
            title="Toggle Event"
            type="checkbox"
            checked={event.isActive}
            onChange={() => handleToggle(event.eventID)}
          />
          <span className="slider"></span>
        </label>
        <span className="event-btn" onClick={() => handleCopy(event.eventLink)}>
          <COPYICON width={15} height={15} />
        </span>
        <span className="event-btn" onClick={() => handleDelete(event.eventID)}>
          <DELETEICON width={15} height={15} />
        </span>
      </div>
    </div>
  )
}

export default EventCard

export const EventCardSkeleton = () => {
  return (
    <div className="event-card skeleton">
      <div className="event-header skeleton-box"></div>
      <div className="event-content">
        <div className="skeleton-box skeleton-title"></div>
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-time"></div>
        <div className="skeleton-box skeleton-desc"></div>
      </div>
      <div className="event-footer">
        <div className="skeleton-box skeleton-toggle"></div>
        <div className="skeleton-box skeleton-button"></div>
        <div className="skeleton-box skeleton-button"></div>
      </div>
    </div>
  )
}
