import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableRow, Column, TableState } from '@/types';

const defaultColumns: Column[] = [
  { id: 'name', label: 'Name', visible: true, type: 'string', required: true },
  { id: 'email', label: 'Email', visible: true, type: 'email', required: true },
  { id: 'age', label: 'Age', visible: true, type: 'number', required: true },
  { id: 'role', label: 'Role', visible: true, type: 'string', required: true },
  { id: 'department', label: 'Department', visible: false, type: 'string' },
  { id: 'location', label: 'Location', visible: false, type: 'string' },
];

const sampleData: TableRow[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    role: 'Developer',
    department: 'Engineering',
    location: 'New York',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 32,
    role: 'Designer',
    department: 'Design',
    location: 'San Francisco',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    age: 45,
    role: 'Manager',
    department: 'Engineering',
    location: 'Chicago',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    age: 26,
    role: 'Analyst',
    department: 'Data',
    location: 'Boston',
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    age: 35,
    role: 'Developer',
    department: 'Engineering',
    location: 'Seattle',
  },
];

const initialState: TableState = {
  data: sampleData,
  filteredData: sampleData,
  columns: defaultColumns,
  searchQuery: '',
  sortField: null,
  sortDirection: 'asc',
  page: 0,
  rowsPerPage: 10,
  editingRows: new Set(),
  theme: 'light',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TableRow[]>) => {
      state.data = action.payload;
      state.filteredData = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.data.push(action.payload);
      state.filteredData = filterAndSortData(state);
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const index = state.data.findIndex(row => row.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
        state.filteredData = filterAndSortData(state);
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(row => row.id !== action.payload);
      state.filteredData = filterAndSortData(state);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredData = filterAndSortData(state);
      state.page = 0;
    },
    setSorting: (state, action: PayloadAction<{ field: string; direction: 'asc' | 'desc' }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
      state.filteredData = filterAndSortData(state);
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find(col => col.id === action.payload);
      if (column && !column.required) {
        column.visible = !column.visible;
      }
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      const exists = state.columns.find(col => col.id === action.payload.id);
      if (!exists) {
        state.columns.push(action.payload);
      }
    },
    toggleEditingRow: (state, action: PayloadAction<string>) => {
      const newEditingRows = new Set(state.editingRows);
      if (newEditingRows.has(action.payload)) {
        newEditingRows.delete(action.payload);
      } else {
        newEditingRows.add(action.payload);
      }
      state.editingRows = newEditingRows;
    },
    clearEditingRows: (state) => {
      state.editingRows = new Set();
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

function filterAndSortData(state: TableState): TableRow[] {
  let filtered = state.data;

  // Apply search filter
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(row =>
      Object.values(row).some(value =>
        value?.toString().toLowerCase().includes(query)
      )
    );
  }

  // Apply sorting
  if (state.sortField) {
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[state.sortField as keyof TableRow];
      const bValue = b[state.sortField as keyof TableRow];
      
      if (aValue < bValue) return state.sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}

export const {
  setData,
  addRow,
  updateRow,
  deleteRow,
  setSearchQuery,
  setSorting,
  setPage,
  setRowsPerPage,
  toggleColumnVisibility,
  addColumn,
  toggleEditingRow,
  clearEditingRows,
  toggleTheme,
} = tableSlice.actions;

export default tableSlice.reducer;