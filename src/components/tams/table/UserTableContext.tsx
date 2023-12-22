import { createContext } from "react";

interface UsersUtils {
  refreshData: () => Promise<void>;
}

export const createUsersUtilsContext = () => {
  return createContext<UsersUtils>({
    refreshData: () => Promise.resolve(),
  });
};
