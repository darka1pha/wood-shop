import {Flex, Skeleton} from "@chakra-ui/react"

const CategoryMenuSkeleton = () => {
	return (
		<Flex h='180px' borderRadius='1rem' w='100%'>
			<Skeleton w='100%' h='100%' />
		</Flex>
	)
}

export default CategoryMenuSkeleton

{
	/* <Accordion
borderRadius='.5rem'
overflow='hidden'
w={w ? w : "100%"}
defaultIndex={defaultIndex ? [activeIndex] : null}
m={containerMargin}
allowToggle> */
}
