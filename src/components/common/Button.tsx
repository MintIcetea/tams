import clsx from "clsx";
import { HTMLAttributes, ReactElement, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  className,
  disabled,
  onClick,
}: ButtonProps): ReactElement<ButtonProps> => {
  const handleOnClick = () => {
    if (disabled || !onClick) {
      return;
    }

    onClick();
  };

  return (
    <div
      className={clsx("px-4 py-2 rounded-lg cursor-pointer", className)}
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
};

export default Button;
