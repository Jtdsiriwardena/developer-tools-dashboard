'use client';

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4">{children}</div>
  );
}
