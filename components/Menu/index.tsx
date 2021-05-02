import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { motion } from "framer-motion"

const Menu = () => {
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true);

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		setVisible((prevScrollPos > currentScrollPos));
		console.log("Status: ", prevScrollPos > currentScrollPos)
		setPrevScrollPos(currentScrollPos);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [prevScrollPos, visible, handleScroll]);


	return (
		<motion.div
			animate={{
				top: visible ? "88px" : "-10px",
				opacity: visible ? 1 : 0
			}}
			transition={{
				type: "tween",
				delay:.02
			}}
			style={{
				padding: "4px 3px 8px 3px",
				width: "100%",
				zIndex: 3,
				position: "fixed",
				left: "0",
				// top: visible ? "85px" : "-85px",
				display: "flex",
				alignItems: "center",
				backgroundColor: "#AE4600",
				flexDirection: "row-reverse",
			}}
		>
			<MenuItem text="صندلی" />
			<MenuItem text="میز" />
			<MenuItem text="کمد" />
			<MenuItem text="کمد و طبقه بندی" />
		</motion.div>
	);
}

export default Menu;