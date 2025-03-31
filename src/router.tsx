import { lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import AuthWrapper from "./pages/privateRoutes"

// Import Pages Dynamically (Lazy Loading for Better Performance)
const LANDING_PAGE = lazy(() => import("./pages/landing/landing"))
const TERMS_CONDITION_PAGE = lazy(
  () => import("./pages/landing/terms-condition")
)
const PRIVACY_POLICY_PAGE = lazy(() => import("./pages/landing/privacy-poilcy"))
const SIGN_IN_PAGE = lazy(() => import("./pages/auth/sign-in"))
const SIGN_UP_PAGE = lazy(() => import("./pages/auth/sign-up"))
const PREFERENCES_PAGE = lazy(() => import("./pages/auth/preferences"))
const DASHBOARD_LAYOUT = lazy(() => import("./pages/dashboard/layout"))
const EVENTS_PAGE = lazy(() => import("./pages/dashboard/event"))
const EVENT_FORM_PAGE = lazy(() => import("./pages/dashboard/event-form"))
const BOOKING_PAGE = lazy(() => import("./pages/dashboard/booking"))
const AVAILABILITY_PAGE = lazy(() => import("./pages/dashboard/availability"))
const SETTINGS_PAGE = lazy(() => import("./pages/dashboard/setting"))
const PUBLIC_ERROR_PAGE = lazy(() => import("./pages/landing/public-error"))
const PRIVATE_ERROR_PAGE = lazy(() => import("./pages/landing/private-error"))

const router = createBrowserRouter([

  {
    path: "/",
    errorElement: <PUBLIC_ERROR_PAGE />,
    children: [
      { index: true, element: <LANDING_PAGE /> },
      { path: "privacy-policy", element: <PRIVACY_POLICY_PAGE /> },
      { path: "terms-and-conditions", element: <TERMS_CONDITION_PAGE /> },
      {
        path: "auth/sign-in",
        element: <AuthWrapper mode="Auth" element={<SIGN_IN_PAGE />} />,
      },
      {
        path: "auth/sign-up",
        element: <AuthWrapper mode="Auth" element={<SIGN_UP_PAGE />} />,
      },
    ],
  },

  {
    path: "auth/preferences",
    element: <AuthWrapper mode="Private" element={<PREFERENCES_PAGE />} />,
  },

  {
    path: "/dashboard",
    element: <AuthWrapper mode="Private" element={<DASHBOARD_LAYOUT />} />,
    errorElement: <PRIVATE_ERROR_PAGE />,
    children: [
      {
        index: true,
        element: <Navigate to={"/dashboard/events"} replace />,
      },
      {
        path: "events",
        element: <EVENTS_PAGE />,
      },
      {
        path: "events/form",
        element: <EVENT_FORM_PAGE />,
      },
      {
        path: "booking",
        element: <BOOKING_PAGE />,
      },
      {
        path: "availability",
        element: <AVAILABILITY_PAGE />,
      },
      {
        path: "settings",
        element: <SETTINGS_PAGE />,
      },
    ],
  },

  // Error Pages
  { path: "/404", element: <PUBLIC_ERROR_PAGE /> },
  // Redirect unknown routes to home
  { path: "*", element: <Navigate to="/404" replace /> },
])

export default router
