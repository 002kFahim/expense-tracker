import axios from "axios";
import { Expense, ExpenseFormData, AuthResponse, ExpenseStats } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export const expenseApi = {
  createExpense: async (data: ExpenseFormData): Promise<Expense> => {
    const response = await api.post("/expenses", data);
    return response.data;
  },
  getExpenses: async (filters?: {
    category?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== "All")
      params.append("category", filters.category);
    if (filters?.startDate) params.append("startDate", filters.startDate);
    if (filters?.endDate) params.append("endDate", filters.endDate);

    const response = await api.get(`/expenses?${params.toString()}`);
    return response.data;
  },
  updateExpense: async (
    id: string,
    data: ExpenseFormData
  ): Promise<Expense> => {
    const response = await api.patch(`/expenses/${id}`, data);
    return response.data;
  },
  deleteExpense: async (id: string): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },
  getStats: async (): Promise<ExpenseStats> => {
    const response = await api.get("/expenses/stats");
    return response.data;
  },
};

export default api;
