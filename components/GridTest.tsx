import { Flex, Grid, GridItem, SimpleGrid } from "@chakra-ui/layout";

const GridTest = () => {
	return (
		<Grid
			h="640px"
			templateRows={{ base: "repeat(4,1fr)", md: "repeat(2,1fr)" }}
			templateColumns={{ base: "repeat(1,1fr)", md: "1fr 1fr 1.5fr" }}
			gap={4}
		>
			<GridItem
				h={{base:"240px",md:"auto"}}
				rowSpan={{ base: 1, md: 2 }}
				colSpan={1}
				bg="red"
			/>
			<GridItem
				rowStart={{ base: 2, md: 1 }}
				colStart={{ base: 1, md: 2 }}
				rowSpan={1}
				colSpan={1}
				bg="blue"
			/>
			<GridItem
				rowStart={{ base: 3, md: 2 }}
				colStart={{ base: 1, md: 2 }}
				rowSpan={1}
				colSpan={1}
				bg="violet"
			/>
			<GridItem
				rowStart={{ base: 4, md: 1 }}
				colStart={{ base: 1, md: 3 }}
				rowSpan={{ base: 1, md: 2 }}
				colSpan={1}
				bg="pink"
			/>
		</Grid>
	);
}

export default GridTest;