# 🚀 AI-Powered Quiz Generator - Complete Setup Guide

## 📋 Overview

This quiz generator uses **real AI** (OpenAI GPT or Anthropic Claude) to create custom questions from ANY content you provide. It includes a fallback system if you don't have AI API keys.

## 🏗️ Project Structure

```
quiz-generator/
├── public/
│   └── index.html          # Frontend (the artifact above)
├── server.js               # Backend with AI integration
├── package.json            # Dependencies
├── .env                    # API keys (you create this)
├── .env.example            # Template for .env
└── README.md               # Documentation
```

## ⚡ Quick Start (3 Steps)

### Step 1: Create Project Files

Create a folder and add these 4 files:

#### **package.json**
```json
{
  "name": "Quiz-Whiz",
  "version": "1.0.0",
  "description": "AI-powered educational quiz generator",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

#### **.env.example**
```bash
# Choose ONE AI provider (OpenAI OR Anthropic)

# Option 1: OpenAI (Recommended)
AI_PROVIDER=openai
OPENAI_API_KEY=your-openai-api-key-here

# Option 2: Anthropic Claude
# AI_PROVIDER=anthropic
# ANTHROPIC_API_KEY=your-anthropic-api-key-here

# Server Configuration
PORT=3000
```

#### **.env** (copy from .env.example and add your real API key)
```bash
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3000
```

#### Create **public/** folder
- Create a folder called `public`
- Save the HTML artifact as `public/index.html`

#### **server.js**
- Copy the complete backend code from the "server.js" artifact

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Server

```bash
npm start
```

Visit: **http://localhost:3000**

## 🔑 Getting API Keys

### Option 1: OpenAI (Recommended)

1. Go to https://platform.openai.com/signup
2. Create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Add to `.env` file:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

**Cost:** Pay-as-you-go, typically $0.002-0.006 per quiz generation

### Option 2: Anthropic Claude

1. Go to https://console.anthropic.com/
2. Sign up for an account
3. Go to API Keys
4. Create a new key
5. Add to `.env` file:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

**Cost:** Similar to OpenAI, pay-as-you-go

### Option 3: No API Key (Fallback Mode)

Don't have an API key? **No problem!** The system will use rule-based generation:
- Just leave the `.env` file without API keys
- Questions will be simpler but still functional
- Great for testing and development

## 💡 How to Use

1. **Start the server**: `npm start`
2. **Open browser**: Go to http://localhost:3000
3. **Enter content**: Paste ANY educational content (articles, textbooks, notes)
4. **Configure**: Choose number of questions, difficulty, subject, grade level
5. **Generate**: Click "Generate Quiz with AI"
6. **Wait**: AI analyzes content (10-30 seconds)
7. **Take quiz**: Answer the generated questions
8. **See results**: Get instant feedback with explanations

## 🎯 Example Content to Try

### Example 1: History
```
The Renaissance was a period of cultural rebirth in Europe from the 14th to 17th century. It began in Italy and spread throughout Europe, marking the transition from medieval to modern times. Key figures included Leonardo da Vinci, Michelangelo, and Galileo. The printing press, invented by Gutenberg, helped spread Renaissance ideas rapidly.
```

### Example 2: Science
```
Photosynthesis is the process by which plants convert light energy into chemical energy. Chlorophyll in plant cells absorbs sunlight, and through a series of reactions, converts carbon dioxide and water into glucose and oxygen. The equation is: 6CO2 + 6H2O + light → C6H12O6 + 6O2.
```

### Example 3: Literature
```
Shakespeare's "Romeo and Juliet" is a tragedy about two young lovers from feuding families. The play explores themes of love, fate, and conflict. Famous lines include "What's in a name?" and "A rose by any other name would smell as sweet."
```

## 🛠️ Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:** 
- Make sure server is running (`npm start`)
- Check that PORT is not in use
- Verify you're accessing http://localhost:3000

### Issue: "AI generation failed"
**Solution:**
- Check your API key in `.env` file
- Verify you have API credits
- System will automatically fall back to rule-based generation

### Issue: "Module not found"
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Issue: Server won't start
**Solution:**
- Check if port 3000 is already in use
- Change PORT in `.env` to 3001 or another port
- Run: `killall node` (Mac/Linux) or Task Manager (Windows)

## 📊 Features

### Current Features ✅
- AI-powered question generation from ANY content
- Multiple question types (MC, T/F, Short Answer, Fill-blank)
- Adjustable difficulty levels
- Grade level customization
- Subject area selection
- Instant grading with explanations
- Responsive design
- Fallback mode without API keys

### Question Types Generated
1. **Multiple Choice** - 4 options with one correct answer
2. **True/False** - Binary questions
3. **Short Answer** - Open-ended questions
4. **Fill-in-the-Blank** - Complete the sentence

## 🔒 Security Notes

- **Never commit** `.env` file to Git
- Add `.env` to your `.gitignore`
- Keep API keys secret
- Monitor API usage to avoid unexpected costs

## 💰 Cost Estimates

- **GPT-3.5**: ~$0.002 per quiz (very cheap)
- **GPT-4**: ~$0.006 per quiz (better quality)
- **Claude**: ~$0.004 per quiz (good balance)

For typical usage (100 quizzes/month): **$0.20-0.60/month**

## 🚀 Deployment Options

### Deploy to Render (Free)
1. Push code to GitHub
2. Create account on Render.com
3. Connect repository
4. Add environment variables
5. Deploy!

### Deploy to Railway (Free)
1. Push to GitHub
2. Sign up at Railway.app
3. Create new project from GitHub
4. Add environment variables
5. Deploy automatically

### Deploy to Heroku
```bash
heroku create your-quiz-app
heroku config:set OPENAI_API_KEY=your-key
git push heroku main
```

## 📝 Testing Checklist

- [ ] Server starts without errors
- [ ] Can access http://localhost:3000
- [ ] AI status badge shows correct status
- [ ] Can enter content in textarea
- [ ] Generate button creates quiz
- [ ] Questions are relevant to content
- [ ] Can answer all question types
- [ ] Submit shows results
- [ ] Score is calculated correctly
- [ ] Explanations are helpful

## 🎓 Usage Tips

1. **Content Length**: 200-2000 words works best
2. **Clear Content**: Well-structured content = better questions
3. **Question Count**: Start with 5-8 questions for testing
4. **Difficulty**: Match to your actual audience
5. **Review**: Always review AI-generated questions

## 🆘 Support

Having issues? Check:
1. Console logs (F12 in browser)
2. Server terminal output
3. API key is correct in `.env`
4. Content is at least 50 characters
5. Backend server is running

## 📄 License

MIT License - Free to use and modify!

---

**Ready to create custom quizzes from ANY content? Follow the steps above and start generating!** 🎉