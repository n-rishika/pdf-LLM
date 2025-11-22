# pdf-LLM

A modern web app to upload PDFs and check them against custom rules using OpenAI's GPT API.

**Frontend:** React (in `src/`)  
**Backend:** Node.js serverless functions (in `api/`)  
**Deployment:** Vercel

## Features

- ✨ Clean React UI for managing rules and uploading PDFs
- 🤖 AI-powered rule checking using OpenAI GPT-3.5-turbo
- 📄 Supports any PDF file
- ☁️ Serverless deployment on Vercel
- 🎨 Beautiful gradient design with responsive layout

## Project Structure

```
src/                      # React frontend
  ├── App.jsx            # Main React component
  ├── App.css            # Styles
  ├── index.jsx          # Entry point
  └── components/        # React components
      ├── PDFUpload.jsx  # File upload handler
      ├── RulesList.jsx  # Rule management
      └── Results.jsx    # Results display

api/                      # Serverless functions
  └── check-pdf.js       # PDF processing & rule checking

vercel.json              # Vercel configuration
package.json             # Dependencies & scripts
```

## Setup

### Prerequisites

- Node.js 16+ and npm
- OpenAI API key

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your OpenAI key:
   ```
   OPENAI_API_KEY=sk_...
   ```

3. Run the React dev server:
   ```bash
   npm run dev
   ```

4. In another terminal, test the serverless function with Vercel Dev:
   ```bash
   npm install -g vercel
   vercel dev
   ```

The app will be available at `http://localhost:3000`.

## Deployment

### Option 1: Git-Based Auto-Deploy (Recommended)

1. Your code is already pushed to GitHub: `https://github.com/n-rishika/pdf-LLM.git`

2. Go to [vercel.com](https://vercel.com) → **New Project** → **Import Git Repository**

3. Select the `pdf-LLM` repo and click **Import**

4. In **Environment Variables**, add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** Your OpenAI API key

5. Click **Deploy**

Vercel will automatically build (`npm run build`) and deploy your React app. Any future pushes to `main` will trigger a new deployment.

### Option 2: Manual Deploy with Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

   Follow prompts to set up the project.

4. Add the environment variable:
   ```bash
   vercel env add OPENAI_API_KEY production
   ```

5. Deploy to production:
   ```bash
   vercel --prod
   ```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | ✅ Yes | OpenAI API key for rule checking |

## How It Works

1. **Frontend (React):**
   - User enters verification rules
   - Uploads a PDF file
   - Sends both to `/api/check-pdf`

2. **Backend (Serverless Function):**
   - Receives the PDF and rules
   - Extracts text from the PDF using `pdf-parse`
   - For each rule, sends a request to OpenAI's GPT-3.5-turbo
   - Returns the results (pass/fail, confidence, evidence, reasoning)

3. **Results:**
   - Frontend displays results with confidence scores
   - Shows evidence and reasoning from the AI

## Example Rules

- "The document must contain a date"
- "The document should have a signature section"
- "The document must mention compliance standards"

## Troubleshooting

### Build Fails on Vercel
- Check that `npm run build` works locally: `npm run build`
- Ensure `package.json` dependencies are installed: `npm install`

### Function Returns 500 Error
- Verify `OPENAI_API_KEY` is set in Vercel Project Settings
- Check function logs in Vercel Dashboard → Deployments → Logs
- Ensure the PDF is valid and not corrupted

### CORS Issues
- The function is on the same origin (`/api/check-pdf`), so CORS should not be an issue
- If calling from a different domain, you may need to add CORS headers in `api/check-pdf.js`

## Scripts

```bash
npm run dev       # Start React dev server
npm run build     # Build React for production
npm start         # Serve production build locally (for testing)
npm test          # Run tests
vercel dev        # Run Vercel serverless functions locally
vercel --prod     # Deploy to production
```

## API Reference

### POST /api/check-pdf

**Request:**
- Content-Type: `multipart/form-data`
- Fields:
  - `pdf` (File) — the PDF to check
  - `rules` (JSON String) — array of rule strings, e.g., `["rule1", "rule2"]`

**Response:**
```json
[
  {
    "rule": "The document must contain a date",
    "status": "pass",
    "evidence": "The document was dated January 15, 2024.",
    "reasoning": "A date was found in the document header.",
    "confidence": 95
  },
  {
    "rule": "The document must have a signature",
    "status": "fail",
    "evidence": "No signature found in the document.",
    "reasoning": "A standard signature block was not detected.",
    "confidence": 85
  }
]
```

## Technologies

- **Frontend:** React 18, CSS3
- **Backend:** Node.js, Express, Formidable
- **AI:** OpenAI API (GPT-3.5-turbo)
- **PDF Processing:** pdf-parse
- **Deployment:** Vercel

## License

ISC

## Author

n-rishika

# pdf-LLM

This project provides a small web UI (in `public/`) and a serverless API at `api/check-pdf.js` that checks PDF documents against a list of rules using the OpenAI API.

Quick deploy (recommended)

1. Install Vercel CLI (optional but useful):
```pwsh
npm install -g vercel
vercel login
```

2. From the project root deploy once:
```pwsh
vercel
# or for production
vercel --prod
```

3. Add your OpenAI API key to Vercel (so the serverless function can call OpenAI):
```pwsh
vercel env add OPENAI_API_KEY production
vercel env add OPENAI_API_KEY preview
```

Or add the key in the Vercel dashboard under Project → Settings → Environment Variables.

Local testing

- Install dependencies:
```pwsh
npm install
```
- Run the local Express server (keeps same behavior as before):
```pwsh
node server.js
```
- Or run Vercel dev to test serverless functions locally:
```pwsh
vercel dev
# POST to http://localhost:3000/api/check-pdf
```

Notes
- `api/check-pdf.js` is the serverless function used by Vercel. `server.js` runs an express server for local testing — Vercel will ignore `server.js` and use `api/` functions.
- Make sure to set `OPENAI_API_KEY` in your Vercel project.
