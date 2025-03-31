import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./slice/user-slice"
import { imageApi } from "./slice/img-upload-slice"
import userDetailAPI from "./slice/user-detail-slice"
import eventAPI from "./slice/event-slice"
import bookingAPI from "./slice/booking-slice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [userDetailAPI.reducerPath]: userDetailAPI.reducer,
    [eventAPI.reducerPath]: eventAPI.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      imageApi.middleware,
      userDetailAPI.middleware,
      eventAPI.middleware,
      bookingAPI.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
