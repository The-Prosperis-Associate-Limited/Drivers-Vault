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
    googleDriver: "/auth/google/driver",
    validateGoogleSession: (token: string) =>
      `/auth/google/callback/validate-session/${token}`,
    sendEmailOtp: "/auth/send-email-otp",
    verifyEmailOtp: "/auth/verify-email-otp",
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

  // The driver surface. Section names carry the driver prefix where a client
  // section of the same name already exists.
  driverOnboarding: {
    profile: "/driver/onboarding/profile",
    verificationStatus: "/driver/onboarding/verification-status",
    personalInformation: "/driver/onboarding/personal-information",
    experience: "/driver/onboarding/experience",
    academicQualification: "/driver/onboarding/academic-qualification",
    additionalInformation: "/driver/onboarding/additional-information",
    workExperience: "/driver/onboarding/work-experience",
    deleteWorkExperience: (id: string) =>
      `/driver/onboarding/work-experience/${id}`,
    guarantors: "/driver/onboarding/guarantors",
    guarantorFile: (id: string, field: "passport" | "nin-slip") =>
      `/driver/onboarding/guarantors/${id}/${field}`,
    deleteGuarantor: (id: string) => `/driver/onboarding/guarantors/${id}`,
    documents: "/driver/onboarding/documents",
    deleteDocument: (id: string) => `/driver/onboarding/documents/${id}`,
    submit: "/driver/onboarding/submit",
  },

  driverDashboard: {
    stats: "/driver/dashboard/stats",
    upcomingJobs: ({ limit }: { limit: number }) =>
      `/driver/dashboard/upcoming-jobs?limit=${limit}`,
    activities: ({ page, limit }: { page: number; limit: number }) =>
      `/driver/dashboard/activities?page=${page}&limit=${limit}`,
    trustScore: "/driver/dashboard/trust-score",
  },

  driverProfile: {
    workPreferences: "/driver/profile/work-preferences",
  },

  jobRequests: {
    list: ({
      page,
      limit,
      bucket,
    }: {
      page: number;
      limit: number;
      bucket?: string;
    }) =>
      `/driver/job-requests?page=${page}&limit=${limit}${bucket ? `&bucket=${bucket}` : ""}`,
    summary: "/driver/job-requests/summary",
    get: (reference: string) => `/driver/job-requests/${reference}`,
    accept: (reference: string) => `/driver/job-requests/${reference}/accept`,
    decline: (reference: string) => `/driver/job-requests/${reference}/decline`,
    start: (reference: string) => `/driver/job-requests/${reference}/start`,
    complete: (reference: string) =>
      `/driver/job-requests/${reference}/complete`,
  },

  earnings: {
    summary: "/driver/earnings",
    history: ({ page, limit }: { page: number; limit: number }) =>
      `/driver/earnings/history?page=${page}&limit=${limit}`,
    trend: "/driver/earnings/trend",
    banks: ({ country, currency }: { country: string; currency: string }) =>
      `/driver/earnings/banks?country=${country}&currency=${currency}`,
    resolveAccount: "/driver/earnings/banks/resolve",
    bankAccounts: "/driver/earnings/bank-accounts",
    setDefaultBankAccount: (id: string) =>
      `/driver/earnings/bank-accounts/${id}/default`,
    deleteBankAccount: (id: string) => `/driver/earnings/bank-accounts/${id}`,
    withdrawals: ({ page, limit }: { page: number; limit: number }) =>
      `/driver/earnings/withdrawals?page=${page}&limit=${limit}`,
    requestWithdrawal: "/driver/earnings/withdrawals",
  },

  driverReviews: {
    list: ({ page, limit }: { page: number; limit: number }) =>
      `/driver/reviews?page=${page}&limit=${limit}`,
    summary: "/driver/reviews/summary",
  },

  training: {
    stats: "/driver/training/stats",
    path: "/driver/training/path",
    courses: ({
      page,
      limit,
      search,
      category,
    }: {
      page: number;
      limit: number;
      search?: string;
      category?: string;
    }) =>
      `/driver/training/courses?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`,
    getCourse: (slug: string) => `/driver/training/courses/${slug}`,
    enroll: (slug: string) => `/driver/training/courses/${slug}/enroll`,
    moduleProgress: (slug: string, moduleId: string) =>
      `/driver/training/courses/${slug}/modules/${moduleId}/progress`,
    enrollments: ({ page, limit }: { page: number; limit: number }) =>
      `/driver/training/enrollments?page=${page}&limit=${limit}`,
    certifications: "/driver/training/certifications",
  },

  push: {
    web: "/push/web",
    deviceToken: "/push/device-token",
  },

  dashboard: {
    stats: "/client/dashboard/stats",
    overview: "/client/dashboard/overview",
  },

  hires: {
    list: ({ page, limit }: { page: number; limit: number }) =>
      `/client/hires?page=${page}&limit=${limit}`,
    detail: (reference: string) => `/client/hires/${reference}`,
  },

  wallet: {
    get: "/client/wallet",
    transactions: ({
      page,
      limit,
      type,
    }: {
      page: number;
      limit: number;
      type?: string;
    }) =>
      `/client/wallet/transactions?page=${page}&limit=${limit}${type ? `&type=${type}` : ""}`,
    summary: "/client/wallet/summary",
    quote: (amountMinor: number) =>
      `/client/wallet/quote?amount_minor=${amountMinor}`,
    pay: "/client/wallet/pay",
    sync: "/client/wallet/sync",
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

  tickets: {
    create: "/tickets",
    list: ({ page, limit }: { page: number; limit: number }) =>
      `/tickets?page=${page}&limit=${limit}`,
    get: (id: string) => `/tickets/${id}`,
    comment: (id: string) => `/tickets/${id}/comments`,
  },
} as const;
