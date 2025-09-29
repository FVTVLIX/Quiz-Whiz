# ⚡ Quick Start - 5 Minutes to Working AI Quiz Generator

## 🎯 What You'll Get

An AI-powered quiz generator that:
- ✅ Creates questions from ANY content you paste
- ✅ Works with OpenAI or Anthropic AI
- ✅ Has fallback mode (no API key needed)
- ✅ Generates 4 types of questions automatically

## 📦 Step 1: Create Files (2 minutes)

### 1.1 Create Project Folder
```bash
mkdir ai-quiz-generator
cd ai-quiz-generator
```

### 1.2 Create These 4 Files

**File 1: `package.json`** (Copy from the artifact)

**File 2: `server.js`** (Copy from the "Complete Backend" artifact)

**File 3: Create `public` folder and `public/index.html`** (Copy from the HTML artifact)

**File 4: `.env`** (Copy from .env.example and add your API key)

Your structure should look like:
```
ai-quiz-generator/
├── public/
│   └── index.html
├── server.js
├── package.json
└── .env
```

## 🔧 Step 2: Install & Configure (2 minutes)

### 2.1 Install Dependencies
```bash
npm install
```

### 2.2 Get an API Key (Optional but Recommended)

**Option A: OpenAI (Easiest)**
1. Go to https://platform.openai.com/api-keys
2. Sign up / Log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

**Option B: Anthropic Claude**
1. Go to https://console.anthropic.com
2. Sign up / Log in
3. Create API key
4. Copy the key (starts with `sk-ant-`)

**Option C: No API Key**
- Skip this! System will use fallback mode

### 2.3 Add API Key to `.env`

Edit `.env` file:
```bash
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3000
```

## 🚀 Step 3: Run It! (1 minute)

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════╗
║   Educational Quiz Generator Server                    ║
║   Running on: http://localhost:3000                   ║
║   AI Provider: OPENAI                                  ║
║   API Key: ✓ Configured                               ║
╚════════════════════════════════════════════════════════╝
```

Open browser: **http://localhost:3000**

## 🎓 Step 4: Test It! (30 seconds)

1. Click **"Load Sample Content"** button
2. Click **"Generate Quiz with AI"** button  
3. Wait 15-20 seconds while AI analyzes
4. Answer the questions
5. Click **"Submit Quiz"**
6. See your results!

## 🎉 Success!

You now have a working AI quiz generator!

## 🔄 Try Your Own Content

1. Paste ANY educational content:
   - Wikipedia articles
   - Textbook chapters
   - Lecture notes
   - Study guides
   - Research papers

2. Configure options:
   - Number of questions (3-20)
   - Difficulty level
   - Subject area
   - Grade level

3. Click "Generate Quiz with AI"

4. Questions will be customized to YOUR content!

## 💡 What Makes This Different?

❌ **Old way:** Fixed sample questions
✅ **New way:** AI generates questions from YOUR content

Every time you paste new content, you get new questions!

## 🆘 Troubleshooting

### "Cannot connect to backend"
**Fix:** Make sure you ran `npm start`

### "Backend Not Running" badge
**Fix:** 
```bash
# Stop any running servers
# Press Ctrl+C in terminal
# Then restart
npm start
```

### Questions don't relate to my content
**Fix:** 
- Make sure content is at least 100 words
- Check API key is correct in `.env`
- Try with sample content first

### "AI generation failed"
**Fix:** 
- Verify API key is valid
- Check you have API credits
- System will automatically use fallback mode

### Port already in use
**Fix:**
```bash
# Change PORT in .env to 3001
PORT=3001
# Then restart
npm start
```

## 📊 Testing Different Content Types

### Test 1: History Content
```
The French Revolution (1789-1799) was a period of radical social and political upheaval in France. It began with the storming of the Bastille and led to the overthrow of the monarchy. Key figures included Robespierre, Danton, and Napoleon Bonaparte.
```

### Test 2: Science Content
```
DNA# ⚡ Quick Start - 5 Minutes to Working AI Quiz Generator

## 🎯 What You'll Get

An AI-powered quiz generator that:
- ✅ Creates questions from ANY content you paste
- ✅ Works with OpenAI or Anthropic AI
- ✅ Has fallback mode (no API key needed)
- ✅ Generates 4 types of questions automatically

## 📦 Step 1: Create Files (2 minutes)

### 1.1 Create Project Folder
```bash
mkdir ai-quiz-generator
cd ai-quiz-generator
```

### 1.2 Create These 4 Files

**File 1: `package.json`** (Copy from the artifact)

**File 2: `server.js`** (Copy from the "Complete Backend" artifact)

**File 3: Create `public` folder and `public/index.html`** (Copy from the HTML artifact)

**File 4: `.env`** (Copy from .env.example and add your API key)

Your structure should look like:
```
ai-quiz-generator/
├── public/
│   └── index.html
├── server.js
├── package.json
└── .env
```

## 🔧 Step 2: Install & Configure (2 minutes)

### 2.1 Install Dependencies
```bash
npm install
```

### 2.2 Get an API Key (Optional but Recommended)

**Option A: OpenAI (Easiest)**
1. Go to https://platform.openai.com/api-keys
2. Sign up / Log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

**Option B: Anthropic Claude**
1. Go to https://console.anthropic.com
2. Sign up / Log in
3. Create API key
4. Copy the key (starts with `sk-ant-`)

**Option C: No API Key**
- Skip this! System will use fallback mode

### 2.3 Add API Key to `.env`

Edit `.env` file:
```bash
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3000
```

## 🚀 Step 3: Run It! (1 minute)

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════╗
║   Educational Quiz Generator Server                    ║
║   Running on: http://localhost:3000                   ║
║   AI Provider: OPENAI                                  ║
║   API Key: ✓ Configured                               ║
╚════════════════════════════════════════════════════════╝
```

Open browser: **http://localhost:3000**

## 🎓 Step 4: Test It! (30 seconds)

1. Click **"Load Sample Content"** button
2. Click **"Generate Quiz with AI"** button  
3. Wait 15-20 seconds while AI analyzes
4. Answer the questions
5. Click **"Submit Quiz"**
6. See your results!

## 🎉 Success!

You now have a working AI quiz generator!

## 🔄 Try Your Own Content

1. Paste ANY educational content:
   - Wikipedia articles
   - Textbook chapters
   - Lecture notes
   - Study guides
   - Research papers

2. Configure options:
   - Number of questions (3-20)
   - Difficulty level
   - Subject area
   - Grade level

3. Click "Generate Quiz with AI"

4. Questions will be customized to YOUR content!

## 💡 What Makes This Different?

❌ **Old way:** Fixed sample questions
✅ **New way:** AI generates questions from YOUR content

Every time you paste new content, you get new questions!

## 🆘 Troubleshooting

### "Cannot connect to backend"
**Fix:** Make sure you ran `npm start`

### "Backend Not Running" badge
**Fix:** 
```bash
# Stop any running servers
# Press Ctrl+C in terminal
# Then restart
npm start
```

### Questions don't relate to my content
**Fix:** 
- Make sure content is at least 100 words
- Check API key is correct in `.env`
- Try with sample content first

**