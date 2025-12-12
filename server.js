// server.js - Quiz-Whiz Backend
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many quiz generation requests, please try again later.'
});

app.use('/api/generate-quiz', limiter);

// Quiz generation prompts
const QUIZ_PROMPTS = {
  master: `You are an expert educational content creator. Analyze the provided content and generate {numQuestions} diverse quiz questions.

Content: {content}

Requirements:
- Generate exactly {numQuestions} questions
- Mix question types: multiple choice, true/false, short answer
- Difficulty level: {difficulty}
- Grade level: {gradeLevel}
- Subject: {subject}

Return JSON format:
{
  "questions": [
    {
      "type": "multiple-choice",
      "difficulty": "intermediate",
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 2,
      "correct": 2,
      "explanation": "Explanation of correct answer",
      "keywords": ["keyword1", "keyword2"]
    }
    }
  ]
}

Ensure all questions are factually accurate and educationally valuable.`,

  multipleChoice: `Generate {count} multiple choice questions from this content:

{content}

Each question should:
- Have one clearly correct answer
- Include 3 plausible distractors
- Test important concepts
- Be appropriate for {gradeLevel} level

Return as JSON array.`,

  trueFalse: `Create {count} true/false questions from:

{content}

Requirements:
- Test key facts and concepts
- Avoid ambiguous statements
- Include clear explanations
- {gradeLevel} appropriate

Return as JSON array.`,

  shortAnswer: `Develop {count} short answer questions requiring 1-3 sentence responses:

{content}

Focus on:
- Understanding and analysis
- Cause-and-effect relationships
- Comparisons and explanations
- {gradeLevel} level complexity

- {gradeLevel} level complexity

Return as JSON array. Each object must include a "keywords" array of 3-5 essential terms for grading.`
};

// AI Service Integration (Replace with your preferred AI service)
class AIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
    this.model = process.env.AI_MODEL || 'gpt-3.5-turbo';
  }

  async generateQuiz(content, options) {
    try {
      const prompt = this.buildPrompt(content, options);

      // Example using OpenAI API
      if (this.apiKey.startsWith('sk-')) {
        return await this.callOpenAI(prompt);
      }

      // Example using Anthropic Claude
      if (this.apiKey.startsWith('sk-ant-')) {
        return await this.callAnthropic(prompt);
      }

      throw new Error('No valid AI API key configured');
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  buildPrompt(content, options) {
    return QUIZ_PROMPTS.master
      .replace('{content}', content)
      .replace(/{numQuestions}/g, options.numQuestions)
      .replace('{difficulty}', options.difficulty)
      .replace('{gradeLevel}', options.gradeLevel)
      .replace('{subject}', options.subject);
  }

  async callOpenAI(prompt) {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content creator specializing in quiz generation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return this.parseAIResponse(response.data.choices[0].message.content);
  }

  async callAnthropic(prompt) {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        }
      }
    );

    return this.parseAIResponse(response.data.content[0].text);
  }

  parseAIResponse(content) {
    try {
      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback: try to parse the entire response
      return JSON.parse(content);
    } catch (error) {
      console.error('JSON Parse Error:', error);
      throw new Error('Failed to parse AI response');
    }
  }
}

// Content validator
class ContentValidator {
  static validate(content, options) {
    const errors = [];

    if (!content || content.trim().length < 50) {
      errors.push('Content must be at least 50 characters long');
    }

    if (content.length > 50000) {
      errors.push('Content must be less than 50,000 characters');
    }

    if (!options.numQuestions || options.numQuestions < 1 || options.numQuestions > 50) {
      errors.push('Number of questions must be between 1 and 50');
    }

    const validDifficulties = ['beginner', 'intermediate', 'advanced', 'mixed'];
    if (!validDifficulties.includes(options.difficulty)) {
      errors.push('Invalid difficulty level');
    }

    const validGradeLevels = ['elementary', 'middle', 'high', 'college'];
    if (!validGradeLevels.includes(options.gradeLevel)) {
      errors.push('Invalid grade level');
    }

    return errors;
  }
}

// Quiz enhancement utilities
class QuizEnhancer {
  static enhanceQuestions(questions) {
    return questions.map(question => {
      // Add unique IDs
      question.id = this.generateId();

      // Ensure proper formatting
      question = this.formatQuestion(question);

      // Add learning objectives
      question.learningObjective = this.generateLearningObjective(question);

      return question;
    });
  }

  static generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  static formatQuestion(question) {
    // Ensure question ends with punctuation
    if (!/[?!.]$/.test(question.question)) {
      question.question += '?';
    }

    // Clean up options for multiple choice
    if (question.type === 'multiple-choice' && question.options) {
      question.options = question.options.map(option => option.trim());
    }

    return question;
  }

  static generateLearningObjective(question) {
    const objectives = {
      'multiple-choice': 'Identify and recall key concepts',
      'true-false': 'Evaluate factual statements',
      'short-answer': 'Analyze and explain relationships',
      'fill-blank': 'Remember specific details and terminology'
    };

    return objectives[question.type] || 'Demonstrate understanding';
  }
}

// API Routes
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { content, options } = req.body;

    // Validate input
    const validationErrors = ContentValidator.validate(content, options);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }

    // Generate quiz using AI
    const aiService = new AIService();
    const result = await aiService.generateQuiz(content, options);

    // Enhance questions
    const enhancedQuestions = QuizEnhancer.enhanceQuestions(result.questions);

    res.json({
      success: true,
      quiz: {
        id: QuizEnhancer.generateId(),
        title: `Quiz: ${options.subject}`,
        difficulty: options.difficulty,
        gradeLevel: options.gradeLevel,
        questions: enhancedQuestions,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Quiz Generation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate quiz. Please try again.'
    });
  }
});

// Quiz analytics endpoint
app.post('/api/submit-quiz', (req, res) => {
  try {
    const { quizId, answers, timeSpent } = req.body;

    // In a real app, you'd save results to a database
    console.log('Quiz submitted:', { quizId, answers, timeSpent });

    res.json({
      success: true,
      message: 'Quiz results saved successfully'
    });
  } catch (error) {
    console.error('Submit Quiz Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit quiz results'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Educational Quiz Generator API running on port ${PORT}`);
  console.log(`Frontend available at: http://localhost:${PORT}`);
});

module.exports = app;