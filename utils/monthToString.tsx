interface useMonthToStringProps {
	month: string | number
}
const useMonthToString = ({month}: useMonthToStringProps) => {
	const _month = Number(month).toString().replace(/\s+/g, "")

	console.log("inMonth:", _month)

	switch (_month) {
		case "1" || "01":
			return "فروردین"
		case "2" || "02":
			return "اردیبهشت"
		case "3" || "03":
			return "خرداد"
		case "4" || "04":
			return "تیر"
		case "5" || "05":
			return "مرداد"
		case "6" || "06":
			return "شهریور"
		case "7" || "07":
			return "مهر"
		case "8" || "08":
			return "آبان"
		case "9" || "09":
			return "آذر"
		case "10":
			return "دی"
		case "11":
			return "بهمن"
		case "12":
			return "اسفند"
		default:
			break
	}
}

export default useMonthToString
