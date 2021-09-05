import {
	Flex,
	Button,
	Icon,
	Box,
	IconButton,
	InputGroup,
	Input,
	InputRightElement,
	InputLeftAddon,
	Text,
	DrawerContent,
	DrawerCloseButton,
	DrawerOverlay,
	DrawerBody,
	Drawer,
	useDisclosure,
	Collapse,
	ScaleFade,
	SlideFade,
	Skeleton,
} from "@chakra-ui/react"
import {FiUser, FiShoppingCart, FiSearch} from "react-icons/fi"
import {FaTimes} from "react-icons/fa"
import {AiOutlineMenu} from "react-icons/ai"
import React, {useEffect, useRef, useState} from "react"
import {motion} from "framer-motion"
import CategoryMenu from "./Category/CategoryMenu"
import {useRouter} from "next/router"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {selectCurrentUser} from "../redux/user/user.selectors"
import {setAlert} from "../redux"
import {useGetCartCount, useGetCategories} from "../API"
import {KeyboardEventHandler} from "react"
import Error from "./Error"
import Link from "next/link"

const Navbar = ({user, setAlert}) => {
	const router = useRouter()
	const btnSearchRef = useRef(null)
	const searchRefMd = useRef(null)
	const searchRefBase = useRef(null)
	const {data: categories, isError: categoryError} = useGetCategories()
	const {data: countData, isError: countDataError} = useGetCartCount()

	let condition = false
	const [isSearchActive, setIsSearchActive] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [searchValue, setSearchValue] = useState("")

	const {isOpen, onOpen, onClose} = useDisclosure()
	const btnRef = React.useRef()

	const onSearchCliked = () => {
		if (!isSearchOpen) {
			setIsSearchOpen(true)
			searchRefMd.current.focus()
		} else {
			if (searchValue.replace(/\s/g, "").length > 0) {
				setIsSearchOpen(false)
				router.push({
					pathname: "/search",
					query: {
						value: searchValue,
					},
				})
			} else {
				setSearchValue("")
				searchRefMd.current.focus()
				setAlert({
					content: "فیلد جستجو نمیتواند خالی باشد!",
					type: "warning",
				})
			}
		}
	}

	const onEnterPressed: KeyboardEventHandler = (e) => {
		if (e.key === "Enter") {
			if (searchValue.length > 0) {
				setIsSearchOpen(false)
				router.push({
					pathname: "/search",
					query: {
						value: searchValue,
					},
				})
			} else
				setAlert({
					content: "فیلد جستجو نمیتواند خالی باشد!",
					type: "warning",
				})
		}
	}

	const onSearchValueChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchValue(e.target.value)

	useEffect(() => {
		function handleClickOutside(event: {target: any; button: number}) {
			if (
				btnSearchRef.current &&
				!btnSearchRef.current.contains(event.target)
			) {
				if (event.button === 0) {
					setIsSearchActive(false)
				}
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [btnSearchRef])

	const SearchVariants = {
		active: {
			width: "100%",
			borderRadius: ".5rem",
			paddingRight: "3rem",
			transition: {
				ease: "easeInOut",
				duration: 0.4,
			},
		},
		hidden: {
			width: 0,
			borderRadius: "2rem",
			paddingRight: "0",
			transition: {
				ease: "easeInOut",
				duration: 0.4,
				paddingRight: {
					delay: 0.4,
				},
				borderRadius: {
					delay: 0.1,
				},
			},
		},
	}

	if (countDataError || categoryError) return null

	if (!categories)
		return (
			<Skeleton>
				<Flex h='85px' w='100%' zIndex='100'></Flex>
			</Skeleton>
		)

	return (
		<>
			<Flex
				display={router.pathname.includes("/payment/") ? "none" : "flex"}
				bgColor='white'
				direction='row-reverse'
				pt={{base: "4", md: "6"}}
				pl='4'
				pb={{base: "4", md: "6"}}
				pr='4'
				justify='space-between'
				position='fixed'
				top='0'
				left='0'
				w='100%'
				zIndex='100'>
				<IconButton
					ref={btnRef}
					display={{base: "block", md: "none"}}
					variant='none'
					aria-label='Search'
					icon={
						<Icon
							fontSize='1.5rem'
							as={isOpen ? FaTimes : AiOutlineMenu}
							color='primary'
						/>
					}
					onClick={onOpen}
					_focus={{
						borderColor: "transparent",
					}}
					_active={{
						borderColor: "transparent",
					}}
				/>
				<Text
					color='primary'
					w={{base: "100%", md: "auto"}}
					fontFamily='VazirBold'
					textAlign='center'
					px='2rem'
					fontSize={{base: "20px", md: "24px"}}
					m='auto'
					cursor='pointer'
					onClick={() => {
						router.push("/")
					}}>
					<Link href={{pathname: "/"}}>آرکـــالــا</Link>
				</Text>
				<Box
					flex={1}
					mr='8'
					ml='8'
					dir='rtl'
					display={{base: "none", md: "block"}}>
					<InputGroup alignItems='center'>
						<motion.input
							onKeyDown={onEnterPressed}
							layout
							ref={searchRefMd}
							style={{
								height: "40px",
								fontFamily: "Vazir",
								backgroundColor: "#EDEDED",
							}}
							value={searchValue}
							onChange={onSearchValueChanged}
							initial='hidden'
							placeholder='جستجو...'
							variants={SearchVariants}
							animate={isSearchOpen ? "active" : "hidden"}
							onBlur={() =>
								!condition ? setIsSearchOpen(false) : (condition = false)
							}
						/>
						<InputRightElement alignItems='center'>
							<IconButton
								onClick={onSearchCliked}
								onMouseDown={() => (condition = true)}
								borderRadius={isSearchOpen ? ".5rem" : "2rem"}
								_focus={{
									outline: 0,
								}}
								aria-label='Search'
								icon={<Icon as={FiSearch} color='primary' />}
							/>
						</InputRightElement>
					</InputGroup>
				</Box>
				<Flex alignItems='center' pos='relative'>
					<Link
						href={{
							pathname: "/cart",
						}}>
						<a>
							<IconButton
								display={user ? "auto" : "none"}
								aria-label='Shoping Cart'
								icon={
									<Icon
										as={FiShoppingCart}
										color='primary'
										fontSize={{base: 25, md: 30}}
									/>
								}
								variant='ghost'
								mr='8'
								_hover={{
									bg: "transparent",
								}}
								_active={{
									bg: "transparent",
								}}
								_focus={{
									outline: "none",
								}}
							/>
						</a>
					</Link>
					<Link href={{pathname: "/profile", query: {page: "profileinfo"}}}>
						<a>
							<Icon
								cursor='pointer'
								display={{base: "block", md: "none"}}
								color='primary'
								as={FiUser}
								fontSize={{base: 25, md: "auto"}}
							/>
						</a>
					</Link>
					<Flex
						display={
							user && countData && countData.count !== 0 ? "flex" : "none"
						}
						alignItems='center'
						justifyContent='center'
						pos='absolute'
						fontSize='12px'
						fontFamily='Vazir'
						color='white'
						h='22px'
						top='1.3rem'
						left='1.8rem'
						borderRadius='.5rem'
						px='.5rem'
						bgColor='btnBg'>
						{countData?.count}
					</Flex>
					<Link
						href={
							user
								? {pathname: "/profile", query: {page: "profileinfo"}}
								: {pathname: "/auth/signin"}
						}>
						<a>
							<Button
								display={{base: "none", md: "flex"}}
								rightIcon={<Icon as={FiUser} fontSize={22} />}
								color='primary'
								bg='transparent'
								border='2px solid #0072A3'
								_focus={{
									outline: 0,
								}}
								_hover={{
									bg: "transparent",
									outline: 0,
								}}
								_active={{
									bg: "transparent",
									outline: 0,
								}}>
								{user ? (
									<Text fontFamily='VazirLight' fontSize='12' mr='2'>
										{user.first_name + " " + user.last_name}
									</Text>
								) : (
									<Text fontFamily='VazirLight' fontSize='12' mr='2'>
										حساب کاربری
									</Text>
								)}
							</Button>
						</a>
					</Link>
				</Flex>
			</Flex>
			<Drawer
				size='full'
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent bgColor='white'>
					<DrawerCloseButton
						top='.8rem'
						right='1rem'
						color='white'
						bgColor='primary'
						borderRadius='50%'
						_hover={{
							bgColor: "primary",
						}}
						_focus={{
							bgColor: "primary",
							outline: 0,
						}}
					/>
					<DrawerBody className='menu' p='2rem'>
						<Button
							color='primary'
							variant={isSearchActive ? "none" : "outline"}
							_hover={{
								bg: "transparent",
							}}
							_active={{
								bg: "transparent",
							}}
							_focus={{
								outline: "none",
							}}
							display='block'
							w='95%'
							borderRadius='2rem'
							ref={btnSearchRef}
							p='0'
							overflow='hidden'
							height='40px'
							alignItems='center'>
							<motion.p
								layout
								style={{
									height: "100%",
									width: "100%",
									alignItems: "center",
									justifyContent: "center",
									fontSize: "16px",
									fontFamily: "VazirMedium",
									fontWeight: 300,
									display: "flex",
									textAlign: "center",
								}}
								animate={{
									opacity: isSearchActive ? 0 : 1,
									display: isSearchActive ? "none" : "flex",
								}}
								transition={{
									type: "tween",
									delay: 0.02,
								}}
								onClick={() => {
									setIsSearchActive(true)
									searchRefBase.current.focus()
								}}>
								جستجو
							</motion.p>
							<motion.div
								style={{
									height: "100%",
									width: "100%",
								}}
								animate={{
									opacity: isSearchActive ? 1 : 0,
									display: isSearchActive ? "block" : "none",
								}}
								transition={{
									type: "tween",
									delay: 0.02,
								}}>
								<InputGroup w='100%'>
									<InputLeftAddon
										children={<Icon as={FiSearch} color='black' />}
										onClick={onSearchCliked}
									/>
									<Input
										w='100%'
										ref={searchRefBase}
										value={searchValue}
										onChange={onSearchValueChanged}
										bg='white'
										placeholder='جستجو'
										color='black'
										fontFamily='VazirMedium'
										_focus={{
											borderColor: "transparent",
											bgColor: "secondary",
										}}
										borderRadius='2rem'
										dir='rtl'
										type='text'
									/>
								</InputGroup>
							</motion.div>
						</Button>
						<Flex
							mt='1rem'
							flexDir='column'
							justifyContent='center'
							alignItems='center'
							w='100%'>
							<Text fontFamily='VazirMedium' color='primary' fontSize='1.2rem'>
								دسته بندی ها
							</Text>
							<CategoryMenu
								w='240px'
								color='white'
								background='primary'
								containerMargin='1rem 0 1rem 0'
								defaultIndex={false}
								itemsMargin='0 0 .5rem 0'
								itemsBorder='none'
								items={categories ? categories : null}
								borderRadius='.5rem'
							/>
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			{/* <Flex w='100%' h='100%' p='2rem' alignItems='center' flexDir='column'>
					
				</Flex> */}
		</>
	)
}

const mapStateToProps = createStructuredSelector({
	user: selectCurrentUser,
})
const mapDispatchToProps = (dispatch) => ({
	setAlert: ({content, type}) => dispatch(setAlert({content, type})),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
