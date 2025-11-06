'use client';

import { useState, useEffect } from 'react';
import { Expense, ExpenseInput, MONTHLY_BUDGET_LIMIT } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, AlertCircle } from 'lucide-react';
import ExpenseTable from '@/components/ExpenseTable';
import ExpenseChart from '@/components/ExpenseChart';
import AddExpenseDialog from '@/components/AddExpenseDialog';
import { format } from 'date-fns';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadExpenses = async () => {
    try {
      const response = await fetch('/api/expenses?currentMonth=true');
      const data = await response.json();
      setExpenses(data.expenses);
      setCurrentTotal(data.total);
    } catch (error) {
      console.error('Failed to load expenses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleAddExpense = async (expense: ExpenseInput) => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      });
      
      const data = await response.json();
      setCurrentTotal(data.total);
      await loadExpenses();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      setCurrentTotal(data.total);
      await loadExpenses();
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  const remainingBudget = MONTHLY_BUDGET_LIMIT - currentTotal;
  const isOverBudget = currentTotal > MONTHLY_BUDGET_LIMIT;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Budget Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your monthly expenses and stay within budget
          </p>
        </div>

        {/* Budget Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Monthly Budget</CardDescription>
              <CardTitle className="text-3xl">${MONTHLY_BUDGET_LIMIT.toFixed(2)}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Spent</CardDescription>
              <CardTitle className={`text-3xl ${isOverBudget ? 'text-red-600' : ''}`}>
                ${currentTotal.toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Remaining</CardDescription>
              <CardTitle className={`text-3xl ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                ${remainingBudget.toFixed(2)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Budget Exceeded Alert */}
        {isOverBudget && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Warning:</strong> You have exceeded your monthly budget by ${Math.abs(remainingBudget).toFixed(2)}!
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Expenses - {format(new Date(), 'MMMM yyyy')}</CardTitle>
                <CardDescription>View and manage your monthly expenses</CardDescription>
              </div>
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="chart">Chart View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table" className="mt-6">
                <ExpenseTable 
                  expenses={expenses} 
                  onDelete={handleDeleteExpense}
                  isLoading={isLoading}
                />
              </TabsContent>
              
              <TabsContent value="chart" className="mt-6">
                <ExpenseChart expenses={expenses} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Expense Dialog */}
        <AddExpenseDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAdd={handleAddExpense}
        />
      </div>
    </div>
  );
}
