import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Layout/Header';


export const metadata = {
  title: 'Developer Tools Dashboard',
  description: 'Unified developer utilities in one dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition">


        {/* Main content */}
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>

      </body>
    </html>
  );
}
