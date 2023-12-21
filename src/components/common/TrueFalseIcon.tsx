import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { ReactElement } from "react";

interface TrueFalseIconProps {
  check: boolean;
}

const TrueFalseIcon = ({
  check,
}: TrueFalseIconProps): ReactElement<TrueFalseIconProps> => {
  return check ? <CheckIcon /> : <Cross2Icon />;
};

export default TrueFalseIcon;
