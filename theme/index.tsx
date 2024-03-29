import {extendTheme} from "@chakra-ui/react"

export const theme = extendTheme({
	colors: {
		primary: "#0072A3",
		secondary:"#edf2f7",
		rust: "#A44200",
		bgColor: "#F2F2F2",
		itemsBg: "#ECECEC",
		itemsBorder: "#C6C6C6",
		btnActive: "#00648f",
		btnBg: "#0072A3",
		btnHover: "#0088c2",
		active: "#0fb6fc",
		BlueButton: {
			100: "#0E668B",
			200: "#0E668B",
			300: "#0E668B",
			400: "#0E668B",
			500: "#0E668B",
			600: "#0E668B",
			700: "#0E668B",
			800: "#0E668B",
			900: "#0E668B",
		},
	},
})

export const TextVariants = {
	heading1: {
		fontFamily: "VazirBold",
		fontSize: 48,
		color: "black",
	},
	heading2: {
		fontFamily: "VazirBold",

		fontSize: 40,
		color: "black",
	},
	heading3: {
		fontFamily: "VazirBold",
		fontSize: 32,
		color: "black",
	},
	heading4: {
		fontFamily: "VazirBold",
		fontSize: 24,
		color: "black",
	},
	heading5: {
		fontFamily: "VazirBold",
		fontSize: 18,
		color: "black",
	},
	heading6: {
		fontFamily: "VazirBold",
		fontSize: 16,
		color: "black",
	},
	heading7: {
		fontFamily: "VazirBold",
		fontSize: 12,
		color: "black",
	},
	heading8: {
		fontFamily: "VazirBold",
		fontSize: 11,
		color: "black",
	},
	normal: {
		fontFamily: "Vazir",
		fontSize: 12,
		color: "white",
	},
	normalExt: {
		fontFamily: "Vazir",
		fontWeight: "400",
		fontSize: 14,
		color: "white",
	},
	normalMedium: {
		fontFamily: "VazirMedium",
		fontWeight: "500",
		fontSize: 12,
		color: "white",
	},
	normalThin: {
		fontFamily: "VazirThin",
		fontSize: 12,
		color: "white",
	},
	normalLight: {
		fontFamily: "VazirLight",
		fontSize: 12,
		color: "white",
	},
}
