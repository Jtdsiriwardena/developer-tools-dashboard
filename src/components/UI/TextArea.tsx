'use client';

import React from 'react';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: Props) {
  return (
    <textarea
      {...props}
      className="border border-gray-300 rounded p-2 w-full h-60 resize-none focus:outline-none focus:ring focus:border-blue-400"
    />
  );
}
