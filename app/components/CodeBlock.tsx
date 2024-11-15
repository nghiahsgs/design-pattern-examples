"use client";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'python' }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={{
          margin: 0,
          padding: '1rem',
          backgroundColor: '#2d2d2d',
          fontSize: '0.9rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}