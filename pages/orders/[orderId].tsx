import {Flex} from "@chakra-ui/layout"
import {Divider, Icon, Text} from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import {useRouter} from "next/router"
import {BsArrowRightShort} from "react-icons/bs"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {ProfileNavbar} from "../../components"
import WithNoUser from "../../components/HOC/withNoUser"
import OrderDetailHeader from "../../components/Profile/Orders/OrderDetailHeader"
import {selectCurrentUser} from "../../redux"

interface IPageComponent {
	Component: JSX.Element
	title: string
}

const OrderId = ({currentUser}) => {
	const router = useRouter()

	return (
		<Flex
			as='div'
			lang='fa'
			minH='100vh'
			overflowX='hidden'
			p={{base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem"}}
			bgColor='bgColor'
			flexDir='column'
			justifyContent='center'
			alignItems='center'>
			<Flex
				w='100%'
				maxW='1920px'
				flexDir={{base: "column", md: "row-reverse"}}
				mb='2rem'
				minH='70vh'>
				<ProfileNavbar
					forOrders={true}
					currentUser={currentUser}
					setCurrentPage={(component: IPageComponent) => {
						router.push({
							pathname: "profile",
							query: {page: component.title.toLocaleLowerCase()},
						})
					}}
				/>
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
					p={{base: "1.5rem .5rem", md: "1.5rem"}}>
					<Head>
						<title>سفارشات</title>
						<meta name='description' content='اصلاعات پروفایل کاربر' />
						<meta
							name='keywords'
							content='پروفایل,اطلاعات کاربری,فروشگاه آنلاین'
						/>
						<meta property='og:title' content='سفارشات' />
						<meta property='og:description' content='اصلاعات پروفایل کاربر' />
						<meta property='og:type' content='website' />
					</Head>
					<Flex
						alignItems='center'
						pb='.5rem'
						h={{base: "35px", md: "35px"}}
						mb='2rem'>
						<Text fontSize={{base: "14px", md: "18px"}} fontFamily='VazirBold'>
							جزئیات سفارش
						</Text>
						<Link href={`/profile?page=orders&activeTab=${router.query.prev}`}>
							<Icon cursor='pointer' fontSize={30} as={BsArrowRightShort} />
						</Link>
					</Flex>
					<Divider />
					<OrderDetailHeader />
					<Divider />
				</Flex>
			</Flex>
		</Flex>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(WithNoUser(OrderId))
