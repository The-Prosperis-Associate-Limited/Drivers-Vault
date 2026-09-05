export type UserRole = "DRIVER" | "CLIENT" | "ADMIN";

export type AccountStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED";

export type ClientType = "INDIVIDUAL" | "ORGANISATION";

export interface ClientProfile {
  id: string;
  client_type: ClientType;
  organisation_name: string | null;
  organisation_size: number | null;
  industry: string | null;
}

export interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_no: string | null;
  whatsapp_number: string | null;
  profile_pic: string | null;
  bio: string | null;
  role: UserRole;
  country: string | null;
  state_of_residence: string | null;
  city: string | null;
  address: string | null;
  has_validated_email: boolean;
  account_status: AccountStatus;
  client_profile?: ClientProfile | null;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: User;
  token: AuthTokens;
}
