import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setisAuthenticated, setUser } from '../features/userSlice';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: '/api/v1',
	}),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getMe: builder.query({
			query: () => `/me`,
			transformResponse: (result) => result.user,
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setUser(data));
					dispatch(setisAuthenticated(true));
				} catch (error) {
					console.error(error);
				}
			},
			providesTags: ['User'],
		}),

		updateProfile: builder.mutation({
			query(body) {
				return {
					url: '/me/update',
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: ['User'],
		}),
		uploadUserAvatar: builder.mutation({
			query(body) {
				return {
					url: '/me/upload_avatar',
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useGetMeQuery,
	useUpdateProfileMutation,
	useUploadUserAvatarMutation,
} = userApi;