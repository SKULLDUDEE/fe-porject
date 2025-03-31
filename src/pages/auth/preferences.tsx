import AuthWrapper from "../../components/auth-wrapper"
import Button from "../../components/button"
import FormGenerator from "../../components/form-generator"
import usePreferences from "../../hooks/auth/use-preferences"

const Preferences = () => {
  const {
    handleUpdate,
    formErrors,
    handleSubmit,
    prefList,
    handlePreference,
    formData,
  } = usePreferences()
  return (
    // Common Auth Wrapper for all pages (Auth Once Only)
    <AuthWrapper title="Your Preferences" hasbottomLine={false}>
      {/* Form using Dynamic Form Generator */}
      <form onSubmit={handleSubmit}>
        <FormGenerator
          inputType={"input"}
          type={"text"}
          placeholder={"johndoe"}
          name={"userName"}
          onUpdate={handleUpdate}
          error={formErrors.userName}
          validation={{
            required: true,
            minLength: 2,
            maxLength: 20,
            pattern: /^[a-z0-9]+$/,
            errorMessage: "Only Smaller-case Alphabets and Numbers are allowed",
          }}
        />
        <h5 className="mb-0">
          Select one category that best describes your CNNCT:
        </h5>
        <div className="preferences-wrapper my-1">
          {prefList?.map((item) => {
            const isSelected = formData.prefList?.includes(item.name)
            return (
              <div
                key={item.id}
                className={`preferences-item ${
                  isSelected && "active-preference"
                }`}
                onClick={() => handlePreference(item.name)}
              >
                <img src={item.icon} alt={item.name} width={20} height={20} />
                {item.name}
              </div>
            )
          })}
        </div>
        {formErrors.prefList && (
          <div className="input-error text-sm">{formErrors.prefList}</div>
        )}
        <Button
          type="submit"
          color="primary"
          size="md"
          className="w-100"
          disabled={Object.keys(formErrors).length > 0}
        >
          Continue
        </Button>
      </form>
    </AuthWrapper>
  )
}

export default Preferences
