import {Flex} from "@chakra-ui/layout"
import Head from "next/head"
import {useEffect, useState} from "react"
import {QueryClient, useQueryClient} from "react-query"
import {useGetBanners, useGetFiltredData} from "../API"
import LandingSkeleton from "../components/Skeleton/LandingSkeleton"
import {
	Carousel,
	Description,
	Container,
	BannerContainer,
	Error,
} from "../components"
import {dehydrate} from "react-query/hydration"
import {prefetchFiltered} from "../API/prefetchFunctions"

// export async function getStaticProps() {
// 	const queryClient = new QueryClient()

// 	await queryClient.prefetchQuery("filteredData-score", () =>
// 		prefetchFiltered({filterOption: "score"}),
// 	)

// 	return {
// 		props: {
// 			dehydratedState: dehydrate(queryClient),
// 		},
// 	}
// }

export default function Home() {
	const queryClient = useQueryClient()
	const [categories, setCategories] = useState(null)
	const {
		data: newest,
		isLoading: isNewestLoading,
		error: error1,
	} = useGetFiltredData({filterOption: "score"})
	const {
		data: popular,
		isLoading: isPopularLoading,
		error: error2,
	} = useGetFiltredData({filterOption: "ordered_count"})
	const {
		data: banners,
		isLoading: isBannersLoading,
		error: error3,
	} = useGetBanners()

	useEffect(() => {
		setCategories(queryClient.getQueryData([`categories`]))
		console.log(queryClient.getQueryData([`categories`]))
	}, [queryClient.getQueryData([`categories`])])

	if (
		!newest ||
		!popular ||
		!categories ||
		isBannersLoading ||
		isPopularLoading ||
		isNewestLoading
	)
		return <LandingSkeleton />

	if (error1 || error2 || error3) return <Error />

	return (
		<Flex
			flexDir='column'
			as='div'
			lang='fa'
			bgColor='bgColor'
			minH='100vh'
			overflowX='hidden'
			pt={{base: 0, md: "85px"}}>
			<Head>
				<title>Wood Shop</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Container data={categories.slice(0, 5)} />
			<Carousel data={newest} title='جدیدترین ها' />
			<BannerContainer data={banners} />
			<Carousel data={popular} title='پرطرفدار ترین ها' />
			<Description />
		</Flex>
	)
}
