import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow, Column, ImportError } from '@/types';

export const importCSV = (
  file: File
): Promise<{ data: TableRow[]; errors: ImportError[] }> => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: any) => {
        const data: TableRow[] = [];
        const errors: ImportError[] = [];

        result.data.forEach((row: any, index: number) => {
          const processedRow: TableRow = {
            id: crypto.randomUUID(),
            name: row.name || row.Name || '',
            email: row.email || row.Email || '',
            age: parseInt(row.age || row.Age) || 0,
            role: row.role || row.Role || '',
            department: row.department || row.Department || '',
            location: row.location || row.Location || '',
          };

          // Validate required fields
          if (!processedRow.name) {
            errors.push({
              row: index + 1,
              field: 'name',
              message: 'Name is required',
            });
          }

          if (!processedRow.email) {
            errors.push({
              row: index + 1,
              field: 'email',
              message: 'Email is required',
            });
          } else if (!isValidEmail(processedRow.email)) {
            errors.push({
              row: index + 1,
              field: 'email',
              message: 'Invalid email format',
            });
          }

          if (!processedRow.age || processedRow.age <= 0) {
            errors.push({
              row: index + 1,
              field: 'age',
              message: 'Age must be a positive number',
            });
          }

          if (!processedRow.role) {
            errors.push({
              row: index + 1,
              field: 'role',
              message: 'Role is required',
            });
          }

          data.push(processedRow);
        });

        resolve({ data, errors });
      },
    });
  });
};

export const exportCSV = (data: TableRow[], columns: Column[], filename: string = 'table-data.csv') => {
  const visibleColumns = columns.filter(col => col.visible);
  const headers = visibleColumns.map(col => col.label);
  
  const csvData = data.map(row => {
    const csvRow: any = {};
    visibleColumns.forEach(col => {
      csvRow[col.label] = row[col.id as keyof TableRow] || '';
    });
    return csvRow;
  });

  const csv = Papa.unparse({
    fields: headers,
    data: csvData,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, filename);
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};