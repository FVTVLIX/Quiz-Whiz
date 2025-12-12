# Quiz-Whiz: AI-Powered Educational Assistant

**Transform any text into a comprehensive quiz in seconds.** 

Quiz-Whiz leverages advanced AI to instantly generate high-quality educational assessments. Whether you're a teacher preparing for class, a student studying for exams, or a professional creating training materials, Quiz-Whiz does the heavy lifting for you.

---

## Why Use Quiz-Whiz? (The Impact)

Creating diverse, accurate, and engaging quizzes manually is time-consuming and often repetitive. Quiz-Whiz changes the game.

| **Without Quiz-Whiz** | **With Quiz-Whiz** |
| :--- | :--- |
| **Hours of Work**: Manually drafting questions, distractors, and answers takes forever. | **Seconds to Generate**: Paste your content, click one button, and get a full quiz instantly. |
| **Cognitive Load**: Struggle to come up with creative wrong answers (distractors). | **AI Creativity**: Automatically generates plausible distractors and varied question formats. |
| **Limited Variety**: Easy to get stuck writing the same type of questions. | **diverse Formats**: Instantly varies between Multiple Choice, True/False, and Short Answer. |
| **Static Grading**: Grading takes time and feedback is often delayed. | **Instant Feedback**: Auto-grading with intelligent fuzzy matching for text answers. |
| **One Size Fits All**: Difficult to adjust content for different learning levels. | **Customizable**: Instantly adjust difficulty (Beginner to Advanced) and Grade Level. |

---

## Key Features

*   **Advanced AI Generation**: Powered by OpenAI/Anthropic to understand context and nuance in your text.
*   **Intelligent Grading**: 
    *   **Keyword Matching**: Short answers are graded based on key concepts, not exact matches.
    *   **Instant Explanations**: Immediate feedback explains *why* an answer is correct or incorrect.
*   **Flexible Formats**:
    *   **Multiple Choice**: Standard testing format with smart distractors.
    *   **True/False**: Rapid-fire fact checking.
    *   **Short Answer**: Key-concept validation for deeper understanding.
*   **Modern Minimalist Design**: A clean, distraction-free interface built for focus (no clutter, no purple gradients).
*   **Deep Customization**: Control the subject, difficulty, grade level, and question count to fit your exact needs.

---

## How It Works

1.  **Input Content**: Paste notes, articles, or documentation into the text area.
2.  **Customize**: Select your target audience (e.g., "High School", "History") and difficulty.
3.  **Generate**: Watch as the AI constructs a tailored quiz in roughly 10-15 seconds.
4.  **Test & Learn**: Take the quiz and get instant, detailed feedback on your performance.

---

## Quick Start Guide

### Prerequisites
*   Node.js (v14+)
*   An API Key (OpenAI or Anthropic)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/FVTVLIX/quiz-whiz.git
cd quiz-whiz

# 2. Install dependencies
npm install

# 3. Configure API Key
# Create a .env file and add your key:
echo "OPENAI_API_KEY=your_key_here" > .env

# 4. Start the Application
npm start
```

Visit **`http://localhost:3000`** in your browser to start.

---

## Tech Stack

*   **Frontend**: HTML5, Vanilla JavaScript, CSS3 (Inter font, modern variables)
*   **Backend**: Node.js, Express
*   **AI Integration**: OpenAI API / Anthropic Claude API
*   **Tools**: Rate Limiting, Helmet (Security), CORS

---

## Contributing

We welcome contributions! Please feel free to verify the logic, improve the prompt engineering, or enhance the UI.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

**Made for a smarter way to learn.** 