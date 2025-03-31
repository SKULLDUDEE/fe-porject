import React from "react"
import ADDICON from "../assets/add.svg?react"
import COPYICON from "../assets/carbon_copy.svg?react"
import CROSSICON from "../assets/cross.svg?react"
import useAvailability from "../hooks/use-availability"
import { TDays } from "../redux/slice/user-detail-slice"
import Button from "./button"
import "./css/availability.css"
import CommonHeader from "./common-header"

const AvailabilityForm = () => {
  const {
    addTimeSlot,
    removeTimeSlot,
    toggleDay,
    availability,
    handleStartTime,
    handleEndTime,
    handleSubmit,
    isLoading,
  } = useAvailability()
  return (
    <div className="card availabilit-card">
      <CommonHeader />
      <div className="availability-content">
        <div>Weekly hours schedule</div>
        {/* Set the Availability Dyanmic Form */}
        <div className="availability-selector">
          {Object.entries(availability).map(([day, data]) => (
            <div key={day} className="day-row">
              <div className="day-selector">
                <input
                  type="checkbox"
                  title="Toggle Day"
                  checked={data.isAvailable}
                  onChange={() => toggleDay(day as TDays)}
                />
                <span>{day}</span>
              </div>
              {!data.isAvailable ? (
                <span className="unavailable-text">Unavailable</span>
              ) : (
                <div className="time-slots">
                  {data.isAvailable &&
                    data.availability?.map((slot, index) => (
                      <React.Fragment key={index}>
                        <div className="time-slot">
                          <input
                            title="start_time"
                            type="time"
                            value={slot.startTime}
                            className={`form-input ${
                              slot.error ? "input-error" : ""
                            }`}
                            onChange={(e) =>
                              handleStartTime(
                                day as TDays,
                                index,
                                e.target.value
                              )
                            }
                            step="60"
                          />
                          <span>-</span>
                          <input
                            title="end_time"
                            type="time"
                            value={slot.endTime}
                            className={`form-input ${
                              slot.error ? "input-error" : ""
                            }`}
                            step="60"
                            onChange={(e) =>
                              handleEndTime(day as TDays, index, e.target.value)
                            }
                          />
                          <span
                            onClick={() => removeTimeSlot(day as TDays, index)}
                          >
                            <CROSSICON
                              className="avail-btn"
                              width={10}
                              height={10}
                            />
                          </span>
                        </div>
                        {slot.error && (
                          <small className="text-danger text-center">
                            {slot.error}
                          </small>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              )}
              <div className="actions">
                <span onClick={() => addTimeSlot(day as TDays)}>
                  <ADDICON className="avail-btn" width={10} height={10} />
                </span>
                <span onClick={() => addTimeSlot(day as TDays)}>
                  <COPYICON className="avail-btn" width={10} height={10} />
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          size="md"
          className="availability-save-btn"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={Object.values(availability).some(
            (day) =>
              day.isAvailable &&
              day.availability?.some(
                (slot) => !slot.startTime || !slot.endTime || slot.error
              )
          )}
        >
          Save Slots
        </Button>
      </div>
    </div>
  )
}

export default AvailabilityForm
