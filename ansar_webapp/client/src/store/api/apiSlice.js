import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthToken } from '../../utils/axiosConfig';

// Define the base query with auth headers
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Campaigns', 'Categories', 'Donations', 'Projects', 'Sponsorships', 'Sadaqah', 'User'],
  endpoints: (builder) => ({
    // Campaign endpoints
    getCampaigns: builder.query({
      query: (params) => ({
        url: '/campaigns',
        params,
      }),
      providesTags: ['Campaigns'],
    }),
    getFeaturedCampaigns: builder.query({
      query: () => ({
        url: '/campaigns',
        params: { isFeatured: true, limit: 8 },
      }),
      providesTags: ['Campaigns'],
    }),
    getCampaignById: builder.query({
      query: (id) => `/campaigns/${id}`,
      providesTags: (result, error, id) => [{ type: 'Campaigns', id }],
    }),
    createCampaign: builder.mutation({
      query: (data) => ({
        url: '/admin/campaigns',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Campaigns'],
    }),
    updateCampaign: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/campaigns/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Campaigns', id }],
    }),
    deleteCampaign: builder.mutation({
      query: (id) => ({
        url: `/admin/campaigns/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Campaigns'],
    }),
    donateToCampaign: builder.mutation({
      query: ({ campaignId, ...data }) => ({
        url: `/campaigns/${campaignId}/donate`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { campaignId }) => [
        { type: 'Campaigns', id: campaignId },
        'Donations',
      ],
    }),

    // Category endpoints
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
    getCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Categories', id }],
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/admin/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Categories', id }],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),

    // Donation endpoints
    getDonations: builder.query({
      query: (params) => ({
        url: '/admin/donations',
        params,
      }),
      providesTags: ['Donations'],
    }),
    getDonationById: builder.query({
      query: (id) => `/admin/donations/${id}`,
      providesTags: (result, error, id) => [{ type: 'Donations', id }],
    }),
    getUserDonations: builder.query({
      query: () => '/user/donations',
      providesTags: ['Donations'],
    }),
    createDonation: builder.mutation({
      query: (data) => ({
        url: '/donations',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Donations'],
    }),
    updateDonation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/donations/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Donations', id }],
    }),
    deleteDonation: builder.mutation({
      query: (id) => ({
        url: `/admin/donations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Donations'],
    }),

    // Project endpoints
    getProjects: builder.query({
      query: (params) => ({
        url: '/projects',
        params,
      }),
      providesTags: ['Projects'],
    }),
    getFeaturedProjects: builder.query({
      query: () => ({
        url: '/projects',
        params: { isFeatured: true, limit: 6 },
      }),
      providesTags: ['Projects'],
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: '/admin/projects',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/projects/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Projects', id }],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/admin/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),

    // Sponsorship endpoints
    getSponsorships: builder.query({
      query: (params) => ({
        url: '/sponsorships',
        params,
      }),
      providesTags: ['Sponsorships'],
    }),
    getSponsorshipsByType: builder.query({
      query: (type) => `/sponsorships/type/${type}`,
      providesTags: ['Sponsorships'],
    }),
    getSponsorshipById: builder.query({
      query: (id) => `/sponsorships/${id}`,
      providesTags: (result, error, id) => [{ type: 'Sponsorships', id }],
    }),
    createSponsorship: builder.mutation({
      query: (data) => ({
        url: '/admin/sponsorships',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Sponsorships'],
    }),
    updateSponsorship: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/sponsorships/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Sponsorships', id }],
    }),
    deleteSponsorship: builder.mutation({
      query: (id) => ({
        url: `/admin/sponsorships/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sponsorships'],
    }),
    sponsor: builder.mutation({
      query: ({ sponsorshipId, ...data }) => ({
        url: `/sponsorships/${sponsorshipId}/sponsor`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Sponsorships', 'Donations'],
    }),

    // Sadaqah endpoints
    getSadaqahItems: builder.query({
      query: (params) => ({
        url: '/sadaqah',
        params,
      }),
      providesTags: ['Sadaqah'],
    }),
    getSadaqahByType: builder.query({
      query: (type) => `/sadaqah/type/${type}`,
      providesTags: ['Sadaqah'],
    }),
    getSadaqahById: builder.query({
      query: (id) => `/sadaqah/${id}`,
      providesTags: (result, error, id) => [{ type: 'Sadaqah', id }],
    }),
    createSadaqah: builder.mutation({
      query: (data) => ({
        url: '/admin/sadaqah',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Sadaqah'],
    }),
    updateSadaqah: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/sadaqah/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Sadaqah', id }],
    }),
    deleteSadaqah: builder.mutation({
      query: (id) => ({
        url: `/admin/sadaqah/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sadaqah'],
    }),
    giveSadaqah: builder.mutation({
      query: ({ sadaqahId, ...data }) => ({
        url: `/sadaqah/${sadaqahId}/give`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Sadaqah', 'Donations'],
    }),

    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
    loginWithGoogle: builder.mutation({
      query: (body) => ({
        url: '/auth/google-login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    resetPasswordRequest: builder.mutation({
      query: (email) => ({
        url: '/auth/reset-password-request',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { token, password },
      }),
    }),

    // User endpoints
    getProfile: builder.query({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // Dashboard stats
    getDashboardStats: builder.query({
      query: () => '/admin/dashboard/stats',
    }),
    
    // File upload endpoints
    uploadFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/admin/upload',
        method: 'POST',
        body: formData,
        formData: true,
        };
      },
    }),
    uploadMultipleFiles: builder.mutation({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append('files', file);
        });
        return {
          url: '/admin/upload/multiple',
        method: 'POST',
        body: formData,
        formData: true,
        };
      },
    }),
    deleteFile: builder.mutation({
      query: (path) => ({
        url: '/admin/upload',
        method: 'DELETE',
        body: { path },
      }),
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useGetCampaignsQuery,
  useGetFeaturedCampaignsQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
  useDonateToCampaignMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetDonationsQuery,
  useGetDonationByIdQuery,
  useGetUserDonationsQuery,
  useCreateDonationMutation,
  useUpdateDonationMutation,
  useDeleteDonationMutation,
  useGetProjectsQuery,
  useGetFeaturedProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetSponsorshipsQuery,
  useGetSponsorshipsByTypeQuery,
  useGetSponsorshipByIdQuery,
  useCreateSponsorshipMutation,
  useUpdateSponsorshipMutation,
  useDeleteSponsorshipMutation,
  useSponsorMutation,
  useGetSadaqahItemsQuery,
  useGetSadaqahByTypeQuery,
  useGetSadaqahByIdQuery,
  useCreateSadaqahMutation,
  useUpdateSadaqahMutation,
  useDeleteSadaqahMutation,
  useGiveSadaqahMutation,
  useLoginMutation,
  useLoginWithGoogleMutation,
  useRegisterMutation,
  useResetPasswordRequestMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetDashboardStatsQuery,
  useUploadFileMutation,
  useUploadMultipleFilesMutation,
  useDeleteFileMutation,
} = apiSlice; 