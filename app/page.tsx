'use client';

import { Box, Container } from '@mui/material';
import { TableToolbar } from '@/components/TableToolbar';
import { DataTable } from '@/components/DataTable';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container maxWidth="xl" sx={{ py: 0 }}>
        <Box sx={{ 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          overflow: 'hidden',
          boxShadow: 1,
          mt: 2,
        }}>
          <TableToolbar />
          <DataTable />
        </Box>
      </Container>
    </Box>
  );
}