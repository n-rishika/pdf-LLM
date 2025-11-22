import React from 'react';

function PDFUpload({ onSubmit, loading, disabled }) {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onSubmit(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload PDF</h2>
      <label htmlFor="pdf-input" className={`file-input-label ${disabled ? 'disabled' : ''}`}>
        {loading ? '⏳ Processing...' : '📄 Select PDF File'}
      </label>
      <input
        id="pdf-input"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={loading || disabled}
        style={{ display: 'none' }}
      />
      {disabled && <p className="hint">Add at least one rule first</p>}
    </div>
  );
}

export default PDFUpload;
