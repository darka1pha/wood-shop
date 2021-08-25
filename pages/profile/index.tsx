import {Box, Flex, HStack, Stack} from "@chakra-ui/layout"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {ProfileNavbar} from "../../components"
import ProfileInfo from "../../components/Profile/ProfileInfo"
import Addresses from "../../components/Profile/Addresses"
import UserFavorites from "../../components/Profile/UserFavorites"
import Orders from "../../components/Profile/Orders"
import {selectCurrentUser} from "../../redux"
import WithNoUser from "../../components/HOC/withNoUser"
import UserInfoSkeleton from "../../components/Skeleton/UserInfoSkeleton"
interface IPageComponent {
	Component: JSX.Element
	title: string
}

const Profile = ({currentUser}) => {
	const router = useRouter()
	const [currentQuery, setCurrentQuery] = useState(null)
	const [currentPage, setCurrentPage] = useState({
		Component:
			currentQuery === "addresses" ||
			window.location.search.split("=")[1] === "addresses" ? (
				<Addresses />
			) : router.query.page === "orders" ||
			  window.location.search.split("=")[1] === "orders" ? (
				<Orders />
			) : router.query.page === "profileinfo" ||
			  window.location.search.split("=")[1] === "profileinfo" ? (
				<ProfileInfo />
			) : router.query.page === "favorites" ||
			  window.location.search.split("=")[1] === "favorites" ? (
				<UserFavorites />
			) : (
				<ProfileInfo />
			),
		title: "ProfileInfo",
	})

	useEffect(() => {
		setCurrentQuery(router.query.page)
	}, [router.query.page])

	if (!currentUser) return <UserInfoSkeleton />

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
					currentUser={currentUser}
					setCurrentPage={(component: IPageComponent) => {
						router.push({
							pathname: "profile",
							query:
								component.title.toLocaleLowerCase() === "orders"
									? {
											page: component.title.toLocaleLowerCase(),
											activeTab: "pending",
									  }
									: {
											page: component.title.toLocaleLowerCase(),
									  },
						})
						setCurrentPage(component)
					}}
				/>
				<Flex h='100%' w='100%'>
					{currentPage.Component}
				</Flex>
			</Flex>
		</Flex>
	)
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
})

export default connect(mapStateToProps)(WithNoUser(Profile))
