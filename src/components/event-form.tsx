import { getTimeZones } from "@vvo/tzdb"
import useEventForm from "../hooks/use-event-form"
import Button from "./button"
import FormGenerator from "./form-generator"

type Props = {
  editMode?: boolean
  eventId?: string
  handleEditCancellation?: () => void
}

const EventForm = ({
  editMode = false,
  handleEditCancellation,
  eventId = "",
}: Props) => {
  const {
    toggleScreen,
    formData,
    EVENT_FORM_ELEMENTS,
    handleSubmit,
    handleUpdate,
    formErrors,
    handleCancellation,
    handleToggle,
    isUpdating,
    isLoading,
    EVENT_FORM_PART2_ELEMENTS,
  } = useEventForm({ editMode, eventId })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="event-form-wrapper">
          {/* Form Part A */}
          {toggleScreen ? (
            <>
              {EVENT_FORM_ELEMENTS?.map((item) => (
                <FormGenerator
                  key={item.name}
                  inputType={item.inputType}
                  type={item.type}
                  label={item.label}
                  options={item.options}
                  className={item.className}
                  hasRequiredMark={item.hasRequiredMark}
                  disabled={item.disabled}
                  defaultValue={item.defaultValue}
                  checkboxLabel={item.checkboxLabel}
                  placeholder={item.placeholder}
                  name={item.name}
                  onUpdate={(name, value, error) =>
                    handleUpdate("partA", name, value, error)
                  }
                  error={item.error}
                  validation={item.validation}
                />
              ))}

              <div>
                <label className="form-group custom-form-input-classes">
                  <span className="form-label">
                    Date and time
                    <span className="text-danger ps-2">*</span>
                  </span>

                  <div className="day-input-wrapper">
                    <input
                      type="date"
                      value={formData.date}
                      className="form-input"
                      onChange={(e) =>
                        handleUpdate("partA", "date", e.target.value, null)
                      }
                    />

                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        handleUpdate("partA", "time", e.target.value, null)
                      }
                      className="form-input"
                    />
                    <select
                      name={"timeZone"}
                      value={formData.timeZone}
                      onChange={(e) =>
                        handleUpdate("partA", "timeZone", e.target.value, null)
                      }
                      className={`form-input time-zone-class`}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {getTimeZones()?.map((zone) => (
                        <option value={zone.currentTimeFormat} key={zone.name}>
                          (UTC {zone.currentTimeFormat})
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>

              <FormGenerator
                inputType={"select"}
                label={"Set duration"}
                options={[
                  { id: "1", label: "30 minutes", value: "30m" },
                  { id: "3", label: "1 hour", value: "1hr" },
                  { id: "2", label: "2 hours", value: "2hr" },
                ]}
                className={"custom-form-input-classes"}
                name={"duration"}
                defaultValue={formData.duration}
                hasRequiredMark={true}
                onUpdate={(name, value, error) =>
                  handleUpdate("partA", name, value, error)
                }
                error={formErrors.partA.duration}
                validation={{
                  required: true,
                }}
              />

              <div className="d-flex justify-content-end gap-2 my-2">
                <Button
                  type="button"
                  onClick={() =>
                    editMode
                      ? handleEditCancellation && handleEditCancellation()
                      : handleCancellation()
                  }
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  color="primary"
                  disabled={Object.keys(formErrors.partA).length > 0}
                  onClick={handleToggle}
                >
                  Save
                </Button>{" "}
              </div>
            </>
          ) : (
            // Form Part B
            <div>
              {EVENT_FORM_PART2_ELEMENTS?.map((item) => (
                <FormGenerator
                  key={item.name}
                  inputType={item.inputType}
                  type={item.type}
                  label={item.label}
                  options={item.options}
                  className={item.className}
                  hasRequiredMark={item.hasRequiredMark}
                  disabled={item.disabled}
                  defaultValue={item.defaultValue}
                  checkboxLabel={item.checkboxLabel}
                  placeholder={item.placeholder}
                  name={item.name}
                  onUpdate={(name, value, error) =>
                    handleUpdate("partB", name, value, error)
                  }
                  error={item.error}
                  validation={item.validation}
                />
              ))}
              <div className="d-flex justify-content-end gap-2 my-2">
                <Button
                  type="button"
                  onClick={() =>
                    editMode
                      ? handleEditCancellation && handleEditCancellation()
                      : handleCancellation()
                  }
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  size="md"
                  isLoading={isUpdating || isLoading}
                  disabled={Object.keys(formErrors.partB).length > 0}
                >
                  {editMode ? "Update" : "Create"} Event
                </Button>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  )
}

export default EventForm
