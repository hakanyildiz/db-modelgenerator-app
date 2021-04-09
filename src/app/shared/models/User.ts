export interface User {
  username?: string;
  token?: string;
  fullName?: string;
  vendor?: string;
  authenticated?: boolean;
  userGroups?: string;
  email?: string;
  resource_access?: any[];
  avatarUrl?: string;
  isAdmin?: boolean;
  customUserAttributes1?: string[];
  customUserAttributes2?: string[];
}
