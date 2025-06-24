'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Upload as UploadIcon } from '@mui/icons-material';
import { useTable } from '@/hooks/useTable';
import { importCSV } from '@/utils/csvUtils';
import { ImportError } from '@/types';

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ImportDialog({ open, onClose }: ImportDialogProps) {
  const { setData } = useTable();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrors([]);
      setImportSuccess(false);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const result = await importCSV(file);
      
      if (result.errors.length > 0) {
        setErrors(result.errors);
      } else {
        setData(result.data);
        setImportSuccess(true);
        setErrors([]);
      }
    } catch (error) {
      setErrors([{
        row: 0,
        field: 'file',
        message: 'Failed to parse CSV file. Please check the format.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setErrors([]);
    setImportSuccess(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Import CSV Data</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Upload a CSV file with columns: Name, Email, Age, Role, Department (optional), Location (optional)
          </Typography>
          
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mt: 2,
              border: '2px dashed',
              borderColor: 'divider',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
            component="label"
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="h6" gutterBottom>
              {file ? file.name : 'Click to select CSV file'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {file ? `Size: ${(file.size / 1024).toFixed(1)} KB` : 'Drag and drop or click to browse'}
            </Typography>
          </Paper>
        </Box>

        {importSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            CSV data imported successfully!
          </Alert>
        )}

        {errors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Import errors found:
            </Typography>
            <List dense>
              {errors.slice(0, 10).map((error, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemText
                    primary={`Row ${error.row}: ${error.message}`}
                    secondary={`Field: ${error.field}`}
                  />
                </ListItem>
              ))}
              {errors.length > 10 && (
                <ListItem sx={{ pl: 0 }}>
                  <ListItemText
                    primary={`... and ${errors.length - 10} more errors`}
                  />
                </ListItem>
              )}
            </List>
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleImport}
          disabled={!file || loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Importing...' : 'Import'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}