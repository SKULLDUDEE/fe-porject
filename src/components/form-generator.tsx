import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useUploadImageMutation } from "../redux/slice/img-upload-slice"

type TOption = {
  id: string
  value: string
  label: string
}

export type ValidationRules = {
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: RegExp
  validate?: (value: string | boolean | string[] | null) => string | null
  errorMessage?: string
}

export type FormGeneratorProps = {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "checkbox"
    | "radio"
    | "file"
    | "date"
    | "tel"
    | "time"
    | "link"
  inputType:
    | "select"
    | "input"
    | "textarea"
    | "checkbox"
    | "radio"
    | "file"
    | "color"
    | "custom-email-input"
  options?: TOption[]
  label?: string
  checkboxLabel?: ReactNode
  placeholder?: string
  name: string
  lines?: number
  className?: string
  defaultValue?: string | number | boolean | string[] | null
  hasRequiredMark?: boolean
  disabled?: boolean
  onUpdate: (
    name: string,
    value: string | boolean | string[] | null,
    error: string | null
  ) => void
  validation?: ValidationRules
  error: string | null
}

const FormGenerator = ({
  inputType,
  options,
  label,
  checkboxLabel,
  defaultValue = "",
  placeholder,
  name,
  type = "text",
  lines = 3,
  className,
  validation = {},
  error,
  hasRequiredMark = false,
  disabled = false,
  onUpdate,
}: FormGeneratorProps) => {
  const [value, setValue] = useState<
    string | boolean | number | string[] | null
  >(defaultValue)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (defaultValue) setValue(defaultValue)
  }, [defaultValue])

  const validateField = (val: string | boolean | string[] | null) => {
    if (
      validation.required &&
      (!val || (typeof val === "string" && !val.trim()))
    )
      return "This field is required."
    if (
      validation.minLength &&
      typeof val === "string" &&
      val.length < validation.minLength
    )
      return `Minimum length is ${validation.minLength}.`
    if (
      validation.maxLength &&
      typeof val === "string" &&
      val.length > validation.maxLength
    )
      return `Maximum length is ${validation.maxLength}.`
    if (
      validation.min !== undefined &&
      typeof val === "number" &&
      val < validation.min
    )
      return `Minimum value is ${validation.min}.`
    if (
      validation.max !== undefined &&
      typeof val === "number" &&
      val > validation.max
    )
      return `Maximum value is ${validation.max}.`
    if (
      validation.pattern &&
      typeof val === "string" &&
      !validation.pattern.test(val)
    )
      return validation.errorMessage ?? "Invalid format."

    if (validation.validate && typeof validation.validate === "function") {
      const customError = validation.validate(val)
      if (customError) return customError
    }
    return null
  }

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let newValue: string | boolean | null = event.target.value
    if (event.target.type === "checkbox")
      newValue = (event.target as HTMLInputElement).checked

    setValue(newValue)
    onUpdate(name, newValue, validateField(newValue))
  }

  return (
    <label className={`form-group ${className ? className : ""}`}>
      {label && (
        <span className="form-label">
          {label}
          {hasRequiredMark && validation.required && (
            <span className="text-danger ps-2">*</span>
          )}
        </span>
      )}

      <div className="input-wrapper">
        {inputType === "input" && (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
            onChange={handleChange}
            disabled={disabled}
            minLength={validation.minLength}
            maxLength={validation.maxLength}
            autoComplete="off"
            onFocus={() => setIsFocused(true)}
            className={`form-input  ${
              isFocused && error ? "input-error" : ""
            } ${disabled && "cursor-blocked"} `}
          />
        )}

        {inputType === "select" && options && (
          <select
            name={name}
            value={typeof value === "string" ? value : ""}
            onChange={handleChange}
            className={`form-input ${disabled && "cursor-blocked"}`}
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {inputType === "textarea" && (
          <textarea
            name={name}
            placeholder={placeholder}
            rows={lines}
            value={typeof value === "string" ? value : ""}
            onChange={handleChange}
            className={`form-input ${disabled && "cursor-blocked"}`}
          />
        )}

        {inputType === "checkbox" && (
          <div className="form-checkbox">
            <input
              type="checkbox"
              name={name}
              checked={typeof value === "boolean" ? value : false}
              onChange={handleChange}
              className={`checkbox-input ${disabled && "cursor-blocked"}`}
            />
            {checkboxLabel && (
              <span className="form-label">{checkboxLabel}</span>
            )}
          </div>
        )}

        {inputType === "radio" && options && (
          <div className="form-radio">
            {options.map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className={`radio-input ${disabled && "cursor-blocked"}`}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}

        {inputType === "file" && (
          <ImageUploader
            name={name}
            onUpload={(imageURL) =>
              onUpdate(name, imageURL, validateField(imageURL))
            }
            disabled={disabled}
            defaultValue={defaultValue as string}
          />
        )}

        {inputType === "color" && (
          <ColorPicker
            name={name}
            onChange={(imageURL) =>
              onUpdate(name, imageURL, validateField(imageURL))
            }
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue as string}
          />
        )}

        {inputType === "custom-email-input" && (
          <CustomEmailInput
            onChange={(imageURL) =>
              onUpdate(name, imageURL, validateField(imageURL))
            }
            disabled={disabled}
            placeholder={placeholder}
            options={options ?? []}
            defaultValue={defaultValue as string[]}
          />
        )}
        {isFocused && error && <span className="form-error">{error}</span>}
      </div>
    </label>
  )
}
export default FormGenerator

const ImageUploader = ({
  name,
  onUpload,
  disabled,
  defaultValue,
}: {
  name: string
  onUpload: (url: string) => void
  disabled: boolean
  defaultValue: string | null
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadImage, { isLoading }] = useUploadImageMutation()
  const [imageUrl, setImageUrl] = useState<string | null>(defaultValue)

  useEffect(() => {
    if (defaultValue) setImageUrl(defaultValue)
  }, [defaultValue])

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const response = await uploadImage(file).unwrap()
      if (response?.secure_url) {
        setImageUrl(response.secure_url)
        onUpload(response.secure_url)
      }
    } catch (error) {
      console.error("Upload error:", error)
    }
  }

  // To Open the File Input
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault() // Prevent unintended event triggering
      if (fileInputRef.current && !disabled) {
        fileInputRef.current.click()
      }
    },
    [disabled]
  )

  return (
    <div
      className={`image-upload-container ${
        disabled && "cursor-not-allowed opacity-50"
      }`}
      onClick={handleClick}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        name={name}
        type="file"
        title="Upload Image"
        accept="image/*"
        className="image-input"
        onChange={handleFileChange}
        disabled={disabled}
        onClick={(e) => e.stopPropagation()} // Prevents double triggering
      />

      {/* Loading spinner */}
      {isLoading ? (
        <div className="image-container-text">Uploading...</div>
      ) : (
        imageUrl && (
          <img src={imageUrl} alt="Uploaded" className="image-upload-preview" />
        )
      )}

      {!imageUrl && !isLoading && (
        <div className="image-container-text">Click to Upload</div>
      )}
    </div>
  )
}

