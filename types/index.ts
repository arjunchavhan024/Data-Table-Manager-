export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
}

export interface Column {
  id: string;
  label: string;
  visible: boolean;
  type: 'string' | 'number' | 'email';
  required?: boolean;
}

export interface TableState {
  data: TableRow[];
  filteredData: TableRow[];
  columns: Column[];
  searchQuery: string;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  page: number;
  rowsPerPage: number;
  editingRows: Set<string>;
  theme: 'light' | 'dark';
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
}