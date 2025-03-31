const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

// Common Panel for all Project Routes
export const ROUTES = {
  LoginRoute: `${BACKEND_URL}/auth/login`,
  RegisterRoute: `${BACKEND_URL}/auth/register`,
  LogoutRoute: `${BACKEND_URL}/auth/logout`,
  PreferenceRoute: `${BACKEND_URL}/auth/user/set-preferences`,

  // Panel Routes
  UserDetailRoute: `${BACKEND_URL}/auth/user/detail`,
  UserAvailability: `${BACKEND_URL}/auth/user/availability`,
  EventRoute: `${BACKEND_URL}/event`,
  EventFormRoute: `${BACKEND_URL}/event/form`,
  ParticipantsRoute: `${BACKEND_URL}/event/participants`,
  BookingRoute: `${BACKEND_URL}/event/booking`,
  CalendarRoute: `${BACKEND_URL}/event/calendar`,
}
