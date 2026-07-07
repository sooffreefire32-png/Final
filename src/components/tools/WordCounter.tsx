import React, { useState } from 'react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold mb-4">Word Counter</h2>
      <textarea
        className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter or paste your text here..."
      />
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-500">Words</p>
          <p className="text-2xl font-bold">{words}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-sm text-slate-500">Characters</p>
          <p className="text-2xl font-bold">{chars}</p>
        </div>
      </div>
    </div>
  );
};
