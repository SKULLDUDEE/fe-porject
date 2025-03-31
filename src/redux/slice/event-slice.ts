import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithInterceptor } from "../../services/rtkService"
import { ROUTES } from "../../lib/route"

export type TEventForm = {
  id: string
  topic: string
  password: string
  hostName: string
  description: string
  date: string
  time: string
  timeZone: string
  duration: string
  bannerImg: string
  color: string
  eventLink: string
  participants: string[]
}

export type OptionList = {
  id: string
  value: string
  label: string
}

export type TEventList = {
  eventID: string
  eventTitle: string
  eventDate: string
  eventStTime: string
  eventEdTime: string
  eventLink: string
  eventDuration: string
  isActive: boolean
  hasConflict: boolean
}

export type TCalendarEventList = {
  id: string
  title: string
  start: Date
  end: Date
  status: string
}

export type TPaginatedEventResponse = {
  totalEvents: number
  totalPages: number
  currentPage: number
  limit: number
  events: TEventList[]
}

const eventAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "event",
  tagTypes: [
    "EventList",
    "EventForm",
    "ParticipantsList",
    "EventListForCalendar",
  ],
  endpoints: (builder) => ({
    // Get Event List
    getEventList: builder.query<
      TPaginatedEventResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: ROUTES.EventRoute,
        params: { page, limit },
      }),
      providesTags: ["EventList"],
    }),

    // Get Users List
    getParticipants: builder.query<OptionList[], void>({
      query: () => ROUTES.ParticipantsRoute,
      transformResponse: (response: OptionList[]) => response,
      providesTags: ["ParticipantsList"],
    }),
    // Emitter for Creating an Event
    addEvent: builder.mutation<{ message: string }, TEventForm>({
      query: (data) => ({
        url: ROUTES.EventFormRoute,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["EventList", "EventListForCalendar"],
    }),
    // Toggle Event Status
    toggleEventStatus: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${ROUTES.EventFormRoute}/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["EventList"],
      async onQueryStarted(event, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          eventAPI.util.updateQueryData(
            "getEventList",
            { page: 1, limit: 15 },
            (response) => {
              const foundIndex = response.events.findIndex(
                (el) => el.eventID === event
              )

              if (foundIndex !== -1) {
                response.events[foundIndex].isActive =
                  !response.events[foundIndex].isActive
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          addResult.undo()
        }
      },
    }),
    // Delete Event
    deleteEvent: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${ROUTES.EventFormRoute}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventList", "EventListForCalendar"],
      // Optimistic Delete for the Event List
      async onQueryStarted(event, { dispatch, queryFulfilled }) {
        const addResult = dispatch(
          eventAPI.util.updateQueryData(
            "getEventList",
            { page: 1, limit: 15 },
            (response) => {
              const foundIndex = response.events.findIndex(
                (el) => el.eventID === event
              )

              if (foundIndex !== -1) {
                response.events.splice(foundIndex, 1)
              }
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          addResult.undo()
        }
      },
    }),
    // Emitter for Getting the Details of an event
    getEventDetailById: builder.query<TEventForm, string>({
      query: (id) => `${ROUTES.EventFormRoute}/${id}`,
      providesTags: ["EventForm"],
    }),
    // Update Event Detalils
    updateEvent: builder.mutation<{ message: string }, TEventForm>({
      query: (data) => ({
        url: ROUTES.EventFormRoute,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["EventList", "EventForm", "EventListForCalendar"],
    }),

    // Get Event List for Calendar
    getEventListForCalendar: builder.query<TCalendarEventList[], void>({
      query: () => ROUTES.CalendarRoute,
      providesTags: ["EventListForCalendar"],
    }),
  }),
})

export const {
  useAddEventMutation,
  useGetEventDetailByIdQuery,
  useUpdateEventMutation,
  useGetParticipantsQuery,
  useGetEventListQuery,
  useToggleEventStatusMutation,
  useDeleteEventMutation,
  useGetEventListForCalendarQuery,
} = eventAPI
export default eventAPI

// Get Event List
