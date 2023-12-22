import { ReactElement, ReactNode } from "react";

interface ErrorTextProps {
  children: ReactNode;
}

const ErrorText = ({
  children,
}: ErrorTextProps): ReactElement<ErrorTextProps> => {
  return <div className="text-sm text-red-600 py-1">{children}</div>;
};

export default ErrorText;
