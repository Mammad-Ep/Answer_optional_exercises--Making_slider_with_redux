import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { product, productCart, productUpdateCart } from '../../dataTypes/types/product';
// ___________________________________________________________

const CartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3050/" }),
    tagTypes: ['cartApi'],

    endpoints: (builder) => ({

        getCart: builder.query<productCart[], null>({
            query: () => `cart`,
            providesTags: ["cartApi"]
        }),

        addProduct: builder.mutation<null, productCart>({
            query: (newProduct) => ({
                url: "cart",
                method: "POST",
                body: newProduct
            }),
            invalidatesTags: ["cartApi"]
        }),

        deleteProduct: builder.mutation<null, number>({
            query: (id) => ({
                url: `cart/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["cartApi"]
        }),

        updateProduct: builder.mutation<null, productUpdateCart>({
            query: (product) => ({
                url: `cart/${product.id}`,
                method: "PATCH",
                body: { numberOf: product.numberOf }

            }),
            invalidatesTags: ["cartApi"]
        }),
    })
});


export default CartApi;
export const { useGetCartQuery, useAddProductMutation, useDeleteProductMutation, useUpdateProductMutation } = CartApi;