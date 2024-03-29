import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {Box} from "@chakra-ui/layout"
import {useGetCategories} from "../../API"
import {Icon, Flex, Skeleton} from "@chakra-ui/react"
import Text from "../Text"
import {FiShoppingBag} from "react-icons/fi"
import dynamic from "next/dynamic"
import {useRouter} from "next/dist/client/router"

const MenuItem = dynamic(
	() => {
		return import("./MenuItem")
	},
	{
		ssr: false,
	},
)

const Menu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [prevScrollPos, setPrevScrollPos] = useState(0)
	const [visible, setVisible] = useState(true)
	const {data: categories, isError} = useGetCategories()
	const router = useRouter()

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset
		setVisible(prevScrollPos > currentScrollPos)
		setPrevScrollPos(currentScrollPos)
	}

	const variants = {
		visible: {
			x: "-.5rem",
			display: "flex",
			opacity: 1,
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.4,
				display: {
					delay: 0.4,
					duration: 0.2,
				},
			},
		},
		hidden: {
			x: "150px",
			display: "none",
			opacity: 0,
			transition: {
				type: "tween",
				ease: "easeInOut",
				duration: 0.4,
				display: {
					delay: 0.4,
					duration: 0.2,
				},
			},
		},
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [prevScrollPos, visible, handleScroll, isMenuOpen])

	if (isError) return null

	if (!categories)
		return (
			<Skeleton pos='absolute' top='85px'>
				<Flex h='60px' w='100vw' zIndex='100'></Flex>
			</Skeleton>
		)

	return (
		<Box
			display={
				router.pathname.includes("/payment/")
					? "none"
					: {base: "none", md: "block"}
			}>
			<motion.div
				layout
				initial='hidden'
				animate={{
					height: visible ? "60px" : "0",
					top: visible ? "85px" : "-10px",
					opacity: visible ? 1 : 0,
				}}
				transition={{
					type: "tween",
					delay: 0.02,
				}}
				style={{
					// padding: "4px 3px 12px 4px",
					width: "100%",
					zIndex: 3,
					position: "fixed",
					left: "0",
					display: "flex",
					alignItems: "center",
					backgroundColor: "#0072A3",
					background: "linear-gradient(to right,#0072A3,#005d85)",
					flexDirection: "row-reverse",
					boxShadow: "0px 5px 20px 5px rgba(0,0,0,0.2)",
				}}>
				<Box
					onMouseLeave={() => setIsMenuOpen(false)}
					onMouseOver={() => setIsMenuOpen(true)}
					pos='relative'
					h='100%'>
					<Flex
						dir='rtl'
						h='100%'
						alignItems='center'
						mr='1rem'
						cursor='pointer'>
						<Icon
							ml='0.2rem'
							color='white'
							as={FiShoppingBag}
							h='20px'
							w='20px'
						/>
						<Text color='white' variant='heading6'>
							دسته بندی ها
						</Text>
					</Flex>
					<motion.div
						animate={isMenuOpen ? "visible" : "hidden"}
						variants={variants}
						style={{
							maxWidth: "93vw",
							minWidth: "10vw",
							flexWrap: "wrap",
							display: "flex",
							borderRadius: "0.5rem",
							// position: "absolute",
							backgroundColor: "white",
							direction: "rtl",
							boxShadow: "0 8px 32px 0 rgba(104, 98, 98, 0.37)",
						}}>
						{categories?.map(({title, id, category_set}) => (
							<MenuItem
								id={id}
								text={title}
								key={id}
								category_set={category_set}
							/>
						))}
					</motion.div>
				</Box>
			</motion.div>
		</Box>
	)
}

export default Menu
