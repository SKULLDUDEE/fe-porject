import { useEffect, useState } from "react"
import {
  TDays,
  TUserAvailability,
  useGetUserAvailabilityQuery,
  useUpdateUserAvailabilityMutation,
} from "../redux/slice/user-detail-slice"
import { showToast } from "../lib/utils"

const useAvailability = () => {
  const { data } = useGetUserAvailabilityQuery()
  const [updateAvailability, { isLoading }] =
    useUpdateUserAvailabilityMutation()
  const [availability, setAvailability] = useState<TUserAvailability>(
    {} as TUserAvailability
  )

  useEffect(() => {
    if (data) {
      setAvailability(data)
    }
  }, [data])

  const toggleDay = (day: TDays) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable,
        availability: [{ startTime: "", endTime: "", error: null }],
      },
    }))
  }

  const addTimeSlot = (day: TDays) => {
    setAvailability((prev) => {
      const prevAvailability = prev[day].availability ?? []
      if (!prev[day].isAvailable) {
        alert("Day is not available!")
        return prev
      }
      if (prevAvailability.length > 0) {
        const lastSlot = prevAvailability[prevAvailability.length - 1]
        if (!lastSlot.startTime || !lastSlot.endTime) {
          alert("Please fill the previous slot first!")
          return prev
        }
      }
      return {
        ...prev,
        [day]: {
          ...prev[day],
          availability: [
            ...prevAvailability,
            { startTime: "", endTime: "", error: null },
          ],
        },
      }
    })
  }

  const removeTimeSlot = (day: TDays, slotIndex: number) => {
    setAvailability((prev) => {
      const prevAvailability = prev[day].availability ?? []
      if (prevAvailability.length === 0) return prev

      const newAvailability = prevAvailability.filter(
        (_, index) => index !== slotIndex
      )

      return {
        ...prev,
        [day]: {
          ...prev[day],
          isAvailable: newAvailability.length > 0,
          availability: newAvailability.length > 0 ? newAvailability : [],
        },
      }
    })
  }

  const handleStartTime = (day: TDays, slotIndex: number, value: string) => {
    setAvailability((prev) => {
      return {
        ...prev,
        [day]: {
          ...prev[day],
          availability: prev[day].availability?.map((slot, index) => {
            if (index === slotIndex) {
              const prevSlot = prev[day].availability![slotIndex - 1]
              const isValid =
                slotIndex === 0 || (prevSlot && value > prevSlot.endTime)
              return {
                ...slot,
                startTime: value,
                error: isValid
                  ? null
                  : "Start time should be greater than previous end time!",
              }
            }
            return slot
          }),
        },
      }
    })
  }

  const handleEndTime = (day: TDays, slotIndex: number, value: string) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        availability: prev[day].availability?.map((slot, index) => {
          if (index === slotIndex) {
            const isValid = slot.startTime !== "" && slot.startTime < value
            return {
              ...slot,
              endTime: isValid ? value : "",
              error: isValid
                ? null
                : "End time should be greater than start time!",
            }
          }
          return slot
        }),
      },
    }))
  }

  const handleSubmit = async () => {
    try {
      await updateAvailability(availability).unwrap()
      showToast("Availability updated successfully", "success")
    } catch (error) {
      console.log("Error updating availability:", error)
    }
  }

  return {
    availability,
    toggleDay,
    addTimeSlot,
    removeTimeSlot,
    handleStartTime,
    handleEndTime,
    isLoading,
    handleSubmit,
  }
}

export default useAvailability
