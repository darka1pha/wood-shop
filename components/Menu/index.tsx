import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { motion } from "framer-motion"
import { Box } from "@chakra-ui/layout";

const Menu = () => {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		setVisible((prevScrollPos > currentScrollPos));
		setPrevScrollPos(currentScrollPos);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [prevScrollPos, visible, handleScroll]);


	return (
		<Box
			display={{ base: "none", md: "block" }}
		>
			<motion.div
				animate={{
					top: visible ? "85px" : "-10px",
					opacity: visible ? 1 : 0
				}}
				transition={{
					type: "tween",
					delay: .02
				}}
				style={{
					padding: "4px 3px 8px 3px",
					width: "100%",
					zIndex: 3,
					position: "fixed",
					left: "0",
					display: "flex",
					alignItems: "center",
					backgroundColor: "#42301e",
					flexDirection: "row-reverse",
				}}
			>
				<MenuItem text="صندلی" />
				<MenuItem text="میز" />
				<MenuItem text="کمد" />
				<MenuItem text="کمد و طبقه بندی" />
			</motion.div>
		</Box>
	);
}

export default Menu;