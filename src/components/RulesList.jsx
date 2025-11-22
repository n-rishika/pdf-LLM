import React from 'react';

function RulesList({ rules, newRule, onNewRuleChange, onAddRule, onRemoveRule }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddRule();
    }
  };

  return (
    <div className="rules-section">
      <h2>Verification Rules</h2>
      <div className="rule-input-group">
        <input
          type="text"
          value={newRule}
          onChange={(e) => onNewRuleChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a rule (e.g., 'Document must contain signature')"
          className="rule-input"
        />
        <button onClick={onAddRule} className="btn btn-primary">
          + Add Rule
        </button>
      </div>

      <div className="rules-list">
        {rules.length === 0 ? (
          <p className="no-rules">No rules added yet</p>
        ) : (
          <ul>
            {rules.map((rule, index) => (
              <li key={index} className="rule-item">
                <span>{rule}</span>
                <button
                  onClick={() => onRemoveRule(index)}
                  className="btn btn-remove"
                  aria-label="Remove rule"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RulesList;
