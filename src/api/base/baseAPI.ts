export type HttpMethod = "GET" | "POST" | "PATCH";

interface RequestConfig {
  path: string;
  headers?: Headers;
  fullPath?: boolean;
  json?: boolean;
  payload?: unknown;
}

export const getDefaultJsonHeaders = (): Headers => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  return headers;
};

export const baseRequest = async (
  method: HttpMethod,
  { path, headers, fullPath = false, payload, json }: RequestConfig,
): Promise<Response> => {
  const host = process.env.NEXT_PUBLIC_API_HOST;
  if (host == null) {
    throw new Error("API host not set. Unable to make requests");
  }

  const requestPath = fullPath ? path : `${host}${path}`;
  let requestHeaders = null;
  if (headers == null && json) {
    requestHeaders = getDefaultJsonHeaders();
  } else {
    requestHeaders = new Headers();
  }

  let requestBody = undefined;
  if (json) {
    requestBody = JSON.stringify(payload);
  } else {
    requestBody = payload;
  }

  const controller = new AbortController();
  const requestConfig: RequestInit = {
    method,
    headers: requestHeaders,
    body: requestBody as BodyInit,
    signal: controller.signal,
  };

  const timeout = 5000;
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  console.log(
    "Requesting to",
    requestPath,
    "with config",
    JSON.stringify(requestConfig, null, 2),
  );

  try {
    const response = await fetch(requestPath, requestConfig);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
