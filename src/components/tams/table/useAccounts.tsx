import { fetchAllAccounts } from "@/api/tams/account/account";
import { AccountMetadata } from "@/utils/app.type";
import { useCallback, useEffect, useState } from "react";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<AccountMetadata[]>([]);

  // For dealing with searching and filtering without affecting source data
  const [bufferAccounts, setBufferAccounts] = useState<AccountMetadata[]>([]);

  const loadData = useCallback(async () => {
    const data = await fetchAllAccounts();
    setAccounts(data);
    setBufferAccounts(data);
  }, []);

  const resetBufferData = useCallback(() => {
    setBufferAccounts(accounts);
  }, [accounts]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    accounts,
    bufferAccounts,
    resetBufferData,
    setBufferAccounts,
    loadData,
  };
};
