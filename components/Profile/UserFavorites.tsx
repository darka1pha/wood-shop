import {Flex, FlexProps} from "@chakra-ui/layout"
import React, {useEffect, useRef} from "react"
import {useGetFavorites} from "../../API"
import {IFavorites} from "../../API/interfaces"
import Text from "../Text"
import {motion} from "framer-motion"
import {Spinner} from "@chakra-ui/spinner"
import dynamic from "next/dynamic"
// import FavoriteCard from "./FavoriteCard"
import FavoritesSkeleton from "../Skeleton/FavoritesSkeleton"
import Head from "next/head"
import Error from "../Error"
import NoFavorite from "./NoFavorite"

const FavoriteCard = dynamic(
	() => {
		return import("./FavoriteCard")
	},
	{
		ssr: false,
	},
)

const UserFavorites = () => {
	const containerRef = useRef(null)
	const {
		data: favorites,
		fetchNextPage,
		isLoading,
		isFetchingNextPage,
		isSuccess,
		isError,
		hasNextPage,
	} = useGetFavorites()

	const isBottom = (el) => {
		return el.current?.getBoundingClientRect().bottom <= window.innerHeight
	}

	useEffect(() => {
		const trackScrolling = () => {
			if (containerRef) {
				if (isBottom(containerRef)) {
					if (hasNextPage) {
						fetchMoreItems()
					}
					document.removeEventListener("scroll", trackScrolling)
				}
			}
		}
		document.addEventListener("scroll", trackScrolling)
		return () => {
			document.removeEventListener("scroll", trackScrolling)
		}
	}, [favorites, containerRef])

	const fetchMoreItems = () => {
		fetchNextPage()
	}

	const variants = {
		visible: {
			opacity: 1,
			transition: {
				type: "ease",
				duration: 0.6,
			},
		},
		hidden: {
			opacity: 0,
			transition: {
				type: "ease",
				duration: 0.6,
			},
		},
	}

	if (!favorites || isLoading) return <FavoritesSkeleton />
	if (isError) return <Error />
	return (
		<Flex
			w='100%'
			minH='340px'
			mr={{base: 0, md: "2rem"}}
			borderRadius='.5rem'
			border='1px solid #CFCFCF'
			justifyContent='flex-start'
			alignItems='flex-end'
			flexDir='column'
			overflow='hidden'
			p='1.5rem'>
			<Head>
				<title>علاقه مندی ها</title>
				<meta name='description' content='اصلاعات پروفایل کاربر' />
				<meta name='keywords' content='پروفایل,اطلاعات کاربری,فروشگاه آنلاین' />
				<meta property='og:title' content='علاقه مندی ها' />
				<meta property='og:description' content='اصلاعات پروفایل کاربر' />
				<meta property='og:type' content='website' />
			</Head>
			<Flex
				alignItems='center'
				pb='.5rem'
				borderBottom='2px solid #0E668B'
				h={{base: "35px", md: "35px"}}
				mb='2rem'>
				<Text variant='heading5'>علاقه مندی ها</Text>
			</Flex>
			<Flex justifyContent='center' ref={containerRef} flexWrap='wrap' w='100%'>
				{isSuccess && favorites.pages[0].results.length !== 0 ? (
					favorites?.pages.map((group, index) => (
						<React.Fragment key={index}>
							{group?.results.map(
								({name, image, price, id}: IFavorites, key: number) => (
									<FavoriteCard
										price={price}
										name={name}
										image={image}
										id={id}
										key={key}
									/>
								),
							)}
						</React.Fragment>
					))
				) : (
					<NoFavorite />
				)}
			</Flex>
			<motion.div
				style={{
					display: isFetchingNextPage ? "flex" : "none",
					width: "100%",
					justifyContent: "center",
					margin: "1rem 0",
				}}
				initial='hidden'
				animate='visible'
				exit='hidden'
				variants={variants}>
				<Spinner color='#f04a5e' />
			</motion.div>
		</Flex>
	)
}

export default UserFavorites