const ColorPicker = ({
  name,
  onChange,
  disabled,
  placeholder,
  defaultValue,
}: {
  onChange: (color: string) => void
  name: string
  disabled: boolean
  placeholder?: string
  defaultValue?: string
}) => {
  const [selectedColor, setSelectedColor] = useState(defaultValue)
  const predefinedColors = ["#EB690F", "#FFFFFF", "#000000"]

  useEffect(() => {
    if (defaultValue) {
      setSelectedColor(defaultValue)
    }
  }, [defaultValue])

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    onChange(color)
  }

  return (
    <div>
      <div className="color-picker-wrapper">
        {predefinedColors.map((color) => (
          <div
            key={color}
            style={{ backgroundColor: color }}
            className={`color-item ${selectedColor === color && "active"}`}
            onClick={() => handleColorChange(color)}
          />
        ))}
      </div>

      {/* Custom Color Picker */}
      <div className="color-input-wrapper">
        <div className="color-preview">
          <input
            type="color"
            name={name}
            disabled={disabled}
            value={selectedColor}
            placeholder={placeholder}
            onChange={(e) => handleColorChange(e.target.value)}
            className="color-input"
          />
          <div
            className="color-box"
            style={{ backgroundColor: selectedColor }}
          />
        </div>

        <span className="color-input-text">{selectedColor}</span>
      </div>
    </div>
  )
}

const CustomEmailInput = ({
  onChange,
  disabled,
  placeholder,
  options,
  defaultValue,
}: {
  onChange: (email: string[]) => void
  disabled: boolean
  placeholder?: string
  options: TOption[]
  defaultValue: string[]
}) => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [filteredOptions, setFilteredOptions] = useState<TOption[]>(options)
  const [inputValue, setInputValue] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const selectRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (Array.isArray(options) && options.length > 0)
      setFilteredOptions(options)
  }, [options])

  useEffect(() => {
    if (Array.isArray(defaultValue) && defaultValue.length > 0) {
      setSelectedEmails(defaultValue)
      setFilteredOptions((prev) => {
        // Convert to string for comparison
        const defaultValuesSet = new Set(defaultValue.map(String))

        const newList = prev.filter(
          (option) => !defaultValuesSet.has(String(option.value))
        )

        return newList
      })
    }
  }, [defaultValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)

    if (value.length > 0) {
      setFilteredOptions(
        options.filter(
          (option) =>
            !selectedEmails?.includes(option.value) &&
            option.label.toLowerCase().includes(value.toLowerCase())
        )
      )
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }

  const handleSelectOption = (option: TOption) => {
    const newEmails = [...selectedEmails, option.value]
    setSelectedEmails(newEmails)
    setFilteredOptions(
      filteredOptions.filter((opt) => opt.value !== option.value)
    )
    setInputValue("")
    onChange(newEmails)

    setTimeout(() => setShowDropdown(false), 10)
  }

  const handleRemoveEmail = (email: string) => {
    const updatedEmails = selectedEmails?.filter((item) => item !== email)
    setSelectedEmails(updatedEmails)
    setFilteredOptions([
      ...filteredOptions,
      options.find((opt) => opt.value === email)!,
    ])
    onChange(updatedEmails)
  }

  return (
    <div className="custom-email-input-wrapper">
      {selectedEmails?.map((email) => (
        <div key={email} className="email-item">
          {email}
          <span
            className="remove-email"
            onClick={() => handleRemoveEmail(email)}
          >
            ✖
          </span>
        </div>
      ))}
      <input
        type="text"
        disabled={disabled}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        className="form-input"
      />
      {showDropdown && (
        <div className="dropdown-menu" ref={selectRef}>
          {filteredOptions?.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className="dropdown-item"
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="dropdown-item">No participants found</div>
          )}
        </div>
      )}
    </div>
  )
}
