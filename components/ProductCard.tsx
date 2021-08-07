import Icon from "@chakra-ui/icon"
import {Flex} from "@chakra-ui/layout"
import {useEffect, useState} from "react"
import {FiShoppingCart} from "react-icons/fi"
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"
import {useAddBookmark, useAddToCart, useDeleteBookmark} from "../API"
import {useMutation, useQueryClient} from "react-query"
import {ISetAlert, setAlert} from "../redux"
import {connect} from "react-redux"
import {useRouter} from "next/router"
import {MouseEventHandler} from "react"
import Link from "next/link"
import {Image, Text} from "@chakra-ui/react"
import {BiBadge} from "react-icons/bi"

interface CarouselItem {
	background_image?: string
	price?: number
	name?: string
	margin?: string
	id: number
	bookmarked: boolean
	setAlert: (alert: ISetAlert) => void
	off_id: {
		percentage: number
	}
}

const ProductCard = ({
	background_image,
	name,
	price,
	margin,
	id,
	bookmarked,
	setAlert,
	off_id,
}: CarouselItem) => {
	const [isLiked, setIsLiked] = useState(bookmarked)
	const router = useRouter()

	const queryClient = useQueryClient()

	const bgImage =
		"https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHRhYmxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

	// Mutation
	const bookmarkMutation = useMutation(useAddBookmark, {
		onSuccess: (response) => {
			setIsLiked(true)
			setAlert({content: "به لیست علاقه مندی ها افزوده شد", type: "success"})
		},
	})

	const deleteBookmarkMutation = useMutation(useDeleteBookmark, {
		onSuccess: (response) => {
			setIsLiked(false)
			setAlert({content: "از لیست علاقه مندی ها حذف شد", type: "success"})
		},
	})

	// const addToCartMutation = useMutation(useAddToCart, {
	//   onSuccess: () => {
	//     setAlert({ content: "به سبد خرید افزوده شد", type: "success" });
	//     queryClient.refetchQueries(['cartCounts'])
	//   },
	// });

	const onBookmarkClicked: MouseEventHandler<SVGElement> = (e) => {
		e.stopPropagation()
		if (!isLiked) {
			bookmarkMutation.mutate(id)
		} else {
			deleteBookmarkMutation.mutate(id)
		}
	}

	// const onAddToCart: MouseEventHandler<SVGElement> = (e) => {
	//   e.stopPropagation()
	//   addToCartMutation.mutate({ count: 1, product: id, form })
	// }

	// const onCardClicked = () => {
	// 	router.push({
	// 		pathname: "/product",
	// 		query: {
	// 			id,
	// 		},
	// 	})
	// }

	return (
		<Flex
			borderRadius='.5rem'
			overflow='hidden'
			flexDir='column'
			h={{base: "240px", md: "360px"}}
			w={{base: "160px", md: "240px"}}
			m={margin}
			cursor='pointer'
			boxShadow='md'
			transition='all 200ms ease-in-out'
			_hover={{
				transform: "scale(1.02)",
			}}
			// onClick={onCardClicked}
			pos='relative'>
			<Flex
				h='75%'
				w='100%'
				cursor='pointer'
				// bgImage={`url(${bgImage})`}
				bgRepeat='no-repeat'
				bgSize='cover'
				borderRadius='.5rem .5rem 0 0 / .5rem .5rem 0 0'>
				<Link
					href={{
						pathname: "/product",
						query: {
							id,
						},
					}}>
					<a style={{width: "100%"}}>
						<Image
							borderRadius='.5rem .5rem 0 0 / .5rem .5rem 0 0'
							width='100%'
							maxH='100%'
							src={bgImage}
							alt={name}
						/>
					</a>
				</Link>
			</Flex>
			<Link
				href={{
					pathname: "/product",
					query: {
						id,
					},
				}}>
				<a>
					<Flex
						flexDir='column'
						padding='.5rem'
						justifyContent='center'
						alignItems='center'>
						<Text
							m='.1rem'
							color='black'
							fontFamily='Vazir'
							fontSize='12'
							dir='rtl'>
							{name}
						</Text>
						{/* <Text
							m='.1rem'
							dir='rtl'
							color='black'
							fontFamily='VazirThin'
							fontSize='12px'>
							{` ${price?.toLocaleString()} ریال`}
						</Text> */}
						<Flex m='0' flexDir='column'>
							<Text
								display={off_id ? "block" : "none"}
								m='0'
								whiteSpace='nowrap'
								color='black'
								fontFamily='VazirThin'
								fontSize='12px'>
								{`${(
									price -
									price * (off_id?.percentage / 100)
								).toLocaleString()} ریال`}
							</Text>
							<Text
								pos='relative'
								whiteSpace='nowrap'
								color='black'
								fontFamily='VazirThin'
								fontSize='12px'
								_after={
									off_id
										? {
												content: '" "',
												borderRadius: "2rem",
												height: "1.2px",
												width: "80px",
												backgroundColor: "red",
												position: "absolute",
												transform: "rotate(-5deg)",
												top: "50%",
												left: "-5%",
												display: off_id,
										  }
										: null
								}>
								{`${price.toLocaleString()} ریال`}
							</Text>
						</Flex>
						<Flex
							m='.1rem'
							justifyContent='space-evenly'
							pos='absolute'
							bottom='.5rem'
							right='0.5rem'>
							{/* <Icon onClick={onAddToCart} as={FiShoppingCart} color="black" h="20px" w="20px" /> */}
							<Icon
								zIndex={1}
								h='25px'
								w='25px'
								onClick={onBookmarkClicked}
								as={isLiked ? AiFillHeart : AiOutlineHeart}
								color='red'
							/>
						</Flex>
					</Flex>
				</a>
			</Link>
			<Flex
				display={off_id ? "flex" : "none"}
				bgColor='orange'
				borderRadius='100% 0% 100% 0% / 100% 85% 100% 0% '
				pos='absolute'
				bottom='.5rem'
				left='0.5rem'
				p='0.5rem'>
				<Text fontSize='.7rem' fontFamily='Vazir' fontWeight='700'>
					%{off_id?.percentage}
				</Text>
			</Flex>
		</Flex>
	)
}

const mapDispatchToProps = (dispatch) => ({
	setAlert: ({content, type}: ISetAlert) => dispatch(setAlert({type, content})),
})

export default connect(null, mapDispatchToProps)(ProductCard)
