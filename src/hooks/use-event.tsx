import { useState } from "react"
import { showToast } from "../lib/utils"
import {
  useDeleteEventMutation,
  useGetEventListQuery,
  useToggleEventStatusMutation,
} from "../redux/slice/event-slice"

const useEvent = () => {
  const [page, setPage] = useState(1)
  const [toggleEvent] = useToggleEventStatusMutation()
  const [deleteEvent] = useDeleteEventMutation()
  const [toggle, setToggle] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const { data: eventList, isLoading } = useGetEventListQuery({
    limit: 10,
    page: page,
  })

  // Handle Event Status Toggle
  const handleToggleEvent = async (id: string) => {
    try {
      await toggleEvent(id).unwrap()
    } catch (error) {
      console.log("Error toggling event:", error)
    }
  }

  // Handle Delete Event
  const handleDeleteEvent = async (id: string) => {
    try {
      await deleteEvent(id).unwrap()
      showToast("Event has deleted successfully", "success")
    } catch (error) {
      console.log("Error deleting event:", error)
    }
  }

  // Handle Copy Event ID
  const copyToClipboard = async (link: string) => {
    if (!link) return

    await navigator.clipboard.writeText(link)
    showToast("Event Link Copied to Clipboard", "success")
  }

  //  Handle Event Editing Toggle
  const handleEventEdit = async (id: string) => {
    setSelectedEvent(id)
    setToggle(!toggle)
  }

  return {
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
  }
}

export default useEvent
