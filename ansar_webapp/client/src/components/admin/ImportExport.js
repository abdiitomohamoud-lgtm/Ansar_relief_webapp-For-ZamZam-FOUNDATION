import React from 'react';

export function exportToJson(data, filename = 'export.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function importFromJson(event, onImport) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const json = JSON.parse(e.target.result);
      onImport(json);
    } catch (err) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

const ImportExport = ({ data, onImport }) => (
  <div className="flex gap-2 mb-4">
    <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700" onClick={() => exportToJson(data)}>
      Export JSON
    </button>
    <label className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
      Import JSON
      <input type="file" accept="application/json" className="hidden" onChange={e => importFromJson(e, onImport)} />
    </label>
  </div>
);

export default ImportExport;
