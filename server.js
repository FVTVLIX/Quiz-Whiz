// server.js - Educational Quiz Generator Backend
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Check for API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.warn('\n⚠️  WARNING: No OpenAI API key found!');
    console.warn('Set OPENAI_API_KEY in your .env file\n');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        apiKeyConfigured: !!OPENAI_API_KEY
    });
});

// Quiz generation endpoint
app.post('/api/generate-quiz', async (req, res) => {
    try {
        const { content, options } = req.body;
        
        // Validate input
        if (!content || content.trim().length < 100) {
            return res.status(400).json({
                success: false,
                error: 'Content must be at least 100 characters long'
            });
        }

        if (!OPENAI_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'Server not configured: OpenAI API key missing'
            });
        }

        console.log(`Generating ${options.numQuestions} questions...`);
        
        // Build the prompt
        const prompt = buildPrompt(content, options);
        
        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert educational content creator. Generate quiz questions in valid JSON format only.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 3000
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI API Error:', error);
            
            let errorMessage = 'Failed to generate quiz';
            if (response.status === 401) {
                errorMessage = 'Invalid OpenAI API key';
            } else if (response.status === 429) {
                errorMessage = 'Rate limit exceeded. Please try again in a moment.';
            } else if (response.status === 403) {
                errorMessage = 'API key does not have access. Check your OpenAI account billing.';
            }
            
            return res.status(response.status).json({
                success: false,
                error: errorMessage,
                details: error.error?.message
            });
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Parse the JSON response
        const quiz = parseAIResponse(aiResponse);
        
        if (!quiz || !quiz.questions || quiz.questions.length === 0) {
            throw new Error('No questions generated');
        }

        console.log(`✅ Generated ${quiz.questions.length} questions successfully`);
        
        res.json({
            success: true,
            quiz: quiz.questions,
            metadata: {
                generatedAt: new Date().toISOString(),
                numQuestions: quiz.questions.length,
                difficulty: options.difficulty,
                subject: options.subject
            }
        });

    } catch (error) {
        console.error('Quiz Generation Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate quiz',
            details: error.message
        });
    }
});

// Build the AI prompt
function buildPrompt(content, options) {
    return `You are an expert educational content creator. Generate exactly ${options.numQuestions} diverse quiz questions from the following content.

CONTENT:
${content}

REQUIREMENTS:
- Number of questions: ${options.numQuestions}
- Difficulty level: ${options.difficulty}
- Subject area: ${options.subject}
- Grade level: ${options.gradeLevel}
- Question types: Mix of multiple-choice, true-false, short-answer, and fill-in-the-blank
- Each question must test important concepts from the content
- Provide clear, educational explanations

OUTPUT FORMAT (MUST BE VALID JSON):
{
  "questions": [
    {
      "type": "multiple-choice",
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 2,
      "explanation": "Detailed explanation of why this answer is correct"
    },
    {
      "type": "true-false",
      "question": "Statement to evaluate",
      "correct": true,
      "explanation": "Explanation of the correct answer"
    },
    {
      "type": "short-answer",
      "question": "Question requiring explanation?",
      "sampleAnswer": "A model answer in 2-3 sentences",
      "keyPoints": ["keyword1", "keyword2", "keyword3"],
      "explanation": "What makes a good answer"
    },
    {
      "type": "fill-blank",
      "question": "The _____ occurred in _____.",
      "answer": "correct phrase or word",
      "explanation": "Context and explanation"
    }
  ]
}

IMPORTANT:
- Return ONLY valid JSON, no other text
- Ensure all questions are directly based on the provided content
- Make questions challenging but fair
- Distribute question types evenly
- Test different cognitive levels (recall, understanding, application, analysis)`;
}

// Parse AI response and extract JSON
function parseAIResponse(content) {
    try {
        // Try direct parse first
        return JSON.parse(content);
    } catch (e) {
        // Extract JSON from markdown code blocks or text
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                         content.match(/```\s*([\s\S]*?)\s*```/) ||
                         content.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            const jsonStr = jsonMatch[1] || jsonMatch[0];
            return JSON.parse(jsonStr);
        }
        
        throw new Error('Could not parse JSON from AI response');
    }
}

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server Error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   🎓 Educational Quiz Generator Server                 ║
║   Running on: http://localhost:${PORT.toString().padEnd(31)}║
║   API Key: ${OPENAI_API_KEY ? '✅ Configured' : '❌ NOT CONFIGURED'.padEnd(43)}║
╚════════════════════════════════════════════════════════╝
    `);
    
    if (!OPENAI_API_KEY) {
        console.log('⚠️  To enable quiz generation:');
        console.log('   1. Create a .env file in the project root');
        console.log('   2. Add: OPENAI_API_KEY=your-key-here');
        console.log('   3. Restart the server\n');
    } else {
        console.log('✅ Ready to generate quizzes!');
        console.log('   Open http://localhost:' + PORT + ' in your browser\n');
    }
});

module.exports = app;