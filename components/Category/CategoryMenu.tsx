import {Accordion} from "@chakra-ui/react"
import {useRouter} from "next/router"
import {useEffect} from "react"
import CategoryMenuSkeleton from "../Skeleton/CategoryMenuSkeleton"
import CategoryItem from "./CategoryItem"

interface ICategories {
	title?: string
	id?: number
	category_set: Array<{
		title?: string
		id?: number
	}>
}

interface ICatItem {
	title?: string
	items?: Array<ICategories>
	background?: string
	color?: string
	itemsMargin?: string
	containerMargin?: string
	defaultIndex?: boolean
	itemsBorder?: string
	activeIndex?: number
	w?: string
	borderRadius?: string
}

const CategoryMenu = ({
	background,
	color,
	itemsMargin,
	items,
	containerMargin = "0",
	defaultIndex = true,
	itemsBorder,
	activeIndex,
	borderRadius = "0",
	w,
}: ICatItem) => {
	console.log("AcIndex: ", items)
	if (!items) return <CategoryMenuSkeleton />
	return (
		<Accordion
			borderRadius='.5rem'
			overflow='hidden'
			w={w ? w : "100%"}
			defaultIndex={defaultIndex ? [activeIndex] : null}
			m={containerMargin}
			allowToggle>
			{items.map(({title, id, category_set}) => (
				<CategoryItem
					borderRadius={borderRadius}
					items={category_set}
					categoryTitle={title}
					background={background}
					color={color}
					margin={itemsMargin}
					border={itemsBorder}
					key={id}
					categoryId={id}
				/>
			))}
		</Accordion>
	)
}

export default CategoryMenu
