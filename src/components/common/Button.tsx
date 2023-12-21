import clsx from "clsx";
import { HTMLAttributes, ReactElement, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  onClick?: () => void;
}

const Button = ({
  children,
  className,
  onClick,
}: ButtonProps): ReactElement<ButtonProps> => {
  return (
    <div
      className={clsx("px-4 py-2 rounded-lg cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
