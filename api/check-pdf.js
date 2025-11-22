const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');
const formidable = require('formidable');

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form' });
      return;
    }

    try {
      const rules = JSON.parse(fields.rules);
      const pdfFile = files.pdf;
      const pdfBuffer = require('fs').readFileSync(pdfFile.filepath);
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
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};