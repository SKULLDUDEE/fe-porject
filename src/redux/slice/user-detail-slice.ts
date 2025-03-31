import { createApi } from "@reduxjs/toolkit/query/react"
import { ROUTES } from "../../lib/route"
import { baseQueryWithInterceptor } from "../../services/rtkService"

export type TDays = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat"

export type TUserSetting = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export type TAvailability = {
  day: TDays
  isAvailable: boolean
  availability?: {
    startTime: string
    endTime: string
    error: string | null
  }[]
}

export type TUserAvailability = Record<TDays, TAvailability>

const userDetailAPI = createApi({
  baseQuery: baseQueryWithInterceptor,
  reducerPath: "userDetail",
  tagTypes: ["UserDetail", "UserAvailability"],
  endpoints: (builder) => ({
    // Get Users Detail
    getUserDetail: builder.query<TUserSetting, void>({
      query: () => ROUTES.UserDetailRoute,
      providesTags: ["UserDetail"],
    }),

    // Get Users Availability
    getUserAvailability: builder.query<TUserAvailability, void>({
      query: () => ROUTES.UserAvailability,
      providesTags: ["UserAvailability"],
    }),

    // Update Queries
    updateUserDetails: builder.mutation<{ message: string }, TUserSetting>({
      query: (data) => ({
        url: ROUTES.UserDetailRoute,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),

      invalidatesTags: ["UserDetail"],
    }),
    // Update User Availability
    updateUserAvailability: builder.mutation<
      { message: string },
      TUserAvailability
    >({
      query: (data) => ({
        url: ROUTES.UserAvailability,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["UserAvailability"],
    }),
  }),
})

export const {
  useGetUserDetailQuery,
  useGetUserAvailabilityQuery,
  useUpdateUserDetailsMutation,
  useUpdateUserAvailabilityMutation,
} = userDetailAPI

export default userDetailAPI
