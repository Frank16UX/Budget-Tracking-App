import { NextResponse } from 'next/server';
import { deleteExpense, updateExpense, getCurrentMonthTotal } from '@/lib/db';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    deleteExpense(parseInt(id));
    const total = getCurrentMonthTotal();
    
    return NextResponse.json({ success: true, total });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    updateExpense(parseInt(id), body);
    const total = getCurrentMonthTotal();
    
    return NextResponse.json({ success: true, total });
  } catch (error) {
    console.error('Error updating expense:', error);
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 });
  }
}
