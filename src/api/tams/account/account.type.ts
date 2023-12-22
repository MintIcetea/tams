export interface EditAccountPayload {
  username: string;
  password?: string;
  email: string;
  email_password?: string;
  cookies?: string;
  try_login: boolean;
  auto_email_confirmation_code: boolean;
}

export interface AddAccountPayload {
  username: string;
  password?: string;
  email?: string;
  email_password?: string;
  cookies?: string;
  try_login: boolean;
  auto_email_confirmation_code: boolean;
}
