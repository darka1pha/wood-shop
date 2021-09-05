import {Flex} from "@chakra-ui/layout"
import ContainerItem from "./ContainerItem"

const Container = ({data}) => {
	return (
		<Flex
			w='100%'
			justifyContent='center'
			alignItems='center'
			mt='5rem'
			p={{base: ".5rem", md: "1rem"}}>
			<Flex flexWrap='wrap' w='100%' maxW='1920px'>
				{data.map(({title, image, id}) => (
					<ContainerItem title={title} image_url={image} id={id} key={id} />
				))}
			</Flex>
		</Flex>
	)
}

export default Container
