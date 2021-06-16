import { AnimatePresence, motion } from "framer-motion";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAlertInfo } from "../redux";

interface IAlert {
  info: {
    type?: "error" | "success" | "warning";
    content?: string;
  };
}

const AlertBox = ({ info }: IAlert) => {
  const variants = {
    visible: {
      opacity: 1,
      right: "1rem",
      transition: {
        type: "tween",
        duration: 0.6,
      },
    },
    hidden: {
      opacity: 0,
      right: "-10rem",
      transition: {
        type: "tween",
        duration: 0.6,
      },
    },
  };

  const present = {
    visible: {
      opacity: 1,
      width: "0%",
      transition: {
        type: "tween",
        duration: 5,
      },
    },
    hidden: {
      opacity: 1,
      width: "100%",
      transition: {
        type: "ease",
        duration: 5,
      },
    },
  };

  const { content, type } = info;
  return (
    <AnimatePresence>
      {!content ||
        (content.length > 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            style={{
              height:"45px",
              borderRadius: ".5rem",
              zIndex:"10",
              fontFamily: "iranSans",
              fontSize:"14px",
              position: "fixed",
              bottom: "1rem",
              color: "white",
              padding: ".6rem 1rem",
              backgroundColor:
                type === "error"
                  ? "rgba(255, 9, 9,0.7)"
                  : type === "success"
                  ? "rgba(30, 227, 82,.7)"
                  : "rgba(250, 141, 25,.7)",
              minWidth: "140px",
              direction: "rtl",
            }}>
            {content}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={present}
              style={{
                backgroundColor: "white",
                bottom: ".4rem",
                right: "0",
                height: "3px",
                position: "absolute",
                display:"flex",
                flexDirection:"row-reverse"
              }}
            />
          </motion.div>
        ))}
    </AnimatePresence>
  );
};

const mapStateToProps = createStructuredSelector({
  info: selectAlertInfo,
});

export default connect(mapStateToProps)(AlertBox);
