import { baseRequest } from "@/api/base/baseAPI";

export const requestForceLogin = async (username: string): Promise<boolean> => {
  const path = `/${username}/force-login`;

  try {
    const response = await baseRequest("POST", { path });
    if (!response.ok) {
      throw new Error(`Bad response code ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Failed to force login for",
      username,
      JSON.stringify(error, null, 2),
    );
    return false;
  }

  return true;
};

export const requestFlow = async (username: string) => {
  const path = `/${username}/flow`;
  try {
    const response = await baseRequest("POST", { path });
    if (!response.ok) {
      throw new Error(`Bad response code ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Failed to execute flow for",
      username,
      JSON.stringify(error, null, 2),
    );
    return false;
  }

  return true;
};

export const requestRefresh = async (username: string) => {
  const path = `/${username}/refresh`;
  try {
    const response = await baseRequest("POST", { path });
    if (!response.ok) {
      throw new Error(`Bad response code ${response.status}`);
    }
  } catch (error) {
    console.error(
      "Failed to refresh status for",
      username,
      JSON.stringify(error, null, 2),
    );
    return false;
  }

  return true;
};
