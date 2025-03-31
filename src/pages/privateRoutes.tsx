import { JSX, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { checkLocalStorage } from "../redux/slice/user-slice"
import { AppDispatch, RootState } from "../redux/store"
import LoadingSpinner from "../components/spinner"

type TElements = {
  element: JSX.Element
  mode?: "Auth" | "Private"
}

// Common Auth Wrapper for all pages (To Navigate Pages based on certain conditions)
const AuthWrapper = ({ element, mode }: TElements) => {
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(checkLocalStorage())
  }, [dispatch])

  if (loading) {
    return <LoadingSpinner />
  }

  // If user is logged in, restrict Auth pages (Sign In / Sign Up)
  if (mode === "Auth" && user) {
    return (
      <Navigate
        to={user.hasPreferences ? "/dashboard" : "/auth/preferences"}
        replace
      />
    )
  }

  // If user is NOT logged in, restrict Private pages
  if (mode === "Private" && !user) {
    return <Navigate to="/auth/sign-in" replace />
  }

  // If user has no preferences, force them to set preferences first
  if (
    mode === "Private" &&
    user &&
    !user.hasPreferences &&
    location.pathname !== "/auth/preferences"
  ) {
    return <Navigate to="/auth/preferences" replace />
  }

  return element
}

export default AuthWrapper
