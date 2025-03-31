import { useParams } from "react-router-dom"
import EventForm from "../../components/event-form"
import Header from "../../components/header"

type Props = {
  editMode?: boolean
}

const EventFormPage = ({ editMode = false }: Props) => {
  const { id } = useParams()
  return (
    <>
      <Header
        title="Create Event"
        description="Create events to share for people to book on your calendar"
      />
      <div className="card">
        <div className="event-form-title">
          <div>{editMode ? "Edit Event Details" : "Create New Event"}</div>
        </div>
        <EventForm editMode={editMode} eventId={id ?? ""} />
      </div>
    </>
  )
}

export default EventFormPage
