import Database from 'better-sqlite3';
import path from 'path';
import { Expense, ExpenseInput, RECURRING_EXPENSES } from './types';

const dbPath = path.join(process.cwd(), 'expenses.db');
const db = new Database(dbPath);

// Initialize database schema
export function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      isRecurring INTEGER NOT NULL DEFAULT 0,
      date TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check if we need to seed recurring expenses
  const count = db.prepare('SELECT COUNT(*) as count FROM expenses WHERE isRecurring = 1').get() as { count: number };
  
  if (count.count === 0) {
    seedRecurringExpenses();
  }
}

// Seed recurring expenses
function seedRecurringExpenses() {
  const now = new Date().toISOString().split('T')[0];
  const insert = db.prepare(`
    INSERT INTO expenses (name, amount, category, isRecurring, date)
    VALUES (?, ?, ?, 1, ?)
  `);

  insert.run(RECURRING_EXPENSES.RENT.name, RECURRING_EXPENSES.RENT.amount, RECURRING_EXPENSES.RENT.category, now);
  insert.run(RECURRING_EXPENSES.INTERNET.name, RECURRING_EXPENSES.INTERNET.amount, RECURRING_EXPENSES.INTERNET.category, now);
  insert.run(RECURRING_EXPENSES.COLLEGE.name, RECURRING_EXPENSES.COLLEGE.amount, RECURRING_EXPENSES.COLLEGE.category, now);
}

// Get all expenses
export function getAllExpenses(): Expense[] {
  const stmt = db.prepare('SELECT * FROM expenses ORDER BY date DESC, createdAt DESC');
  return stmt.all() as Expense[];
}

// Get expenses for current month
export function getCurrentMonthExpenses(): Expense[] {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
  
  const stmt = db.prepare('SELECT * FROM expenses WHERE date BETWEEN ? AND ? ORDER BY date DESC');
  return stmt.all(firstDay, lastDay) as Expense[];
}

// Add new expense
export function addExpense(expense: ExpenseInput): Expense {
  const stmt = db.prepare(`
    INSERT INTO expenses (name, amount, category, isRecurring, date)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    expense.name,
    expense.amount,
    expense.category,
    expense.isRecurring ? 1 : 0,
    expense.date
  );

  return {
    id: result.lastInsertRowid as number,
    ...expense,
    createdAt: new Date().toISOString(),
  };
}

// Delete expense
export function deleteExpense(id: number): void {
  const stmt = db.prepare('DELETE FROM expenses WHERE id = ?');
  stmt.run(id);
}

// Update expense
export function updateExpense(id: number, expense: Partial<ExpenseInput>): void {
  const updates: string[] = [];
  const values: any[] = [];

  if (expense.name !== undefined) {
    updates.push('name = ?');
    values.push(expense.name);
  }
  if (expense.amount !== undefined) {
    updates.push('amount = ?');
    values.push(expense.amount);
  }
  if (expense.category !== undefined) {
    updates.push('category = ?');
    values.push(expense.category);
  }
  if (expense.isRecurring !== undefined) {
    updates.push('isRecurring = ?');
    values.push(expense.isRecurring ? 1 : 0);
  }
  if (expense.date !== undefined) {
    updates.push('date = ?');
    values.push(expense.date);
  }

  if (updates.length > 0) {
    values.push(id);
    const stmt = db.prepare(`UPDATE expenses SET ${updates.join(', ')} WHERE id = ?`);
    stmt.run(...values);
  }
}

// Calculate total for current month
export function getCurrentMonthTotal(): number {
  const expenses = getCurrentMonthExpenses();
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

// Initialize the database when this module is imported
initDB();
