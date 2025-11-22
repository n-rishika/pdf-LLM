import React from 'react';

function Results({ results, rules }) {
  return (
    <div className="results-section">
      <h2>Check Results</h2>
      <div className="results-list">
        {results.map((result, index) => (
          <div key={index} className={`result-item result-${result.status.toLowerCase()}`}>
            <div className="result-header">
              <h3>{result.rule}</h3>
              <span className={`status-badge status-${result.status.toLowerCase()}`}>
                {result.status.toUpperCase()}
              </span>
            </div>
            <div className="result-details">
              <p>
                <strong>Confidence:</strong> {result.confidence}%
              </p>
              <p>
                <strong>Evidence:</strong> {result.evidence}
              </p>
              <p>
                <strong>Reasoning:</strong> {result.reasoning}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="results-summary">
        <p>
          <strong>Summary:</strong>{' '}
          {results.filter((r) => r.status === 'pass').length} of {results.length} rules passed
        </p>
      </div>
    </div>
  );
}

export default Results;
