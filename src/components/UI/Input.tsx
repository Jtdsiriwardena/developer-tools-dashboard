'use client';

import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:border-blue-400"
    />
  );
}
