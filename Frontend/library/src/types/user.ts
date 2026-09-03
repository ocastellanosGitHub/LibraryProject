export type UserRole = "Admin" | "User";

export type User = {
  id: number;
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RegisterUserInput = {
  username: string;
  password: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
};
