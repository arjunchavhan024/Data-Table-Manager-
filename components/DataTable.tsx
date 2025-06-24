'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  TextField,
  Chip,
  Tooltip,
  TableSortLabel,
  Box,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useTable } from '@/hooks/useTable';
import { TableRow as TableRowType } from '@/types';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

export function DataTable() {
  const {
    filteredData,
    columns,
    page,
    rowsPerPage,
    sortField,
    sortDirection,
    editingRows,
    setPage,
    setRowsPerPage,
    setSorting,
    updateRow,
    deleteRow,
    toggleEditingRow,
    clearEditingRows,
  } = useTable();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);
  const [editedRows, setEditedRows] = useState<Record<string, Partial<TableRowType>>>({});

  const visibleColumns = columns.filter(col => col.visible);
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSorting(field, isAsc ? 'desc' : 'asc');
  };

  const handleEdit = (rowId: string) => {
    toggleEditingRow(rowId);
    const row = filteredData.find(r => r.id === rowId);
    if (row) {
      setEditedRows(prev => ({ ...prev, [rowId]: { ...row } }));
    }
  };

  const handleSave = (rowId: string) => {
    const editedRow = editedRows[rowId];
    if (editedRow) {
      updateRow(editedRow as TableRowType);
      toggleEditingRow(rowId);
      setEditedRows(prev => {
        const newState = { ...prev };
        delete newState[rowId];
        return newState;
      });
    }
  };

  const handleCancel = (rowId: string) => {
    toggleEditingRow(rowId);
    setEditedRows(prev => {
      const newState = { ...prev };
      delete newState[rowId];
      return newState;
    });
  };

  const handleFieldChange = (rowId: string, field: string, value: any) => {
    setEditedRows(prev => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: field === 'age' ? parseInt(value) || 0 : value,
      },
    }));
  };

  const handleDeleteClick = (rowId: string) => {
    setRowToDelete(rowId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (rowToDelete) {
      deleteRow(rowToDelete);
      setRowToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const renderCell = (row: TableRowType, column: any) => {
    const isEditing = editingRows.has(row.id);
    const value = isEditing ? 
      editedRows[row.id]?.[column.id] ?? row[column.id as keyof TableRowType] :
      row[column.id as keyof TableRowType];

    if (!isEditing) {
      if (column.id === 'role') {
        return (
          <Chip 
            label={value} 
            size="small" 
            variant="outlined"
            color="primary"
          />
        );
      }
      return value;
    }

    return (
      <TextField
        size="small"
        type={column.type === 'number' ? 'number' : 'text'}
        value={value || ''}
        onChange={(e) => handleFieldChange(row.id, column.id, e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ minWidth: 120 }}
      />
    );
  };

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={sortField === column.id}
                    direction={sortField === column.id ? sortDirection : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    <Typography variant="subtitle2" fontWeight="medium">
                      {column.label}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center">
                <Typography variant="subtitle2" fontWeight="medium">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow 
                key={row.id} 
                hover
                sx={{ 
                  backgroundColor: editingRows.has(row.id) ? 'action.hover' : 'inherit',
                }}
              >
                {visibleColumns.map((column) => (
                  <TableCell key={column.id}>
                    {renderCell(row, column)}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    {editingRows.has(row.id) ? (
                      <>
                        <Tooltip title="Save">
                          <IconButton
                            size="small"
                            onClick={() => handleSave(row.id)}
                            color="primary"
                          >
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton
                            size="small"
                            onClick={() => handleCancel(row.id)}
                            color="secondary"
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(row.id)}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(row.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value))}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </Paper>
  );
}