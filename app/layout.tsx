'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CircularProgress, Box } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate 
            loading={
              <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
              </Box>
            } 
            persistor={persistor}
          >
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}