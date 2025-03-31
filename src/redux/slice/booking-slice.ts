import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithInterceptor } from "../../services/rtkService"
import { ROUTES } from "../../lib/route"

export type TBookingList = {
  id: string
  eventTitle: string
  eventDate: string
  eventStTime: string
  eventEdTime: string
  status: string
  participants: {
    id: string
    name: string
    image: string
    hasAccepted: boolean
  }[]
}

const bookingAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "booking",
  tagTypes: ["BookingList"],
  endpoints: (builder) => ({
    // Get Booking List
    getBookingList: builder.query<TBookingList[], string>({
      query: (status) => `${ROUTES.BookingRoute}?status=${status}`,
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
      providesTags: ["BookingList"],
    }),

    // Update Booking Status
    toggleBookingStatus: builder.mutation<
      { message: string },
      { id: string; status: "accepted" | "rejected" }
    >({
      query: (data) => ({
        url: ROUTES.BookingRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["BookingList"],
    }),
  }),
})

export const { useGetBookingListQuery, useToggleBookingStatusMutation } =
  bookingAPI
export default bookingAPI
