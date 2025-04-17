"use server"

import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { cookies } from "next/headers"

interface HumanizeTextParams {
  text: string
  style: string
}

export async function humanizeText({ text, style }: HumanizeTextParams) {
  try {
    // Apply rate limiting
    // Note: In a real server action, we'd need to get the request object differently
    // This is a simplified implementation
    const clientIp = cookies().get("client-ip")?.value || "anonymous"

    // Check if user has made too many requests recently
    // Using a simple in-memory approach for demonstration
    const lastRequestTime = cookies().get("last-request-time")?.value
    const now = Date.now()

    if (lastRequestTime && now - Number.parseInt(lastRequestTime) < 2000) {
      return { error: "Please wait a moment before making another request." }
    }

    // Set cookie for next request
    cookies().set("last-request-time", now.toString(), {
      maxAge: 60 * 60, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })

    // Input validation
    if (!text || text.length > 5000) {
      return { error: "Text must be between 1 and 5000 characters." }
    }

    // Get the appropriate prompt based on the selected style
    const prompt = getPromptForStyle(style, text)

    // Call Gemini API to humanize the text
    // Note: This uses the GEMINI_API_KEY environment variable automatically
    const { text: humanizedText } = await generateText({
      model: google("gemini-1.5-pro"),
      prompt,
      maxTokens: 4000, // Limit output size
    })

    return { humanizedText }
  } catch (error: any) {
    console.error("Error humanizing text:", error)
    return { error: error.message || "Failed to humanize text" }
  }
}

function getPromptForStyle(style: string, text: string): string {
  // Full prompt template from the user
  const basePrompt = `
# Enhanced Writing Style Prompt Template

This template is designed to help you generate clear, concise, and natural-sounding text for a broad audience. Follow these guidelines strictly to ensure effective communication and high-quality results. Use this as a checklist before submitting your final response.

---

## I. Prompt Specifications

- **Target Audience:**  
  General public, aiming for clear communication accessible to most readers.

- **Desired Tone:**  
  Natural, conversational, and authentic.

- **Content Overview:**  
  Rewriting the provided text to sound more human and less AI-generated.

- **Word Count:**  
  Similar to the original text length.

---

## II. Style Guidelines & Constraints

### A. Clarity and Conciseness

1. **Sentence Structure:**  
   - Vary sentence length for a natural rhythm.  
   - Avoid sentences over 25 words unless necessary.  
   - Use clear subject-verb-object structure.

2. **Word Choice:**  
   - Use precise, everyday language.  
   - Define technical terms or jargon.  
   - Favor active voice (90% or more).  

3. **Direct Address:**  
   - Use "you" and "your" for engagement, but avoid overuse.

4. **Conciseness:**  
   - Every word should add meaning.  
   - Remove redundancy and unnecessary qualifiers.

### B. Tone and Style

1. **Natural Conversational Tone:**  
   - Write as you would speak, but maintain grammar.  
   - Starting sentences with conjunctions is fine for flow, but don't overdo it.

2. **Honesty and Authenticity:**  
   - Be straightforward and unbiased.  
   - Avoid exaggeration or unsubstantiated claims.

3. **Active Voice:**  
   - Use active voice consistently.  
   - Use passive voice only when necessary or stylistically appropriate.

4. **Avoid Marketing Clichés:**  
   - Do not use phrases like: "game-changing," "revolutionary," "cutting-edge," "synergy," "paradigm shift."  

### C. Grammar and Mechanics

1. **Grammar:**  
   - Use correct grammar.  
   - Minor imperfections are okay if they help flow, but aim for accuracy.

2. **Capitalization and Punctuation:**  
   - Follow standard English conventions.  
   - Use punctuation correctly and sparingly.  
   - Avoid excessive semicolons and em dashes.  
   - No emojis, hashtags, or asterisks unless requested.

3. **Formatting:**  
   - Unless specified, write as a single, coherent paragraph.  
   - Use bullet points or numbered lists only if requested.

---

## III. Prohibited Elements

Do not include these unless explicitly requested and justified:

- **Filler Phrases:**  
  e.g., "It goes without saying," "Needless to say," "In order to," "At the end of the day."

- **Clichés and Jargon:**  
  Avoid overused expressions and unnecessary technical terms.  

- **Unnecessary Conditional Language:**  
  Use definitive language. Avoid "could," "might," "may" unless uncertainty is essential.

- **Redundancy and Repetition:**  
  Do not repeat words or ideas unnecessarily.

- **Forced Keyword Placement:**  
  Do not insert keywords if they disrupt natural flow.

---

Here is the text to rewrite:

"""
${text}
"""
`

  const stylePrompts: Record<string, string> = {
    natural: `${basePrompt}

Additional instruction: Rewrite this like you're having a friendly conversation with someone you know well.`,

    emotional: `${basePrompt}

Additional instruction: Add warmth to this response while maintaining its professionalism. Rephrase with more empathy and understanding.`,

    conversational: `${basePrompt}

Additional instruction: Use more contractions and everyday language in this response. Break down complex ideas like you're explaining them to a friend.`,

    personal: `${basePrompt}

Additional instruction: Include more 'you' and 'we' to make this more personal. Add relevant examples that people can relate to.`,

    active: `${basePrompt}

Additional instruction: Use active voice and make this more direct. Write this like you're enthusiastically sharing helpful information.`,

    transitions: `${basePrompt}

Additional instruction: Smooth out the transitions to sound more natural and flowing. Connect these ideas like you would in everyday conversation.`,

    cultural: `${basePrompt}

Additional instruction: Adjust this to sound more culturally relatable. Use everyday expressions that people commonly use.`,

    technical: `${basePrompt}

Additional instruction: Simplify this technical information while keeping it accurate. Explain this like an expert having a casual conversation.`,
  }

  return stylePrompts[style] || basePrompt
}
