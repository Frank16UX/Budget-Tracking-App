import { NextResponse } from 'next/server';
import { getAllExpenses, getCurrentMonthExpenses, addExpense, deleteExpense, getCurrentMonthTotal } from '@/lib/db';
import { ExpenseInput } from '@/lib/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currentMonth = searchParams.get('currentMonth') === 'true';
    
    const expenses = currentMonth ? getCurrentMonthExpenses() : getAllExpenses();
    const total = getCurrentMonthTotal();
    
    return NextResponse.json({ expenses, total });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ExpenseInput;
    
    // Validate input
    if (!body.name || !body.amount || !body.category || !body.date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const expense = addExpense(body);
    const total = getCurrentMonthTotal();
    
    return NextResponse.json({ expense, total });
  } catch (error) {
    console.error('Error adding expense:', error);
    return NextResponse.json({ error: 'Failed to add expense' }, { status: 500 });
  }
}
