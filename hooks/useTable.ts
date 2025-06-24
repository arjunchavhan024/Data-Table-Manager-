import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import * as tableActions from '@/store/tableSlice';

export const useTable = () => {
  const dispatch = useDispatch();
  const tableState = useSelector((state: RootState) => state.table);

  const actions = {
    setData: (data: any[]) => dispatch(tableActions.setData(data)),
    addRow: (row: any) => dispatch(tableActions.addRow(row)),
    updateRow: (row: any) => dispatch(tableActions.updateRow(row)),
    deleteRow: (id: string) => dispatch(tableActions.deleteRow(id)),
    setSearchQuery: (query: string) => dispatch(tableActions.setSearchQuery(query)),
    setSorting: (field: string, direction: 'asc' | 'desc') => 
      dispatch(tableActions.setSorting({ field, direction })),
    setPage: (page: number) => dispatch(tableActions.setPage(page)),
    setRowsPerPage: (rows: number) => dispatch(tableActions.setRowsPerPage(rows)),
    toggleColumnVisibility: (id: string) => dispatch(tableActions.toggleColumnVisibility(id)),
    addColumn: (column: any) => dispatch(tableActions.addColumn(column)),
    toggleEditingRow: (id: string) => dispatch(tableActions.toggleEditingRow(id)),
    clearEditingRows: () => dispatch(tableActions.clearEditingRows()),
    toggleTheme: () => dispatch(tableActions.toggleTheme()),
  };

  return {
    ...tableState,
    ...actions,
  };
};