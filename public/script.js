document.getElementById('checkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    button.disabled = true;
    button.textContent = 'Processing...';
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<div class="loading">Analyzing PDF with AI...</div>';

    const formData = new FormData();
    formData.append('pdf', document.getElementById('pdf').files[0]);
    const rules = [
        document.querySelector('input[name="rule1"]').value,
        document.querySelector('input[name="rule2"]').value,
        document.querySelector('input[name="rule3"]').value
    ];
    formData.append('rules', JSON.stringify(rules));

    try {
        const response = await fetch('/api/check-pdf', {
            method: 'POST',
            body: formData
        });
        const results = await response.json();
        resultsDiv.innerHTML = '';
        results.forEach(result => {
            const div = document.createElement('div');
            div.className = `result-card ${result.status}`;
            div.innerHTML = `
                <h3>${result.rule}</h3>
                <p><strong>Status:</strong> <span class="status ${result.status}">${result.status}</span></p>
                <p><strong>Evidence:</strong> ${result.evidence}</p>
                <p><strong>Reasoning:</strong> ${result.reasoning}</p>
                <p><strong>Confidence:</strong> <span class="confidence">${result.confidence}%</span></p>
            `;
            resultsDiv.appendChild(div);
        });
    } catch (error) {
        resultsDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    } finally {
        button.disabled = false;
        button.textContent = 'Check PDF';
    }
});