# Budget Tracking App - Quick Start Guide

## 🎉 Your App is Ready!

The budget tracking application has been successfully built and is now running at:
**http://localhost:3000**

## ✨ What's Included

### Core Features
- **Budget Management**: $350 monthly budget with automatic tracking
- **Pre-configured Recurring Expenses**:
  - Rent: $100
  - Internet: $50
  - College: $70
- **Table View**: Clean, Notion-like interface to manage expenses
- **Chart View**: Visual analytics with bar and pie charts
- **Add Expense Dialog**: Easy form to add new expenses
- **Budget Alerts**: Automatic warnings when you exceed your limit
- **SQLite Database**: All data persists locally

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- SQLite (better-sqlite3)
- Recharts
- Lucide React icons

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository** (if needed):
```bash
git clone <your-repo-url>
cd dani-test
```

2. **Install dependencies**:
```bash
npm install
```

This command reads `package.json` and downloads all required packages into the `node_modules` folder.

### Start the App
```bash
npm run dev
```

### Using the App
1. **View Budget Overview**: See your monthly budget, total spent, and remaining balance at the top
2. **Add Expenses**: Click "Add Expense" button to open the form
3. **Fill Details**:
   - Name (e.g., "Groceries")
   - Amount (in dollars)
   - Category (Housing, Food, etc.)
   - Date
   - Check "recurring" if it's a monthly expense
4. **Submit**: Click "Add Expense" to save
5. **View Data**: Switch between Table and Chart views using tabs
6. **Delete Expenses**: Click trash icon in table to remove items

### Budget Alerts
When your total expenses exceed $350, you'll see a red alert banner showing:
- Warning message
- Amount over budget
- Visual indicators (red text on totals)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/expenses/          # REST API endpoints
│   │   ├── route.ts           # GET (list) & POST (create)
│   │   └── [id]/route.ts      # DELETE & PATCH (update)
│   ├── page.tsx               # Main application page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── ExpenseTable.tsx       # Table view component
│   ├── ExpenseChart.tsx       # Chart visualizations
│   └── AddExpenseDialog.tsx   # Add expense modal
└── lib/
    ├── db.ts                  # Database utilities
    ├── types.ts               # TypeScript interfaces
    └── utils.ts               # Helper functions
```

## 🎨 Customization

### Change Budget Limit
Edit `src/lib/types.ts`:
```typescript
export const MONTHLY_BUDGET_LIMIT = 350; // Your new limit
```

### Modify Recurring Expenses
Edit `src/lib/types.ts`:
```typescript
export const RECURRING_EXPENSES = {
  RENT: { name: 'Rent', amount: 100, category: 'Housing' },
  // Add or modify as needed
};
```

### Add More Categories
Edit `src/components/AddExpenseDialog.tsx`:
```typescript
const CATEGORIES = [
  'Housing',
  'Utilities',
  // Add your categories
];
```

## 💾 Database

- **Location**: `expenses.db` (root directory)
- **Type**: SQLite
- **Auto-seeded**: First run automatically adds recurring expenses
- **Persistent**: Data survives server restarts

### Database Schema
```sql
CREATE TABLE expenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  amount REAL NOT NULL,
  category TEXT NOT NULL,
  isRecurring INTEGER NOT NULL DEFAULT 0,
  date TEXT NOT NULL,
  createdAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)
```

## 🔧 Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Run production build
npm run lint      # Run ESLint
```

## 📊 Features Breakdown

### Table View
- List all expenses in a clean table
- Sort by date (newest first)
- Category badges
- Recurring/One-time badges
- Delete functionality
- Responsive design

### Chart View
- **Bar Chart**: Expenses by category
- **Pie Chart 1**: Recurring vs One-time breakdown
- **Pie Chart 2**: Category distribution
- Interactive tooltips
- Responsive charts

### Budget Tracking
- Real-time total calculation
- Current month filtering
- Visual indicators:
  - Green for under budget
  - Red for over budget
- Alert banner for overage

## 🐛 Troubleshooting

### Server Won't Start
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9

# Restart
npm run dev
```

### Database Issues
```bash
# Delete and recreate
rm expenses.db
npm run dev  # Will auto-seed on restart
```

### TypeScript Errors
The app may show some TypeScript linting errors in VSCode due to the React Compiler feature. These don't affect functionality. The app runs correctly despite these warnings.

## 🎯 Next Steps

Consider adding:
- [ ] Edit existing expenses
- [ ] Filter by date range
- [ ] Export to CSV
- [ ] Multiple budget categories
- [ ] Monthly/yearly comparisons
- [ ] Search functionality
- [ ] Expense notes/descriptions
- [ ] Recurring expense automation

## 📝 Notes

- The app uses **Turbopack** for fast development builds
- Database is **automatically initialized** on first run
- **Dark mode** is supported out of the box
- All dates are stored in **ISO format** (YYYY-MM-DD)
- Amounts are stored as **floating-point numbers** for precision

---

**Enjoy tracking your budget! 💰**
