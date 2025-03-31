import REJECT_ICON from "../../assets/block_icon.svg"
import CHECK_ICON from "../../assets/check_icon.svg"
import DELETE_ICON from "../../assets/delete.svg"
import USER_ICON from "../../assets/user.png"
import USERS_ICON from "../../assets/users.svg"
import Button from "../../components/button"
import "../../components/css/booking.css"
import Header from "../../components/header"
import useBooking from "../../hooks/use-booking"

const BookingPage = () => {
  const {
    navTabList,
    activeTab,
    handleActiveTab,
    bookingList,
    isLoading,
    participantsContainerRef,
    handleParticipantsClick,
    handleBookingStatus,
    openParticipantsFor,
    isDataLoading,
  } = useBooking()
  return (
    <>
      <Header
        title="Bookings"
        description="See upcoming and past events booked through your event type links."
      />
      <div className="card">
        <div className="nav-tab-wrapper">
          {navTabList.map((tab) => (
            <div
              key={tab.id}
              className={`tab-link ${
                tab.slug === activeTab && "active-tab-link"
              }`}
              onClick={() => handleActiveTab(tab.slug)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="booking-list-wrappper">
          {isDataLoading ? (
            <div>Loading ...</div>
          ) : bookingList && bookingList.length > 0 ? (
            bookingList?.map((item) => (
              <div className="booking-wrapper" key={item.id}>
                <div className="booking_date-wrappper">
                  <div className="booking_date">
                    {new Date(item.eventDate).toLocaleDateString("en-GB", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="booking_time">
                    {item.eventStTime} - {item.eventEdTime}
                  </div>
                </div>
                <div className="booking_content">
                  <div className="booking_title">{item.eventTitle}</div>
                  <small>
                    You{" "}
                    {item.participants?.length >= 2
                      ? `and ${item.participants.length} others`
                      : item.participants?.length > 1 &&
                        `and ${item.participants[0].name}`}
                  </small>
                </div>
                <div className="booking_action" ref={participantsContainerRef}>
                  <div>
                    {item.status === "accepted" ? (
                      <div className="booking_action-btn">Accepted</div>
                    ) : item.status === "rejected" ? (
                      <div className="booking_action-btn rejected_btn">
                        Rejected
                      </div>
                    ) : (
                      <div className="booking_action-btn-wrapper">
                        <Button
                          type="button"
                          size="sm"
                          color="success"
                          isLoading={isLoading}
                          icon={CHECK_ICON}
                          onClick={() =>
                            handleBookingStatus(item.id, "accepted")
                          }
                        >
                          <span className="btn-text">Accept</span>
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          color="danger"
                          isLoading={isLoading}
                          icon={REJECT_ICON}
                          onClick={() =>
                            handleBookingStatus(item.id, "rejected")
                          }
                        >
                          <span className="btn-text">Reject</span>
                        </Button>
                      </div>
                    )}
                  </div>
                  <div
                    className="booking_action-item"
                    onClick={() => handleParticipantsClick(item.id)}
                  >
                    <img
                      src={USERS_ICON}
                      alt="User Icon"
                      width={15}
                      height={15}
                    />
                    {item.participants.length}
                    <span className="hidden-item">
                      {item.participants?.length > 1 ? " peoples" : " people"}
                    </span>

                    <div className="hoverable-item">
                      Click to see participants list
                    </div>
                  </div>

                  {/* Participants List Only opens for the selected booking */}
                  {openParticipantsFor === item.id && (
                    <div className="booking_participants-list">
                      <div className="booking_participants-list-header">
                        <div>Participants ({item.participants.length})</div>
                        {item.status === "pending" ? (
                          <div className="booking_action-btn-wrapper">
                            <Button
                              type="button"
                              size="sm"
                              color="success"
                              isLoading={isLoading}
                              icon={CHECK_ICON}
                              onClick={() =>
                                handleBookingStatus(item.id, "accepted")
                              }
                            >
                              <span className="btn-text">Accept</span>
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              color="danger"
                              isLoading={isLoading}
                              icon={REJECT_ICON}
                              onClick={() =>
                                handleBookingStatus(item.id, "rejected")
                              }
                            >
                              <span className="btn-text">Reject</span>
                            </Button>
                          </div>
                        ) : (
                          <span>
                            <img
                              src={DELETE_ICON}
                              alt="Delete Icon"
                              width={15}
                              height={15}
                            />
                          </span>
                        )}
                      </div>
                      <div className="booking_participants-content">
                        {item.participants?.map((participant) => (
                          <div className="booking_participants-item">
                            <div className="booking_participants-item-name">
                              <img
                                src={
                                  participant.image !== ""
                                    ? participant.image
                                    : USER_ICON
                                }
                                alt="User Icon"
                                width={25}
                                height={25}
                              />
                              {participant.name}
                            </div>
                            <div className="booking_participants-item-status">
                              <input
                                type="checkbox"
                                title="user_input"
                                checked={participant.hasAccepted}
                                disabled
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No bookings found!</div>
          )}
        </div>
      </div>
    </>
  )
}

export default BookingPage
