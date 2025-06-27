"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Search as SearchIcon,
  ViewColumn as ViewColumnIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTable } from "@/hooks/useTable";
import { ManageColumnsDialog } from "./ManageColumnsDialog";
import { ImportDialog } from "./ImportDialog";
import { exportCSV } from "@/utils/csvUtils";

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

  // Popup dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dataList, setDataList] = useState([]);

  const handleExport = () => {
    exportCSV(filteredData, columns);
  };

  const handleSaveAll = () => {
    clearEditingRows();
  };

  const handleCancelAll = () => {
    clearEditingRows();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setName("");
    setEmail("");
    setMobile("");
  };

  const handleSubmitData = () => {
    if (name.trim() && email.trim() && mobile.trim()) {
      setDataList((prev) => [...prev, { name, email, mobile }]); //All explaination in README(for add data logic) file
      handleDialogClose();
    }
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">
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

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
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

          <Tooltip title="Add data">
            <Button onClick={handleDialogOpen} style={{ color: "red" }}>
              Add Data
            </Button>
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

          <Tooltip
            title={`Switch to ${
              currentTheme === "light" ? "dark" : "light"
            } mode`}
          >
            <IconButton onClick={toggleTheme}>
              {currentTheme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Dialog Popup */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Entry</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Mobile No"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitData}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Show Entered Data */}
      {dataList.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            Entered Data:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 16 }}>
            {dataList.map((item, index) => (
              <li key={index}>
                <strong>Name:</strong> {item.name} | <strong>Email:</strong>{" "}
                {item.email} | <strong>Mobile:</strong> {item.mobile}
              </li>
            ))}
          </ul>
        </Box>
      )}

      {/* Modals */}
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
