/*
  The query key IS the url — useGetData keys on it and useSubmitData refetches
  that key on success. A url built inline in a component invalidates nothing, so
  every endpoint the app calls belongs here.
*/
export const API_ENDPOINTS = {
  auth: {
    signup: "/auth/create-user",
    signin: "/auth/login",
    googleClient: "/auth/google/client",
    validateGoogleSession: (token: string) =>
      `/auth/google/callback/validate-session/${token}`,
    forgotPassword: "/auth/forgot-password",
    resetPassword: (token: string) => `/auth/reset-password?token=${token}`,
    updatePassword: "/auth/update-password",
    getProfile: "/auth/get-profile",
    updateProfile: "/auth/update-profile",
    deactivate: "/auth/deactivate",
  },

  drivers: {
    search: (query: string) => `/client/drivers?${query}`,
    detail: (id: string) => `/client/drivers/${id}`,
    reviews: (id: string) => `/client/drivers/${id}/reviews`,
  },

  onboarding: {
    preferences: "/client/onboarding",
    complete: "/client/onboarding/complete",
  },

  bookings: {
    list: ({ page, limit }: { page: number; limit: number }) =>
      `/client/bookings?page=${page}&limit=${limit}`,
    create: "/client/bookings",
    detail: (reference: string) => `/client/bookings/${reference}`,
    cancel: (reference: string) => `/client/bookings/${reference}/cancel`,
    review: (reference: string) => `/client/bookings/${reference}/review`,
  },

  notifications: {
    list: ({ page, limit }: { page: number; limit: number }) =>
      `/notifications?page=${page}&limit=${limit}`,
    unreadCount: "/notifications/unread-count",
    preferences: "/notifications/preferences",
    markAsRead: (id: string) => `/notifications/${id}/read`,
    markAllAsRead: "/notifications/read-all",
    remove: (id: string) => `/notifications/${id}`,
  },
} as const;
