import { fetchAllAccounts } from "@/api/tams/account/account";
import { AccountMetadata } from "@/utils/app.type";
import { useCallback, useEffect, useState } from "react";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<AccountMetadata[]>([]);

  const loadData = useCallback(async () => {
    const data = await fetchAllAccounts();
    setAccounts(data);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return {
    accounts,
    loadData,
  };
};
