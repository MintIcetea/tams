import { useCallback, useState } from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
