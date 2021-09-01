import {Flex, Icon, Text} from "@chakra-ui/react"
import {BiMessageSquareError} from "react-icons/bi"

const NoFavorite = () => {
	return (
		<Flex
			w='100%'
			justifyContent='center'
			alignItems='center'
			flexDir='column'
      mt="2rem"
      color="#81858b"
      >
			<Icon fontSize={80} as={BiMessageSquareError} />
			<Text fontFamily="VazirMedium" fontSize={24}>کالایی در علاقه مندی ها وجود ندارد</Text>
		</Flex>
	)
}

export default NoFavorite
