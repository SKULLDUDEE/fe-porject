import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FormGeneratorProps } from "../components/form-generator"
import { showToast } from "../lib/utils"
import {
  TEventForm,
  useAddEventMutation,
  useGetEventDetailByIdQuery,
  useGetParticipantsQuery,
  useUpdateEventMutation,
} from "../redux/slice/event-slice"
import { RootState } from "../redux/store"

type Props = {
  editMode?: boolean
  eventId?: string
}

type TEventErrorType = Record<"partA" | "partB", Record<string, string>>

const initialErrors: TEventErrorType = {
  partA: {
    topic: "Topic is required",
    date: "Date is required",
    time: "Time is required",
    timeZone: "Time Zone is required",
    duration: "Duration is required",
  },
  partB: {
    eventLink: "Event Link is required",
    participants: "Participants is required",
  },
}

const initialData: TEventForm = {
  id: "",
  topic: "",
  password: "",
  hostName: "",
  description: "",
  date: "",
  time: "",
  timeZone: "",
  duration: "",
  bannerImg: "",
  color: "",
  eventLink: "",
  participants: [],
}

const useEventForm = ({ editMode = false, eventId = "" }: Props) => {
  const navigate = useNavigate()
  const { user } = useSelector((state: RootState) => state.user)
  const { data: participants } = useGetParticipantsQuery()
  const { data: eventDetails } = useGetEventDetailByIdQuery(eventId, {
    skip: !eventId,
  })
  const [addEvent, { isLoading }] = useAddEventMutation()
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation()
  const [toggleScreen, setToggleScreen] = useState(true)
  const [formData, setFormData] = useState<TEventForm>(initialData)
  const [participantList, setParticipantList] = useState(participants ?? [])
  const [formErrors, setFormErrors] = useState<TEventErrorType>(initialErrors)

  // Redirect to Events Page if Edit Mode and Event ID is not provided
  useEffect(() => {
    if (editMode && eventId === "") navigate("/dashboard/events")
  }, [editMode, eventId, navigate])

  // Set the initial state based on the event details and update the form errors state
  useEffect(() => {
    if (eventDetails) {
      setFormData(eventDetails)

      // Remove Error if the form is edited
      setFormErrors((prev) => {
        const tempPartA = { ...prev.partA }
        const tempPartB = { ...prev.partB }

        if (eventDetails.topic) delete tempPartA.topic
        if (eventDetails.date) delete tempPartA.date
        if (eventDetails.time) delete tempPartA.time
        if (eventDetails.timeZone) delete tempPartA.timeZone
        if (eventDetails.duration) delete tempPartA.duration
        if (eventDetails.eventLink) delete tempPartB.eventLink
        if (eventDetails.participants) delete tempPartB.participants

        return {
          ...prev,
          partA: tempPartA,
          partB: tempPartB,
        }
      })
    }
  }, [eventDetails])

  // Set the initial state based on the participants list
  useEffect(() => {
    if (Array.isArray(participants) && participants.length > 0)
      setParticipantList(participants)
  }, [participants])

  // Handle Form Values and Errors
  const handleUpdate = (
    part: "partA" | "partB",
    name: string,
    value: string | boolean | string[] | null,
    error?: string | null
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Store error only if it exists, otherwise remove it
    setFormErrors((prev) => {
      const updatedErrors = { ...prev }
      const updatedPartErrors = { ...prev[part] }

      if (error) updatedPartErrors[name] = error
      else delete updatedPartErrors[name]

      updatedErrors[part] = updatedPartErrors
      return updatedErrors
    })
  }

  // Form Elements for Event Form (using Dynamic Form Generator)
  const EVENT_FORM_ELEMENTS: Omit<FormGeneratorProps, "onUpdate">[] = [
    {
      inputType: "input",
      type: "text",
      label: "Event Topic",
      placeholder: "Set a conference topic before it starts",
      name: "topic",
      error: formErrors.partA.topic,
      defaultValue: eventDetails?.topic,
      className: "custom-form-input-classes",
      hasRequiredMark: true,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 100,
      },
    },
    {
      inputType: "input",
      type: "text",
      label: "Password",
      placeholder: "Password",
      name: "password",
      error: formErrors.partA.password,
      defaultValue: eventDetails?.password,
      className: "custom-form-input-classes",
      hasRequiredMark: true,
      validation: {
        required: false,
      },
    },
    {
      inputType: "input",
      type: "text",
      label: "Host name",
      placeholder: "Host name",
      name: "hostName",
      error: formErrors.partA.hostName,
      className: "custom-form-input-classes",
      hasRequiredMark: true,
      defaultValue: user?.name ?? "Unknown User",
      disabled: true,
      validation: { required: true },
    },
    {
      inputType: "textarea",
      label: "Description",
      placeholder: "Enter event description",
      name: "description",
      error: formErrors.partA.description,
      defaultValue: eventDetails?.description,
      className: "custom-form-input-classes",
      hasRequiredMark: true,
      validation: { required: false },
    },
  ] as const

  const EVENT_FORM_PART2_ELEMENTS: Omit<FormGeneratorProps, "onUpdate">[] = [
    {
      inputType: "file",
      type: "file",
      label: "Banner",
      placeholder: "Event Banner",
      name: "bannerImg",
      error: "",
      defaultValue: eventDetails?.bannerImg,
    },
    {
      inputType: "color",
      label: "Custom Background Color",
      placeholder: "Write HEX color code",
      name: "color",
      error: "",
      defaultValue: eventDetails?.color ?? "#000000",
    },
    {
      inputType: "input",
      type: "link",
      label: "Add Link",
      placeholder: "Enter URL here",
      name: "eventLink",
      error: formErrors.partB.eventLink,
      className: "custom-form-input-classes",
      defaultValue: eventDetails?.eventLink,
      hasRequiredMark: true,
      validation: {
        required: true,
        pattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z]{2,})(\/[\w.-]*)*\/?$/,
        errorMessage: "Invalid URL",
      },
    },
    {
      inputType: "custom-email-input",
      label: "Add Emails",
      placeholder: "Add members email",
      name: "participants",
      error: formErrors.partB.participants,
      defaultValue: eventDetails?.participants,
      className: "custom-form-input-classes",
      hasRequiredMark: true,
      validation: {
        required: true,
      },
      options: participantList,
    },
  ] as const

  // Update the Toogle Screen State
  const handleToggle = () => {
    setToggleScreen(!toggleScreen)
  }

  // Update the Toogle Screen State
  const handleCancellation = () => {
    navigate("/dashboard/events")
  }

  //   Submit the Event Form using RTK Query
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      // Check if any errors exist
      const hasErrors = Object.values(formErrors).some(
        (partErrors) => Object.keys(partErrors).length > 0
      )

      if (hasErrors) {
        showToast("Form has errors", "error")
        console.log("Form has errors:", formErrors)
        return
      }

      if (editMode && eventId) {
        await updateEvent(formData).unwrap()
      } else {
        await addEvent(formData).unwrap()
      }
      navigate(`../`)
      showToast(
        `Event ${editMode ? "updated" : "added"} successfully`,
        "success"
      )
    } catch (error) {
      console.log("Something went wrong", error)
    }
  }

  return {
    toggleScreen,
    setToggleScreen,
    formData,
    formErrors,
    EVENT_FORM_ELEMENTS,
    EVENT_FORM_PART2_ELEMENTS,
    handleSubmit,
    handleUpdate,
    handleToggle,
    handleCancellation,
    isLoading,
    isUpdating,
  }
}

export default useEventForm
