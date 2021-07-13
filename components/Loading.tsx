import { Flex, FlexProps, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsLoading } from "../redux";

const Loading = ({ isLoading }) => {
  const MotionFlex = motion<FlexProps>(Flex);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "easeInOut",
        duration: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.2,
      y: "100%",
      transition: {
        type: "easeInOut",
        duration: 0.4,
      },
    },
  };
  const containerVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "easeInOut",
        duration: 0.2,
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.2,
      transition: {
        type: "easeInOut",
        duration: 0.2,
      },
    },
  };
  return (
    <AnimatePresence>
      {isLoading && (
        <MotionFlex
          initial="hidden"
          exit="hidden"
          animate="visible"
          variants={containerVariants}
          pos="fixed"
          h="100vh"
          w="100%"
          zIndex="100"
          bgColor="rgba(0,0,0,0.3)"
          justifyContent="center"
          alignItems="center">
          <MotionFlex
            initial="hidden"
            exit="hidden"
            animate="visible"
            variants={variants}
            h="320px"
            borderRadius=".5rem"
            w="420px"
            boxShadow="md"
            bgColor="white"
            alignItems="center"
            justifyContent="center"
            pos="relative">
            <Text
              p="1rem .5rem"
              fontWeight="bold"
              borderRadius=".5rem"
              fontSize="4rem"
              bgColor="red.100"
              fontFamily="monospace">
              WOOD SHOP
            </Text>
            <Progress
              pos="absolute"
              bottom="2rem"
              h="8px"
              w="100%"
              colorScheme="pink"
              isIndeterminate
            />
          </MotionFlex>
        </MotionFlex>
      )}
    </AnimatePresence>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
});

export default connect(mapStateToProps)(Loading);
