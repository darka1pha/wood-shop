import {Flex, Icon, Text} from "@chakra-ui/react"
import {BiMessageSquareError} from "react-icons/bi"

const NoOrder = () => {
	return (
		<Flex
			w='100%'
			justifyContent='center'
			alignItems='center'
			flexDir='column'
      mt="2rem"
      color="#81858b"
      >
			<Icon fontSize={60} as={BiMessageSquareError} />
			<Text fontFamily="VazirMedium" fontSize={24}>سفارشی وجود ندارد</Text>
		</Flex>
	)
}

export default NoOrder
