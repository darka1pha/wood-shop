import { Flex } from "@chakra-ui/layout";
import Text from "../Text";
import Rating from "./Rating";
import RatingContainer from "./RatingContainer";


const index = () => {
	const testData = {
		ratingTitles: [{
			title: "امکانات",
			rate: 2
		}, {
			title: "ارزش نسبت به قیمت",
			rate: 4
		}, {
			title: "کیفیت ساخت",
			rate: 1
		}, {
			title: "طراحی و ظاهر",
			rate: 2
		}],
		date: new Date(),
		name: "سید دانیال معین آل داوود",
		comment: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
	}
	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			w="100%"
		>
			<Flex
				w="100%"
				maxW="1280px"
				flexDir={{ base: "column", md: "row-reverse" }}
				bgColor="#F8F8F8"
				border="1px solid #BDBDBD"
				m="1rem 0"
				borderRadius=".4rem"
				p="1rem"
			>
				<Flex
					display={{ base: "flex", md: "none" }}
					flexDir="row-reverse"
					justifyContent="space-between"
				>
					<Text
						fontSize="12px"
						color="black"
						variant="normalExt"
					>
						{testData.name}
					</Text>
					<Text
						fontSize="12px"
						color="black"
						variant="normalExt"
					>
						{testData.date.toString()}
					</Text>
				</Flex>
				<Flex flexDir="column">
					{
						testData.ratingTitles.map(({ rate, title }, key) => (
							<RatingContainer title={title} rate={rate} key={key} />
						))
					}
				</Flex>
				<Flex
					shrink={1}
					flexDir="column"
					p="0 1rem"
				>
					<Flex
						justifyContent="space-between"
						w="100%"
						flexDir="row-reverse"
						mb="1rem"
					>
						<Text display={{ base: "none", md: "flex" }} color="black" variant="normalExt">
							{testData.name}
						</Text>
						<Text display={{ base: "none", md: "flex" }} color="black" variant="normalExt">
							{testData.date.toString()}
						</Text>
					</Flex>
					<Flex w="100%" shrink={1}>
						<Text dir="rtl" color="black" variant="normalExt">
							{testData.comment}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default index;