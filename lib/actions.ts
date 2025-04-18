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
    const clientIp = cookies().get("client-ip")?.value || "anonymous"

    // Check if user has made too many requests recently
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
    const { text: humanizedText } = await generateText({
      model: google("gemini-1.5-pro"),
      prompt,
      maxTokens: 4000, // Limit output size
      temperature: 0.9, // Higher temperature for more randomness
    })

    return { humanizedText }
  } catch (error: any) {
    console.error("Error humanizing text:", error)
    return { error: error.message || "Failed to humanize text" }
  }
}

function getPromptForStyle(style: string, text: string): string {
  // Enhanced prompt template to avoid AI detection while maintaining quality
  const basePrompt = `
# High-Quality Human Writing Emulation

Your task is to rewrite the provided text to make it undetectable by AI content detectors while maintaining professional quality. Follow these guidelines meticulously:

## Core Principles

1. **Maintain Professional Quality**:
   - Ensure grammatical correctness and proper punctuation
   - Preserve clarity and readability throughout
   - Keep the original meaning and key points intact
   - Maintain approximately the same word count as the original text

2. **Structural Diversity**:
   - Vary sentence lengths naturally (mix short, medium, and long sentences)
   - Create diverse paragraph structures
   - Use a mix of simple, compound, and complex sentences
   - Occasionally start sentences with conjunctions (But, And, So) where appropriate

3. **Natural Language Patterns**:
   - Incorporate thoughtful transitions between ideas
   - Use rhetorical questions occasionally
   - Include measured personal perspectives where appropriate
   - Add parenthetical thoughts (like this) sparingly but effectively

4. **Linguistic Sophistication**:
   - Employ varied transitional phrases
   - Use strategic repetition for emphasis
   - Incorporate occasional metaphors or analogies
   - Balance formal and conversational tones appropriately

## Technical Avoidance Strategies

1. **Perplexity Optimization**:
   - Use unexpected but appropriate word combinations
   - Vary vocabulary sophistication throughout the text
   - Include creative but clear expressions
   - Avoid predictable phrasing patterns

2. **Burstiness Enhancement**:
   - Create natural variations in information density
   - Mix detailed explanations with concise statements
   - Alternate between abstract concepts and concrete examples
   - Use strategic emphasis at key points

3. **Pattern Disruption**:
   - Avoid statistical regularities in sentence structure
   - Mix active and passive voice naturally
   - Vary the positioning of dependent clauses
   - Use a diverse range of transitional expressions

4. **Entropy Maximization**:
   - Incorporate domain-specific terminology appropriately
   - Use precise word choices that might surprise prediction algorithms
   - Vary the complexity of explanations
   - Include occasional unique perspectives or insights

## Important Instructions

- Maintain high-quality, professional writing throughout
- Keep approximately the same length as the original text (±10%)
- Ensure the text flows naturally despite the introduced variations
- Do not mention that the text has been modified or rewritten
- Do not include any disclaimers or notes about AI generation
- Do not introduce factual errors or change the meaning of the original text

Here is the text to rewrite in a way that will bypass AI detection while maintaining professional quality:

"""
${text}
"""

Remember: The goal is to create text that is UNDETECTABLE as AI-generated while preserving professional quality and the original meaning.
`

  const stylePrompts: Record<string, string> = {
    natural: `${basePrompt}

Additional instruction: Focus on creating a natural flow of language with varied sentence structures and thoughtful transitions. Use a conversational yet professional tone that feels authentic and engaging. Incorporate occasional personal perspectives or reflections where appropriate.`,

    emotional: `${basePrompt}

Additional instruction: Infuse the text with appropriate emotional resonance and connection. Use evocative language, rhetorical questions, and occasional emphasis to create emotional depth. Include relatable scenarios or perspectives that evoke genuine feeling while maintaining professional quality.`,

    conversational: `${basePrompt}

Additional instruction: Create a conversational tone that feels like a thoughtful discussion between professionals. Use appropriate contractions, direct address, and occasional questions to engage the reader. Balance formality with approachability while maintaining clarity and precision.`,

    personal: `${basePrompt}

Additional instruction: Incorporate a measured personal perspective with "I" and "you" statements where appropriate. Add thoughtful reflections, considered opinions, and occasional personal examples that enhance the content without compromising professionalism or focus.`,

    active: `${basePrompt}

Additional instruction: Emphasize active voice and direct communication. Create dynamic sentence structures with strong verbs and clear agency. Vary between concise, impactful statements and more elaborate explanations to maintain engagement and clarity.`,

    transitions: `${basePrompt}

Additional instruction: Focus on sophisticated transitions between ideas that create a seamless reading experience. Use a variety of transitional phrases and techniques to connect concepts. Create logical progression through ideas while occasionally introducing thoughtful asides or elaborations.`,

    cultural: `${basePrompt}

Additional instruction: Incorporate culturally relevant references and expressions that resonate with readers. Use universally understood analogies and examples. Balance cultural specificity with accessibility, ensuring the content remains professional and inclusive.`,

    technical: `${basePrompt}

Additional instruction: Balance technical precision with accessibility. Use domain-specific terminology appropriately while providing clear explanations. Vary between technical details and broader concepts, using analogies where helpful to illustrate complex ideas without oversimplification.`,
  }

  return stylePrompts[style] || basePrompt
}
