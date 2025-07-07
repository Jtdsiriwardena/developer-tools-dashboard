// src/app/tools/layout.tsx
import { ReactNode } from 'react';
import Sidebar from '@/components/Layout/Sidebar';

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
