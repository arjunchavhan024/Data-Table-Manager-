'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  ViewColumn as ViewColumnIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTable } from '@/hooks/useTable';
import { ManageColumnsDialog } from './ManageColumnsDialog';
import { ImportDialog } from './ImportDialog';
import { exportCSV } from '@/utils/csvUtils';

export function TableToolbar() {
  const theme = useTheme();
  const {
    searchQuery,
    filteredData,
    columns,
    editingRows,
    theme: currentTheme,
    setSearchQuery,
    toggleTheme,
    clearEditingRows,
  } = useTable();

  const [manageColumnsOpen, setManageColumnsOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleExport = () => {
    exportCSV(filteredData, columns);
  };

  const handleSaveAll = () => {
    // This would typically batch save all editing rows
    clearEditingRows();
  };

  const handleCancelAll = () => {
    clearEditingRows();
  };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
        <Typography variant="h5" component="h1" fontWeight="bold">
          Data Table Manager
        </Typography>
        
        <TextField
          placeholder="Search all fields..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {editingRows.size > 0 && (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleSaveAll}
              color="primary"
              size="small"
            >
              Save All ({editingRows.size})
            </Button>
            <Button
              variant="outlined"
              onClick={handleCancelAll}
              color="secondary"
              size="small"
            >
              Cancel All
            </Button>
          </>
        )}

        <Tooltip title="Manage Columns">
          <IconButton onClick={() => setManageColumnsOpen(true)}>
            <ViewColumnIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Import CSV">
          <IconButton onClick={() => setImportDialogOpen(true)}>
            <UploadIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Export CSV">
          <IconButton onClick={handleExport}>
            <DownloadIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton onClick={toggleTheme}>
            {currentTheme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <ManageColumnsDialog
        open={manageColumnsOpen}
        onClose={() => setManageColumnsOpen(false)}
      />

      <ImportDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
      />
    </Box>
  );
}