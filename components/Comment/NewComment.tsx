import { Button } from "@chakra-ui/button";
import { Input, InputGroup } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect, useReducer } from "react";
// import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Text } from "..";
import RatingContainer from "./RatingContainer";
import { reducer } from './inputReducer'

const NewComment = () => {

	const [posValues, setPosValues] = useReducer(reducer, [""]);
	const [negValues, setNegValues] = useReducer(reducer, [""]);

	useEffect(() => {
		// Positive Values
		if (posValues[posValues.length - 1] && posValues.length < 5) {
			setPosValues({ type: "add" });
		} else if (posValues.length > 1 && !posValues[posValues.length - 2]) {
			setPosValues({ type: "remove" });
		}

		console.log(posValues)

		// Negative Values
		if (negValues[negValues.length - 1] && negValues.length < 5) {
			setNegValues({ type: "add" });
		} else if (negValues.length > 1 && !negValues[negValues.length - 2]) {
			setNegValues({ type: "remove" });
		}
	}, [posValues, negValues]);

	const sendComment = () => {
		alert("sendComment")
	}

	const ratingTitles = [{
		title: "امکانات",
		rate: 0
	}, {
		title: "ارزش نسبت به قیمت",
		rate: 0
	}, {
		title: "کیفیت ساخت",
		rate: 0
	}, {
		title: "طراحی و ظاهر",
		rate: 0
	}]
	return (
		<Flex
			w="100%"
			dir="rtl"
			flexDir="column"
			justifyContent="center"
			m="3rem 0"
		>
			<Flex
				w="100%"
				maxW="1280px"
				flexDir="column"
				p={{ base: "0 1rem", md: 0 }}
			>
				<Text color="black" variant="heading6">
					نوشتن نظر
        </Text>
				<Flex
					flexDir="column"
					p="0 1rem"
					m="1rem 0"
				>
					<Text mb=".5rem" color="black" whiteSpace="nowrap" variant="normalExt">
						نام شما
          			</Text>
					<Input
						fontFamily="iranSans"
						p=".5rem .5rem"
						border="1px solid #BDBDBD"
						h="35px"
						_focus={{
							outline: "none",
							border: "1px solid #BDBDBD"
						}}
						w="220px"
						fontSize={{ base: "12px", md: "1rem" }}
					/>
				</Flex>
				<Flex
					flexDir="column"
					p="0 1rem"
					mb="1rem"
				>
					<Text mb=".5rem" color="black" whiteSpace="nowrap" variant="normalExt">
						پیام شما
          </Text>
					<Textarea
						border="1px solid #BDBDBD"
						maxH="200px"
						minH="150px"
						p="1rem"
						maxW="920px"
						_focus={{
							outline: "none",
							border: "1px solid #BDBDBD"
						}}
						fontFamily="iranSans"
						fontSize={{ base: "12px", md: "1rem" }}
					/>
				</Flex>
				<Flex flexDir="column">
					{
						ratingTitles.map(({ rate, title }, key) => (
							<RatingContainer mr=".5rem" editable title={title} rate={rate} key={key} />
						))
					}
				</Flex>
				<Flex flexDir={{ base: "column", md: "row" }} m="2rem 1rem">
					<Flex ml="5rem">
						<Flex>
							<Text
								ml="1rem"
								mt=".5rem"
								whiteSpace="nowrap"
								color="#2C9B37"
								variant="normalExt"
							>
								نقاط قوت
							</Text>
						</Flex>
						<Flex flexDir="column">
							{
								posValues.map((input, index) => (
									<Input
										key={index}
										value={input}
										onChange={(e) =>
											setPosValues({
												type: "change",
												payload: { index, value: e.target.value }
											})
										}
										fontFamily="iranSans"
										border="1px solid #BDBDBD"
										p=".2rem .5rem"
										mb=".5rem"
										_focus={{
											outline: "none",
											border: "1px solid #BDBDBD"
										}}
										w="220px"
										fontSize={{ base: "12px", md: "1rem" }}
									/>
								))
							}
						</Flex>
					</Flex>
					<Flex>
						<Flex>
							<Text
								ml={{ base: ".5rem", md: "1rem" }}
								mt=".5rem"
								whiteSpace="nowrap"
								color="#DE2D2D"
								variant="normalExt"
							>
								نقاط ضعف
							</Text>
						</Flex>
						<Flex flexDir="column">
							{
								negValues.map((input, index) => (
									<Input
										key={index}
										value={input}
										onChange={(e) =>
											setNegValues({
												type: "change",
												payload: { index, value: e.target.value }
											})
										}
										fontFamily="iranSans"
										border="1px solid #BDBDBD"
										p=".2rem .5rem"
										mb=".5rem"
										_focus={{
											outline: "none",
											border: "1px solid #BDBDBD"
										}}
										w="220px"
										fontSize={{ base: "12px", md: "1rem" }}
									/>
								))
							}
						</Flex>
					</Flex>
				</Flex>
				<Flex flexDir={{ base: "column", md: "row" }} alignItems="center">
					<Flex alignItems="center">
						<Text
							color="black"
							whiteSpace="nowrap"
							variant="normalExt"
							ml="1rem"
							fontSize={{ base: "12px", md: "14px" }}
						>
							آیا خرید این محصول را پیشنهاد میکنید؟
					</Text>
						<Select
							defaultValue="option1"
							_focus={{
								outline: "none"
							}}
							w="80px"
							dir="ltr"
							fontFamily="iranSans"
							fontSize={{ base: "12px", md: "14px" }}
							h={{ base: "30px", md: "40px" }}
						>
							<option value="option1">بله</option>
							<option value="option2">خیر</option>
						</Select>
					</Flex>
					<Button
						m={{ base: "1rem", md: "0 1rem" }}
						color="white"
						bgColor="#FF4D4D"
						fontFamily="iranSans"
						fontWeight="400"
						p="0 2rem"
						_hover={{
							bgColor: "btnBg"
						}}
						_focus={{
							outline: "none",
						}}
						_active={{
							bgColor: "btnActive",
							opacity: 0.8
						}}
						onClick={sendComment}
					>
						ارسال
					</Button>
				</Flex>
			</Flex>
		</Flex >
	);
}

export default NewComment;