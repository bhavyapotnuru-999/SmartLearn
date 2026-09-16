import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Server-side AI endpoint with lazy initialization
  app.post('/api/ai/chat', async (req, res) => {
    const { message, subject, context } = req.body || {};
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback if Gemini API key is not configured
      return res.json({
        fallback: true,
        text: `Here is a structured explanation for your query: Always begin from fundamental definitions and identify what parameters are known and what needs to be solved. Let's practice with an example!`
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a supportive, high-level educational AI tutor on SmartLearn.
Subject context: ${subject || 'STEM'}
Additional student context: ${context || 'High School / AP'}
Student question: ${message}

Provide a clear, engaging, step-by-step educational response using markdown, analogies, key definitions, and a follow-up practice question or encouragement.`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        });
      } catch {
        response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt
        });
      }

      return res.json({
        text: response.text || 'I could not generate an answer right now. Please try again!'
      });
    } catch (err: any) {
      console.error('Gemini API error in /api/ai/chat:', err);
      return res.status(500).json({ error: 'Failed to process AI response', details: err?.message });
    }
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SmartLearn server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
