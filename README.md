# Dynamic Data Table Manager

A comprehensive, production-ready data table management system built with Next.js, Redux Toolkit, Material-UI, and TypeScript. This application provides advanced features for managing tabular data with a beautiful, responsive interface.

![Dynamic Data Table Manager](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### Core Functionality
- **Dynamic Data Management**: Add, edit, delete, and manage rows with real-time updates
- **Advanced Search**: Global search across all visible columns with instant filtering
- **Smart Sorting**: Click column headers to sort data in ascending/descending order
- **Pagination**: Configurable rows per page (5, 10, 25, 50) with smooth navigation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Column Management
- **Dynamic Columns**: Add new columns with different data types (text, number, email)
- **Column Visibility**: Show/hide columns based on your needs
- **Drag & Drop Reordering**: Intuitive column reordering with visual feedback
- **Type Validation**: Built-in validation for different column types

### Data Import/Export
- **CSV Import**: Import data from CSV files with comprehensive validation
- **CSV Export**: Export filtered/sorted data to CSV format
- **Error Handling**: Detailed error reporting for import issues
- **Data Validation**: Email format validation, number range checks, and required field validation

### User Experience
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Inline Editing**: Edit cells directly in the table with save/cancel options
- **Confirmation Dialogs**: Safe delete operations with confirmation prompts
- **Loading States**: Smooth loading indicators and transitions
- **Persistent State**: Column preferences and theme settings saved locally

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dynamic-data-table-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind CSS
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── DataTable.tsx     # Main data table component
│   ├── DataTableManager.tsx # Main container component
│   ├── SearchBar.tsx     # Search functionality
│   ├── TablePagination.tsx # Pagination controls
│   ├── ManageColumnsDialog.tsx # Column management modal
│   ├── ImportExportButtons.tsx # CSV import/export
│   ├── ThemeToggle.tsx   # Dark/light theme switcher
│   └── DeleteConfirmDialog.tsx # Delete confirmation modal
├── hooks/                 # Custom React hooks
│   └── useTableData.ts   # Table data processing hook
├── providers/            # Context providers
│   ├── ReduxProvider.tsx # Redux store provider
│   └── ThemeProvider.tsx # Material-UI theme provider
├── store/                # Redux store configuration
│   ├── store.ts          # Store setup with persistence
│   └── tableSlice.ts     # Table state management
├── types/                # TypeScript type definitions
│   └── table.ts          # Table-related types
└── lib/                  # Utility functions
    └── utils.ts          # Helper utilities
```

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 13.5**: React framework with App Router
- **React 18.2**: UI library with hooks and modern features
- **TypeScript 5.2**: Type-safe development

### State Management
- **Redux Toolkit 2.0**: Predictable state container
- **React Redux 9.0**: React bindings for Redux
- **Redux Persist 6.0**: Persistent state storage

### UI Components & Styling
- **Material-UI 5.15**: React component library
- **Tailwind CSS 3.3**: Utility-first CSS framework
- **shadcn/ui**: High-quality component collection
- **Lucide React**: Beautiful icon library

### Data Handling
- **PapaParse 5.4**: CSV parsing and generation
- **File-saver 2.0**: Client-side file downloads

### Development Tools
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📊 Data Structure

### Table Row Interface
```typescript
interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: any; // Dynamic columns
}
```

### Column Configuration
```typescript
interface TableColumn {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email';
  visible: boolean;
  sortable: boolean;
}
```

## 🎯 Usage Examples

### Adding a New Column
1. Click the "Manage Columns" button
2. Enter column name and select type
3. Click "Add" to create the column
4. Use drag & drop to reorder columns
5. Toggle visibility with checkboxes

### Importing Data
1. Click "Import CSV" button
2. Select a CSV file with headers matching your columns
3. Review any validation errors
4. Data is automatically added to the table

### Exporting Data
1. Apply any filters or sorting you want
2. Click "Export CSV" button
3. File downloads with current view data

### Inline Editing
1. Click the edit icon (pencil) on any row
2. Modify the values in the input fields
3. Click save (checkmark) or cancel (X) to finish

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic functionality. The app works entirely client-side.

### Customization Options

#### Theme Configuration
Modify `providers/ThemeProvider.tsx` to customize Material-UI theme:
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});
```

#### Default Data
Update sample data in `store/tableSlice.ts`:
```typescript
const sampleData: TableRow[] = [
  // Your default data here
];
```

#### Pagination Options
Modify pagination options in `components/TablePagination.tsx`:
```typescript
rowsPerPageOptions={[5, 10, 25, 50, 100]}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

**Built with arjunchavhan024 ❤️ using modern web technologies**