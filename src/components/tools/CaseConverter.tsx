import React, { useState } from 'react';

export const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');

  const convert = (type: 'upper' | 'lower' | 'title') => {
    if (type === 'upper') setText(text.toUpperCase());
    else if (type === 'lower') setText(text.toLowerCase());
    else if (type === 'title') {
      setText(
        text
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold mb-4">Case Converter</h2>
      <textarea
        className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter or paste your text here..."
      />
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900" onClick={() => convert('upper')}>UPPERCASE</button>
        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900" onClick={() => convert('lower')}>lowercase</button>
        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900" onClick={() => convert('title')}>Title Case</button>
      </div>
    </div>
  );
};
