# Budget Tracking App

A modern budget tracking application built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and SQLite. Track your monthly expenses, visualize spending patterns, and stay within your budget with real-time alerts.

## Features

✨ **Key Features:**
- 📊 **Table View**: Notion-like table interface to view and manage all expenses
- 📈 **Chart View**: Interactive charts showing expense breakdown by category and type
- 💰 **Budget Tracking**: Set monthly budget limit ($350) with automatic alerts
- 🔁 **Recurring Expenses**: Pre-configured recurring expenses (Rent, Internet, College)
- ➕ **Manual Expenses**: Easy-to-use dialog to add one-time expenses
- 🚨 **Budget Alerts**: Visual alerts when you exceed your monthly budget
- 💾 **SQLite Database**: Persistent storage with better-sqlite3
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: SQLite (better-sqlite3)
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Initial Setup

The app comes pre-configured with three recurring expenses:
- **Rent**: $100 (Housing)
- **Internet**: $50 (Utilities)
- **College**: $70 (Education)

These expenses are automatically seeded in the database on first run.

## Usage

### Adding Expenses

1. Click the **"Add Expense"** button
2. Fill in: Name, Amount, Category, Date
3. Check "This is a recurring expense" if applicable
4. Click **"Add Expense"** to save

### Viewing Expenses

**Table View**: Detailed table with delete functionality
**Chart View**: Bar and pie charts showing spending patterns

### Budget Monitoring

- **Monthly Budget**: $350.00
- **Total Spent**: Current month's total
- **Remaining**: Budget remaining (or overage)
- **Alert**: Red alert banner appears when budget is exceeded

## Project Structure

```
src/
├── app/
│   ├── api/expenses/          # API routes
│   ├── page.tsx               # Main app page
│   └── layout.tsx
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── AddExpenseDialog.tsx   # Add expense modal
│   ├── ExpenseChart.tsx       # Chart visualizations
│   └── ExpenseTable.tsx       # Expense table
└── lib/
    ├── db.ts                  # Database utilities
    └── types.ts               # TypeScript types
```

## Customization

### Change Budget Limit

Edit `src/lib/types.ts`:
```typescript
export const MONTHLY_BUDGET_LIMIT = 350; // Change this value
```

### Modify Recurring Expenses

Edit `src/lib/types.ts`:
```typescript
export const RECURRING_EXPENSES = {
  RENT: { name: 'Rent', amount: 100, category: 'Housing' },
  // Modify as needed
};
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

---

Built with Next.js, Tailwind CSS, and shadcn/ui
