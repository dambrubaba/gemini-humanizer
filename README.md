# AI Text Humanizer

A minimalist web application that transforms AI-generated text into more natural, human-like writing using the Google Gemini API.

![AI Text Humanizer Screenshot](/humanizer-og.png)

## Features

- **Text Transformation**: Convert AI-generated text to more natural, human-like writing
- **Multiple Humanization Styles**: Choose from 8 different humanization styles
- **History Tracking**: Save and review previous humanizations
- **Copy to Clipboard**: Easily copy humanized text
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Terminal-inspired minimalist dark interface
- **Local Storage**: Saves history without requiring a database
- **Security Measures**: Rate limiting and input validation to prevent abuse
- **SEO Optimized**: Complete Open Graph metadata and favicon system

## Security Features

- **Rate Limiting**: Limits users to 10 requests per minute
- **Cooldown Period**: Enforces a 2-second delay between requests
- **Input Validation**: Restricts input to 5,000 characters maximum
- **Error Handling**: Provides clear error messages for rate limit issues
- **Client & Server Protection**: Implements rate limiting on both client and server sides

## Humanization Styles

- **Natural Language & Flow**: Improves the natural flow of language
- **Emotional Connection**: Adds warmth and emotional elements
- **Conversational Elements**: Makes text sound more like natural conversation
- **Personal Touch**: Adds personal elements and relatable examples
- **Active Engagement**: Uses active voice and direct communication
- **Natural Transitions**: Improves transitions between ideas
- **Cultural Adaptability**: Adds culturally relatable expressions
- **Technical Balance**: Balances technical accuracy with conversational tone

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Customized shadcn/ui components
- **AI Integration**: Google Gemini API via AI SDK
- **State Management**: React Hooks
- **Storage**: Local Storage API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- Google Generative AI API key

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/ai-text-humanizer.git
   cd ai-text-humanizer
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env.local` file in the root directory and add your Google Generative AI API key:
   \`\`\`
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Input Text**: Paste AI-generated text into the input field
2. **Select Style**: Choose a humanization style from the dropdown
3. **Humanize**: Click the "Humanize" button to transform the text
4. **View Result**: Review the humanized text in the output area
5. **Copy or Clear**: Copy the result to clipboard or clear the output
6. **View History**: Toggle the history section to view past humanizations

## Project Structure

\`\`\`
ai-text-humanizer/
├── app/                  # Next.js App Router files
│   ├── layout.tsx        # Root layout with theme provider
│   ├── page.tsx          # Main application page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── humanization-history.tsx  # History component
│   ├── text-humanizer.tsx        # Main humanizer component
│   ├── theme-provider.tsx        # Theme context provider
│   └── ui/               # UI components (shadcn/ui)
├── lib/                  # Utility functions and types
│   ├── actions.ts        # Server actions for API calls
│   ├── rate-limit.ts     # Rate limiting implementation
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── middleware.ts         # Next.js middleware for API rate limiting
├── public/               # Static assets
│   └── robot-head.png    # Robot avatar image
├── .env.local            # Environment variables (not in repo)
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
\`\`\`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Generative AI API key | Yes |

## Deployment

The application is optimized for deployment on Vercel:

1. Fork or clone this repository to your GitHub account
2. Create a new project on Vercel and import the repository
3. Add the required environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by [pqoqubbw.dev](https://pqoqubbw.dev)
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI capabilities powered by [Google Gemini API](https://ai.google.dev/)

## Contact

Your Name - [@scionofshiv](https://x.com/scionofshiv) - dambrureddy321@gmail.com

Project Link: [https://github.com/yourusername/ai-text-humanizer](https://github.com/yourusername/ai-text-humanizer)
