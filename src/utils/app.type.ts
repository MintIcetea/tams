export type Maybe<T> = T | undefined | null;

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type AccountStatus =
  | "loaded"
  | "logged-in"
  | "errored"
  | "waiting-for-email"
  | "waiting-for-confirmation-code";

export interface AccountMetadata {
  username: string;
  email: string;
  has_password: boolean;
  has_email_password: boolean;
  has_cookies: boolean;
  status: string;
  error_reason: string;
  auto_email_confirmation_code: boolean;
  endpoints: AccountEndpoint[];
}

export type EndpointName =
  | "favoriters"
  | "following"
  | "search-timeline"
  | "retweeters";

export type EndpointStatus = "ok" | "errored" | "forbidden";

export interface AccountEndpoint {
  id: EndpointName;
  call_limit: number;
  status: EndpointStatus;
  pending: number;
  remaining: number;
  reset: number;
  error_reason: string;
}
