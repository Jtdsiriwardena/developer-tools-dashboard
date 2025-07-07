'use client';

import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 transition"
    >
      {children}
    </button>
  );
}
