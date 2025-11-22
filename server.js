const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use(express.static('public'));

app.post('/check-pdf', upload.single('pdf'), async (req, res) => {
    try {
        const rules = JSON.parse(req.body.rules);
        const pdfBuffer = req.file.buffer;
        const data = await pdfParse(pdfBuffer);
        const text = data.text;

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const results = [];
        for (const rule of rules) {
            const prompt = `Check if the following document satisfies this rule: "${rule}". Document text: "${text}". Respond with JSON: {"status": "pass" or "fail", "evidence": "one sentence from the document", "reasoning": "short explanation", "confidence": number 0-100}`;
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0,
            });
            const result = JSON.parse(response.choices[0].message.content);
            results.push({ rule, ...result });
        }
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));