import React, { useState } from 'react';
import './App.css';
import PDFUpload from './components/PDFUpload';
import RulesList from './components/RulesList';
import Results from './components/Results';

function App() {
  const [rules, setRules] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newRule, setNewRule] = useState('');

  const addRule = () => {
    if (newRule.trim()) {
      setRules([...rules, newRule]);
      setNewRule('');
    }
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handlePDFSubmit = async (file) => {
    if (rules.length === 0) {
      setError('Please add at least one rule');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('rules', JSON.stringify(rules));

      const response = await fetch('/api/check-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to process PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF Rule Checker</h1>
        <p>Upload a PDF and check it against custom rules using AI</p>
      </header>

      <main className="container">
        <div className="grid">
          <div className="section">
            <RulesList
              rules={rules}
              newRule={newRule}
              onNewRuleChange={setNewRule}
              onAddRule={addRule}
              onRemoveRule={removeRule}
            />
          </div>

          <div className="section">
            <PDFUpload
              onSubmit={handlePDFSubmit}
              loading={loading}
              disabled={rules.length === 0}
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Processing PDF...</div>}
        {results && <Results results={results} rules={rules} />}
      </main>
    </div>
  );
}

export default App;
