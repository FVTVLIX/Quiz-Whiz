# 🎓 AI-Powered Educational Quiz Generator

Transform any educational content into engaging, custom-generated quizzes using AI technology. Perfect for teachers, students, and content creators.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![AI](https://img.shields.io/badge/AI-OpenAI%20%7C%20Anthropic-orange.svg)

## ✨ Features

- 🤖 **AI-Powered Generation** - Uses OpenAI GPT or Anthropic Claude to create intelligent questions
- 📝 **Multiple Question Types** - Generates MC, True/False, Short Answer, and Fill-in-the-Blank questions
- 🎯 **Custom Difficulty Levels** - Beginner, Intermediate, Advanced, or Mixed
- 📚 **Any Subject** - Works with history, science, literature, math, or any educational content
- 🎨 **Beautiful UI** - Clean, responsive design that works on all devices
- ⚡ **Instant Feedback** - Automatic grading with detailed explanations
- 🔄 **Fallback Mode** - Works without API keys using rule-based generation
- 🌐 **Easy Deployment** - Deploy to any hosting platform in minutes

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ installed
- An OpenAI or Anthropic API key (optional but recommended)

### Installation

```bash
# Clone or create project folder
mkdir ai-quiz-generator
cd ai-quiz-generator

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and add your API key

# Start the server
npm start
```

Visit **http://localhost:3000** and start generating quizzes!

## 📖 How It Works

1. **Paste Content** - Copy any educational material into the text area
2. **Configure** - Select number of questions, difficulty, and grade level
3. **Generate** - AI analyzes your content and creates custom questions (15-30 seconds)
4. **Take Quiz** - Answer the generated questions
5. **Get Results** - Instant grading with explanations for each answer

## 🎯 Example Use Cases

### For Teachers
- Create quizzes from lesson plans
- Generate tests from textbook chapters
- Build study guides for students
- Save time on assessment creation

### For Students
- Test understanding of course materials
- Practice with custom questions
- Study for exams effectively
- Learn from detailed explanations

### For Content Creators
- Add assessments to educational content
- Engage learners with interactive quizzes
- Validate learning outcomes
- Create valuable course materials

## 💡 Usage Examples

### Example 1: History Quiz
```
Input: "The American Revolution (1775-1783) was a colonial revolt..."
Output: 8 custom questions about dates, events, key figures, and causes
```

### Example 2: Science Quiz
```
Input: "Photosynthesis is the process by which plants convert light..."
Output: Questions about chemical equations, processes, and applications
```

### Example 3: Literature Quiz
```
Input: "Shakespeare's Hamlet explores themes of revenge and madness..."
Output: Questions about plot, themes, characters, and symbolism
```

## 🛠️ Technology Stack

**Frontend:**
- HTML5
- CSS3 (Custom styling)
- Vanilla JavaScript
- Responsive design

**Backend:**
- Node.js
- Express.js
- OpenAI API / Anthropic API
- RESTful architecture

## 📁 Project Structure

```
ai-quiz-generator/
├── public/
│   └── index.html          # Frontend application
├── server.js               # Backend API with AI integration
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (API keys)
├── .env.example            # Template for .env
├── README.md               # This file
├── QUICKSTART.md           # 5-minute setup guide
└── COMPLETE-SETUP-GUIDE.md # Detailed documentation
```

## ⚙️ Configuration

### Environment Variables

```bash
# AI Provider (openai or anthropic)
AI_PROVIDER=openai

# OpenAI Configuration
OPENAI_API_KEY=sk-your-key-here

# OR Anthropic Configuration
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Server Port
PORT=3000
```

### Customization Options

- **Number of Questions:** 1-20
- **Difficulty Levels:** Beginner, Intermediate, Advanced, Mixed
- **Grade Levels:** Elementary, Middle School, High School, College, Professional
- **Subjects:** History, Science, Math, Literature, and more

## 🔐 Security

- API keys stored in `.env` (not committed to Git)
- CORS enabled for security
- Input validation on all endpoints
- Rate limiting to prevent abuse
- Secure API key handling

## 💰 Cost Estimates

**With OpenAI:**
- GPT-3.5-Turbo: ~$0.002 per quiz
- GPT-4: ~$0.006 per quiz

**With Anthropic:**
- Claude 3 Sonnet: ~$0.004 per quiz

**Monthly estimates:**
- 100 quizzes: $0.20-0.60
- 500 quizzes: $1-3
- 1000 quizzes: $2-6

Very affordable for educational purposes!

## 🚢 Deployment

### Deploy to Render (Free)
```bash
# Push to GitHub
git push origin main

# Connect to Render
# Add environment variables
# Deploy!
```

### Deploy to Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Deploy to Heroku
```bash
heroku create your-quiz-app
heroku config:set OPENAI_API_KEY=your-key
git push heroku main
```

## 🧪 Testing

Test the application:
1. Load sample content
2. Generate quiz
3. Verify questions are relevant
4. Take quiz and submit
5. Check results accuracy

## 📝 API Endpoints

### `POST /api/generate-quiz`
Generate a new quiz from content

**Request:**
```json
{
  "content": "Educational content here...",
  "options": {
    "numQuestions": 8,
    "difficulty": "intermediate",
    "subject": "history",
    "gradeLevel": "middle"
  }
}
```

**Response:**
```json
{
  "success": true,
  "quiz": [...questions...],
  "metadata": {
    "generatedAt": "2025-01-10T12:00:00Z",
    "numQuestions": 8
  }
}
```

### `GET /api/health`
Check server and AI status

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

MIT License - Free to use and modify for any purpose.

## 🙏 Acknowledgments

- OpenAI for GPT API
- Anthropic for Claude API
- Express.js team
- The open-source community

## 📞 Support

- Check [QUICKSTART.md](QUICKSTART.md) for quick setup
- See [COMPLETE-SETUP-GUIDE.md](COMPLETE-SETUP-GUIDE.md) for details
- Open an issue for bugs
- Star the project if you find it useful!

## 🎉 Get Started Now!

```bash
npm install
npm start
# Open http://localhost:3000
# Start generating quizzes!
```

**Made with ❤️ for educators and learners everywhere**