"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Make sure to use this import
import './globals.css';
import React from 'react';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className="antialiased">
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
