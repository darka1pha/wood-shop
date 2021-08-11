import Icon from "@chakra-ui/icon"
import {Flex} from "@chakra-ui/layout"
import {useState} from "react"
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai"
import {useAddBookmark, useDeleteBookmark} from "../API"
import {useMutation, useQueryClient} from "react-query"
import {ISetAlert, setAlert} from "../redux"
import {connect} from "react-redux"
import {useRouter} from "next/router"
import {MouseEventHandler} from "react"
import Link from "next/link"
import {Text} from "@chakra-ui/react"

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
		"https://dkstatics-public.digikala.com/digikala-products/2d444f136ee744d8960a031576f360f39df6ebed_1611226401.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90"

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
			<img
				// borderRadius='.5rem .5rem 0 0 / .5rem .5rem 0 0'
				src={bgImage}
				alt={name}
				// w='100%'
				// h='auto'
				style={{
					objectFit: "scale-down",
					height: "60%",
				}}
			/>

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
							fontSize={{base: "12px", md: "14px"}}
							dir='rtl'>
							{name}
						</Text>
						<Flex px='.5rem' w='100%' mt='1rem' flexDir='column'>
							<Flex flexDir='row-reverse' alignItems='center'>
								<Text
									textAlign='left'
									pos='relative'
									whiteSpace='nowrap'
									color='black'
									fontFamily={off_id ? "Vazir" : "VazirMedium"}
									fontSize={
										off_id
											? {base: "12px", md: "14px"}
											: {base: "12px", md: "18px"}
									}
									_after={
										off_id
											? {
													content: '" "',
													borderRadius: "2rem",
													height: "1.2px",
													width: "105%",
													backgroundColor: "red",
													position: "absolute",
													transform: "rotate(-5deg)",
													top: "50%",
													left: "-3%",
													display: off_id,
											  }
											: null
									}>
									{off_id
										? price.toLocaleString()
										: `${price.toLocaleString()} ریال`}
								</Text>
								<Flex
									ml='.3rem'
									display={off_id ? "flex" : "none"}
									bgColor='orange'
									borderRadius='.2rem'
									p='0.3rem'>
									<Text fontSize='.6rem' fontFamily='Vazir' fontWeight='700'>
										%{off_id?.percentage}
									</Text>
								</Flex>
							</Flex>
							<Text
								mt='.5rem'
								dir='rtl'
								textAlign='left'
								display={off_id ? "block" : "none"}
								m='0'
								whiteSpace='nowrap'
								color='black'
								fontFamily='VazirMedium'
								fontSize={{base: "12px", md: "18px"}}>
								{`${(
									price -
									price * (off_id?.percentage / 100)
								).toLocaleString()} ریال`}
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
								w={{base: "20px", md: "25px"}}
								onClick={onBookmarkClicked}
								as={isLiked ? AiFillHeart : AiOutlineHeart}
								color='red'
							/>
						</Flex>
					</Flex>
				</a>
			</Link>
		</Flex>
	)
}

const mapDispatchToProps = (dispatch) => ({
	setAlert: ({content, type}: ISetAlert) => dispatch(setAlert({type, content})),
})

export default connect(null, mapDispatchToProps)(ProductCard)
