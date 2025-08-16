export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseFormData {
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CategoryStats {
  _id: string;
  total: number;
  count: number;
}

export interface ExpenseStats {
  categoryStats: CategoryStats[];
  totalAmount: number;
}
