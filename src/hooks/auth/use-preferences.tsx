import { FormEvent, useState } from "react"
import CONSULTINGICN from "../../assets/consulting.svg"
import EDUCATIONICN from "../../assets/education.png"
import FINANCEICN from "../../assets/finance.svg"
import MARKETINGICN from "../../assets/marketing.svg"
import GOVERNMENTICN from "../../assets/politics.png"
import RECRUITINGICN from "../../assets/recruiting.svg"
import SALESICN from "../../assets/sales.png"
import TECHICN from "../../assets/tech.png"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { setupPreferences } from "../../redux/slice/user-slice"
import { showToast } from "../../lib/utils"
import { useNavigate } from "react-router-dom"

type TPreferencesForm = {
  userName: string
  prefList: string[]
}

const prefList = [
  {
    id: 1,
    name: "Sales",
    icon: SALESICN,
  },
  {
    id: 2,
    name: "Education",
    icon: EDUCATIONICN,
  },
  {
    id: 3,
    name: "Finance",
    icon: FINANCEICN,
  },
  {
    id: 4,
    name: "Government & Politics",
    icon: GOVERNMENTICN,
  },
  {
    id: 5,
    name: "Consulting",
    icon: CONSULTINGICN,
  },
  {
    id: 6,
    name: "Recruiting",
    icon: RECRUITINGICN,
  },
  {
    id: 7,
    name: "Tech",
    icon: TECHICN,
  },
  {
    id: 8,
    name: "Marketing",
    icon: MARKETINGICN,
  },
] as const

const usePreferences = () => {
  const navigate = useNavigate()

  // Dispatch Function to dispatch the preferences
  const dispatch = useDispatch<AppDispatch>()

  // Default Form Data
  const [formData, setFormData] = useState<TPreferencesForm>(
    {} as TPreferencesForm
  )

  // Form Errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({
    userName: "User Name is required",
    prefList: "Select atleast one preference",
  })

  const handleUpdate = (
    name: string,
    value: string | boolean | string[] | null,
    error: string | null
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Store error only if it exists, otherwise remove it
    setFormErrors((prev) => {
      const updatedErrors = { ...prev }
      if (error) updatedErrors[name] = error
      else delete updatedErrors[name]
      return updatedErrors
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      if (Object.keys(formErrors).length > 0) {
        console.log("Form has errors:", formErrors)
        return
      }

      // Dispatch the preferences BE request using RTK Query
      await dispatch(
        setupPreferences({
          userName: formData.userName,
          preferences: formData.prefList,
        })
      )
      showToast("Preferences updated successfully", "success")
      navigate("/dashboard")
    } catch (error) {
      console.log("Encountered Error", error)
    }
  }

  const handlePreference = (name: string) => {
    setFormData((prev) => {
      const tempPrefList = [...(prev?.prefList ?? [])]
      const index = tempPrefList.indexOf(name)

      // Add or remove the preference from the list
      if (index === -1) tempPrefList.push(name)
      else tempPrefList.splice(index, 1)

      // Validate immediately and update formErrors
      setFormErrors((prevErrors) => {
        if (tempPrefList.length === 0) {
          return { ...prevErrors, prefList: "Select at least one preference" }
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { prefList, ...rest } = prevErrors
          return rest
        }
      })

      return { ...prev, prefList: tempPrefList }
    })
  }

  return {
    handleUpdate,
    formData,
    formErrors,
    handleSubmit,
    prefList,
    handlePreference,
  }
}

export default usePreferences
