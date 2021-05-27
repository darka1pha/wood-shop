import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { ProfileNavbar } from "../../components";
import ProfileInfo from "../../components/Profile/ProfileInfo";

const index = () => {

	const [currentPage, setCurrentPage] = useState({
		Component:<ProfileInfo /> ,
		title:"ProfileInfo"
	})

	return (
		<Flex
			as="div"
			lang="fa"
			minH="100vh"
			overflowX="hidden"
			p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
			bgColor="bgColor"
			flexDir="column"
			justifyContent="center"
			alignItems="center"
		>
			<Flex
				w="100%"
				maxW="1280px"
				flexDir="row-reverse"
				mb="2rem"
				minH="70vh"
			>
				<ProfileNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
				<Flex h="100%" w="100%">
					{
						currentPage.Component
					}
				</Flex>
			</Flex>
		</Flex>
	);
}

export default index;