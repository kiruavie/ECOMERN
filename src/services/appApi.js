import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//création de l'API
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    //inscription
    signup: builder.mutation({
      query: (user) => ({
        url: "/users/signup",
        method: "POST",
        body: user,
      }),
    }),

    //connexion

    login: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    //création de produit
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        body: product,
        method: "POST",
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useCreateProductMutation } =
  appApi;

export default appApi;
