import {
	Link as CLink,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Flex,
	FlexProps,
	Icon,
	IconButton,
	Text,
} from "@chakra-ui/react"
import Link from "next/link"
import {motion} from "framer-motion"
import {useRouter} from "next/router"
import {FiChevronLeft} from "react-icons/fi"
import {IoMdMore} from "react-icons/io"
import {useMutation, useQueryClient} from "react-query"
import {useDeleteBookmark} from "../../API"

interface IQD {
	pageParams: Array<number>
	pages: Array<{
		results: Array<{id: number}>
	}>
}

export interface IFavoriteCard {
	id: number
	name: string
	price: number
	image: string
}

const FavoriteCard = ({id, image, name, price}: IFavoriteCard) => {
	const MotionFlex = motion<FlexProps>(Flex)
	const router = useRouter()
	const variants = {
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				type: "easeInOut",
				duration: 0.6,
				opacity: {
					delay: 0.3,
				},
			},
		},
		hidden: {
			opacity: 0,
			scale: 0.2,
			transition: {
				type: "easeInOut",
				duration: 0.6,
				opacity: {
					delay: 0.3,
				},
			},
		},
	}

	// const onWatchProduct = () => {
	//   router.push({
	//     pathname: "/product",
	//     query: {
	//       id: id
	//     }
	//   })
	// };

	const queryClient = useQueryClient()

	const {mutateAsync} = useMutation(useDeleteBookmark, {
		onSuccess: async () => {
			await queryClient.invalidateQueries(["userFavorites"])
		},
	})
	const removeBookmark = async () => {
		await mutateAsync(id)
	}

	return (
		<Flex
			pos='relative'
			w={{base: "100%", md: "48%"}}
			flex='1 1 380px'
			m='1rem 1%'
			boxShadow='md'
			h='160px'
			borderRadius='.5rem'
			overflow='hidden'
			justifyContent='flex-end'>
			<Flex flexDir='row-reverse' w='100%'>
				<Flex
					h='100%'
					w='160px'
					bgRepeat='no-repeat'
					bgSize='cover'
					bgPos='center'
					bgImage={`url(${image})`}
				/>
				<Flex alignItems='flex-end' flexDir='column'>
					<Flex p='1rem 2rem'>
						<Text
							fontFamily='Vazir'
							fontWeight='400'
							fontSize='14px'
							color='black'>
							{name}
						</Text>
					</Flex>
					<Flex p='1rem 2rem'>
						<Text
							dir='rtl'
							fontFamily='Vazir'
							fontWeight='400'
							fontSize='14px'
							color='black'>
							{price + " ریال"}
						</Text>
					</Flex>
					<Flex
						// onClick={onWatchProduct}
						cursor='pointer'
						alignItems='center'
						p='0 2rem'
						flexDir='row-reverse'>
						<Text
							dir='rtl'
							color='#47C0DF'
							fontFamily='Vazir'
							fontWeight='400'
							fontSize='14px'>
							<Link
								href={{
									pathname: "/product",
									query: {
										id: id,
									},
								}}>
								مشاهده محصول
							</Link>
						</Text>
						<Icon color='#47C0DF' as={FiChevronLeft} />
					</Flex>
				</Flex>
			</Flex>
			<Menu>
				<MenuButton
					pos='absolute'
					left='1rem'
					top='1rem'
					as={IconButton}
					icon={<Icon fontSize='1.5rem' as={IoMdMore} cursor='pointer' />}
					_focus={{
						outline: 0,
					}}
					_hover={{
						bgColor: "transparent",
					}}
				/>
				<MenuList minW='110px'>
					<MenuItem
						fontFamily='Vazir'
						color='red.500'
						dir='rtl'
						_hover={{
							outline: 0,
							bgColor: "transparent",
						}}
						_focus={{
							outline: 0,
							bgColor: "transparent",
						}}
						onClick={removeBookmark}>
						حذف
					</MenuItem>
				</MenuList>
			</Menu>
		</Flex>
	)
}

export default FavoriteCard
