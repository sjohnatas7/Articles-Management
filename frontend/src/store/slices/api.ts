import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseApiUrl } from '../../globals'
import showErrorOrConclude from '../../config/showErrorOrConclude'
import { ArticleItemProps } from '../../components/articles/ArticleItem'
// Define a service using a base URL and expected endpoints
export const articleByCategoryApi = createApi({
	reducerPath: 'articleByCategoryApi',
	baseQuery: fetchBaseQuery({
		baseUrl: baseApiUrl,
		prepareHeaders: (headers: Headers) => {
			headers.set('authorization', `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkplY2EgVGF0dSIsImVtYWlsIjoic2pvaG5hdGFzMTNAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY3NTIxNjQ0MiwiZWF0IjoxNjc1NDc1NjQyfQ.PcmfAmsPg9z5RRG0_VOVXnniMUvWZQimTbDFUhX7XAo`)
			return headers
		},
	}),
	tagTypes: ['ArticleItemProps'],
	endpoints: (builder) => ({
		getArticlesInArticlesByCategory: builder.query<ArticleItemProps[], { id: string, page: number }>({
			query: ({ id, page }) => `categories/${id}/article?page=${page}`,
			transformErrorResponse: (response) => {
				const { showMessageError } = showErrorOrConclude()
				return showMessageError(response)
			},
			providesTags: (result,error, args) =>
				result
					? [
						...result.map(({ id }) => ({ type: 'ArticleItemProps' as const, id: id || 1 })),
						{ type: 'ArticleItemProps', id: "List", page: args.page },
					]
					: [{ type: 'ArticleItemProps', id:  "List", page: 1}],
		},
		),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetArticlesInArticlesByCategoryQuery } = articleByCategoryApi