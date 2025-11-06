export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  isRecurring: boolean;
  date: string;
  createdAt: string;
}

export interface ExpenseInput {
  name: string;
  amount: number;
  category: string;
  isRecurring: boolean;
  date: string;
}

export const MONTHLY_BUDGET_LIMIT = 350;
export const RECURRING_EXPENSES = {
  RENT: { name: 'Rent', amount: 100, category: 'Housing' },
  INTERNET: { name: 'Internet', amount: 50, category: 'Utilities' },
  COLLEGE: { name: 'College', amount: 70, category: 'Education' },
};
