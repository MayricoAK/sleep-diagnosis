import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isTokenExpired } from "utils/utils";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                if (isTokenExpired(token)) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                } else {
                    headers.set('Authorization', `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),
    reducerPath: "adminApi",
    tagTypes: [
        "Login",
        "Register",
        "Dashboard",
        "FormDiagnosis",
        "DetailDiagnosis",
        "User",
        "UpdateUser",
    ],
    endpoints: (build) => ({
        postLogin: build.mutation({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials,
            }),
            providesTags: ["Login"],
        }),
        postRegister: build.mutation({
            query: (newUser) => ({
                url: "auth/register",
                method: "POST",
                body: newUser,
            }),
            providesTags: ["Register"],
        }),
        getDiagnosis: build.query({
            query: () => "Diagnosis",
            providesTags: ["Diagnosis"],
        }),

        postDiagnosis: build.mutation({
            query: (diagnosisData) => ({
                url: "diagnosis",
                method: "POST",
                body: diagnosisData,
            }),
            providesTags: ["FormDiagnosis"],
        }),
        getDetailDiagnosis: build.query({
            query: (id) => `diagnosis/${id}`,
            providesTags: ["DetailDiagnosis"],
        }),
        deleteDiagnosis: build.mutation({
            query: (id) => ({
                url: `diagnosis/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Home'],
        }),
        getUser: build.query({
            query: () => "user",
            providesTags: ["User"],
        }),
        putUser: build.mutation({
            query: (userData) => ({
                url: "user",
                method: "PUT",
                body: userData,
            }),
            providesTags: ["UpdateUser"],
        }),
    }),
    extractRehydrationInfo: (action, { reducerPath }) => {
        if (action.error && action.error.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
    },
});

export const {
    usePostLoginMutation,
    usePostRegisterMutation,
    useGetDiagnosisQuery,
    usePostDiagnosisMutation,
    useGetDetailDiagnosisQuery,
    useDeleteDiagnosisMutation,
    useGetUserQuery,
    usePutUserMutation,
} = api;