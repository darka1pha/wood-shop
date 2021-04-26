import React from "react";
import { Text as ChText, TextProps as ChTextProps } from "@chakra-ui/react";

import { TextVariants } from "../theme";

interface TextProps extends ChTextProps {
  variant: keyof typeof TextVariants;
  children: string;
}

const Text = ({ variant, ...props }: TextProps) => (
  <ChText {...TextVariants[variant]} {...props} />
);

export default Text;
