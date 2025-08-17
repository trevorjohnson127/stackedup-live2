
import './globals.css';
import React from 'react';

export const metadata = {
  title: 'StackedUp',
  description: 'Investor platform built not bought',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
