import Button from "../../components/button"
import FormGenerator from "../../components/form-generator"
import Header from "../../components/header"
import useSetting from "../../hooks/use-setting"

const SettingPage = () => {
  const { SETTING_FORM_ELEMENTS, formErrors, handleSubmit, isUpdating } =
    useSetting()
  return (
    <>
      <Header title="Profile" description="Manage settings for your profile" />
      <div className="card">
        <div className="nav-tab-wrapper">
          <div className="tab-link active-tab-link">Edit Profile</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="setting-form-wrapper">
            {SETTING_FORM_ELEMENTS?.map((item) => (
              <FormGenerator
                key={item.name}
                inputType={item.inputType}
                type={item.type}
                label={item.label}
                checkboxLabel={item.checkboxLabel}
                placeholder={item.placeholder}
                defaultValue={item.defaultValue}
                hasRequiredMark={item.hasRequiredMark}
                disabled={item.disabled}
                className={item.className}
                name={item.name}
                onUpdate={item.onUpdate}
                error={item.error}
                validation={item.validation}
              />
            ))}
          </div>
          <Button
            type="submit"
            color="primary"
            size="md"
            className="setting-btn"
            isLoading={isUpdating}
            disabled={Object.keys(formErrors).length > 0}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </>
  )
}

export default SettingPage
