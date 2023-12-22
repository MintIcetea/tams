import { baseRequest } from "@/api/base/baseAPI";
import { AddAccountPayload, EditAccountPayload } from "./type";
import { AccountMetadata } from "@/utils/app.type";

export const fetchAllAccounts = async (): Promise<AccountMetadata[]> => {
  const path = "/";

  let result: AccountMetadata[] = [];
  let response = null;
  try {
    response = await baseRequest("GET", { path });
    if (!response.ok) {
      throw new Error(`Bad response code ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Failed to fetch all accounts",
      JSON.stringify(error, null, 2),
    );
    return [];
  }

  try {
    const data = await response.json();
    result = data.data;
  } catch (error) {
    console.error("Failed to parse response as JSON");
    return [];
  }

  return result;
};

export const requestAddAccount = async (payload: AddAccountPayload) => {
  const path = "/";

  try {
    const response = await baseRequest("POST", { path, payload, json: true });
    if (!response.ok) {
      throw new Error(`Bad response code ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to add new account", JSON.stringify(error, null, 2));
    return false;
  }

  return true;
};

export const requestEditAccount = async (
  payload: EditAccountPayload,
  username: string,
): Promise<boolean> => {
  const path = `/${username}`;

  try {
    const response = await baseRequest("PATCH", { path, payload, json: true });
    if (!response.ok) {
      throw new Error(`Bad response code ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Failed to update info for",
      username,
      JSON.stringify(error, null, 2),
    );
    return false;
  }

  return true;
};

export const requestDeleteAccount = async (
  username: string,
): Promise<boolean> => {
  const path = `/${username}`;
  try {
    const response = await baseRequest("DELETE", { path });
    if (!response.ok) {
      throw new Error(`Bad response code ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to delete", username, JSON.stringify(error, null, 2));
    return false;
  }

  return true;
};
