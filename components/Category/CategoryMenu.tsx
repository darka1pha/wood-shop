import {
	Accordion
} from "@chakra-ui/react"
import CategoryItem from "./CategoryItem"


const CategoryMenu = () => {
	const testItems = ["ایتم 1", "ایتم 2"]
	return (
		<Accordion
			borderRadius=".5rem"
			overflow="hidden"
			w="100%"
			defaultIndex={[0]}
		>
			<CategoryItem
				items={testItems}
				title="صندلی"
			/>
			<CategoryItem
				items={testItems}
				title="میز"
			/>
			<CategoryItem
				items={testItems}
				title="قفسه"
			/>

		</Accordion>
	);
}

export default CategoryMenu;