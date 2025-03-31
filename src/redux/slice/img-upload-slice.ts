import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const CLOUD_NAME = import.meta.env.VITE_APP_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_APP_UPLOAD_PRESET

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/`,
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<{ secure_url: string }, File>({
      query: (file) => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", UPLOAD_PRESET)

        return {
          url: "image/upload",
          method: "POST",
          body: formData,
        }
      },
    }),
  }),
})

export const { useUploadImageMutation } = imageApi
