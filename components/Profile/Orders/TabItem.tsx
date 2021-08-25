import {Tab, Text} from "@chakra-ui/react"
import {Dispatch, SetStateAction} from "react"

interface TabsItemProps {
	isActive: boolean
	children: string
	count: number
	changeQuery: () => void
}

const TabItem = ({count, isActive, children, changeQuery}: TabsItemProps) => {
	return (
		<Tab fontSize={{base:12,md:"1rem"}} onClick={changeQuery} _focus={{outline: 0}}>
			<Text>{children}</Text>
			<Text
				borderRadius='.2rem'
				mr='.5rem'
				px='.6rem'
				bgColor={isActive ? "primary" : "#A1A3A8"}
				color='white'>
				{count}
			</Text>
		</Tab>
	)
}

export default TabItem
