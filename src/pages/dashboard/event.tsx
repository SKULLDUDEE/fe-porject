import { useNavigate } from "react-router-dom"
import EventCard, { EventCardSkeleton } from "../../components/event-card"
import Header from "../../components/header"
import useEvent from "../../hooks/use-event"
import Modal from "../../components/dialog"
import EventForm from "../../components/event-form"
import Button from "../../components/button"

const EventPage = () => {
  const navigate = useNavigate()
  const {
    eventList,
    isLoading,
    handleToggleEvent,
    handleDeleteEvent,
    copyToClipboard,
    toggle,
    setToggle,
    handleEventEdit,
    selectedEvent,
    page,
    setPage,
  } = useEvent()
  return (
    <>
      <Header
        title="Event Types"
        description="Create events to share for people to book on your calendar."
        button={{
          title: "Add New Event",
          handleClick: () => navigate("./form"),
        }}
      />
      <div className="event-card-wrapper">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <EventCardSkeleton key={i} />)
        ) : (
          <>
            {eventList && eventList.events.length > 0 ? (
              eventList.events?.map((event) => (
                <EventCard
                  event={event}
                  key={event.eventID}
                  handleToggle={(id: string) => handleToggleEvent(id)}
                  handleDelete={(id: string) => handleDeleteEvent(id)}
                  handleCopy={(id: string) => copyToClipboard(id)}
                  handleEdit={(id: string) => handleEventEdit(id)}
                />
              ))
            ) : (
              <div>No events found...</div>
            )}
          </>
        )}
      </div>
      <div className="pagination-wrapper">
        <Button
          size="sm"
          color="primary"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {eventList?.totalPages}
        </span>
        <Button
          size="sm"
          color="primary"
          disabled={page === eventList?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
      <Modal
        open={toggle}
        onClose={() => setToggle(false)}
        size="large"
        title="Edit Event"
      >
        <EventForm
          editMode={true}
          eventId={selectedEvent ?? ""}
          handleEditCancellation={() => setToggle(false)}
        />
      </Modal>
    </>
  )
}

export default EventPage
