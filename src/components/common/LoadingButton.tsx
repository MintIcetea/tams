import clsx from "clsx";
import {
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface LoadingButtonProps {
  children: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  onClick?: () => Promise<void>;
}

const baseText = "Loading...";

const LoadingButton = ({
  children,
  className,
  onClick,
}: LoadingButtonProps): ReactElement<LoadingButtonProps> => {
  const [waitingText, setWaitingText] = useState(baseText);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const intervalId = setInterval(() => {
      setWaitingText((text) => {
        if (text.length < baseText.length) {
          return baseText.slice(0, text.length + 1);
        }

        if (text.length === baseText.length) {
          return baseText.slice(0, 1);
        }

        return baseText;
      });
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [loading]);

  const handleClick = async () => {
    if (!onClick) {
      return;
    }

    setLoading(true);
    await onClick().finally(() => setLoading(false));
  };

  return (
    <div
      className={clsx("rounded-lg cursor-pointer", className)}
      onClick={handleClick}
    >
      {loading ? (
        <button
          type="button"
          className="inline-flex items-center bg-gray-400 px-4 py-2 rounded-md transition ease-in-out duration-150 cursor-not-allowed"
          disabled
        >
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="w-20">{waitingText}</span>
        </button>
      ) : (
        <div
          className={clsx("px-4 py-2 rounded-lg cursor-pointer", className)}
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default LoadingButton;
