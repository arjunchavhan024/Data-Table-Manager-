'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Typography,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { useTable } from '@/hooks/useTable';
import { Column } from '@/types';

interface ManageColumnsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ManageColumnsDialog({ open, onClose }: ManageColumnsDialogProps) {
  const { columns, toggleColumnVisibility, addColumn } = useTable();
  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'string' | 'number' | 'email'>('string');
  const [error, setError] = useState('');

  const handleAddColumn = () => {
    if (!newColumnName.trim()) {
      setError('Column name is required');
      return;
    }

    const columnId = newColumnName.toLowerCase().replace(/\s+/g, '');
    const exists = columns.find(col => col.id === columnId);
    
    if (exists) {
      setError('A column with this name already exists');
      return;
    }

    const newColumn: Column = {
      id: columnId,
      label: newColumnName.trim(),
      visible: true,
      type: newColumnType,
      required: false,
    };

    addColumn(newColumn);
    setNewColumnName('');
    setNewColumnType('string');
    setError('');
  };

  const handleClose = () => {
    setNewColumnName('');
    setNewColumnType('string');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Column Visibility
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {columns.map((column) => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    checked={column.visible}
                    onChange={() => toggleColumnVisibility(column.id)}
                    disabled={column.required}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography>{column.label}</Typography>
                    {column.required && (
                      <Typography variant="caption" color="text.secondary">
                        (Required)
                      </Typography>
                    )}
                  </Box>
                }
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            Add New Column
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Column Name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              placeholder="e.g., Department, Location"
              fullWidth
              size="small"
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Column Type</InputLabel>
              <Select
                value={newColumnType}
                onChange={(e) => setNewColumnType(e.target.value as any)}
                label="Column Type"
              >
                <MenuItem value="string">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={handleAddColumn}
              disabled={!newColumnName.trim()}
            >
              Add Column
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}