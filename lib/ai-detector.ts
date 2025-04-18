// Simple AI text detection algorithm
// This is a simplified version for demonstration purposes

interface DetectionResult {
  aiScore: number
  humanScore: number
  features: {
    repetitivePatterns: number
    sentenceVariability: number
    unusualPhrasing: number
    naturalFlow: number
    inconsistencies: number
  }
}

export function detectAIText(text: string): DetectionResult {
  // Normalize text
  const normalizedText = text.toLowerCase().trim()

  // Skip very short texts
  if (normalizedText.length < 50) {
    return {
      aiScore: 50,
      humanScore: 50,
      features: {
        repetitivePatterns: 0.5,
        sentenceVariability: 0.5,
        unusualPhrasing: 0.5,
        naturalFlow: 0.5,
        inconsistencies: 0.5,
      },
    }
  }

  // Split into sentences
  const sentences = normalizedText.split(/[.!?]+/).filter((s) => s.trim().length > 0)

  // Calculate sentence length variability (higher = more human-like)
  const sentenceLengths = sentences.map((s) => s.trim().split(/\s+/).length)
  const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length
  const sentenceLengthVariance =
    sentenceLengths.reduce((a, b) => a + Math.pow(b - avgSentenceLength, 2), 0) / sentenceLengths.length
  const normalizedVariance = Math.min(sentenceLengthVariance / 10, 1) // Normalize to 0-1

  // Check for repetitive patterns (lower = more human-like)
  const words = normalizedText.split(/\s+/)
  const uniqueWords = new Set(words)
  const wordRepetitionRatio = 1 - uniqueWords.size / words.length

  // Check for common AI phrases and patterns (lower = more human-like)
  const aiPhrases = [
    "in conclusion",
    "to summarize",
    "it is important to note",
    "it is worth mentioning",
    "it should be noted",
    "as mentioned earlier",
    "as previously stated",
    "in other words",
  ]

  let aiPhraseCount = 0
  aiPhrases.forEach((phrase) => {
    const regex = new RegExp(phrase, "gi")
    const matches = normalizedText.match(regex)
    if (matches) {
      aiPhraseCount += matches.length
    }
  })

  const aiPhraseScore = Math.min(aiPhraseCount / 3, 1) // Normalize to 0-1

  // Check for inconsistencies and typos (higher = more human-like)
  const inconsistencyScore = checkForInconsistencies(normalizedText)

  // Check for natural flow (higher = more human-like)
  const naturalFlowScore = checkForNaturalFlow(sentences)

  // Calculate final scores
  const features = {
    repetitivePatterns: 1 - wordRepetitionRatio, // Higher is more human-like
    sentenceVariability: normalizedVariance, // Higher is more human-like
    unusualPhrasing: 1 - aiPhraseScore, // Higher is more human-like
    naturalFlow: naturalFlowScore, // Higher is more human-like
    inconsistencies: inconsistencyScore, // Higher is more human-like
  }

  // Calculate weighted average
  const weights = {
    repetitivePatterns: 0.25,
    sentenceVariability: 0.25,
    unusualPhrasing: 0.2,
    naturalFlow: 0.2,
    inconsistencies: 0.1,
  }

  const humanScore = Math.round(
    (features.repetitivePatterns * weights.repetitivePatterns +
      features.sentenceVariability * weights.sentenceVariability +
      features.unusualPhrasing * weights.unusualPhrasing +
      features.naturalFlow * weights.naturalFlow +
      features.inconsistencies * weights.inconsistencies) *
      100,
  )

  const aiScore = 100 - humanScore

  return {
    aiScore,
    humanScore,
    features: {
      repetitivePatterns: Number.parseFloat(features.repetitivePatterns.toFixed(2)),
      sentenceVariability: Number.parseFloat(features.sentenceVariability.toFixed(2)),
      unusualPhrasing: Number.parseFloat(features.unusualPhrasing.toFixed(2)),
      naturalFlow: Number.parseFloat(features.naturalFlow.toFixed(2)),
      inconsistencies: Number.parseFloat(features.inconsistencies.toFixed(2)),
    },
  }
}

// Helper function to check for inconsistencies and typos
function checkForInconsistencies(text: string): number {
  // This is a simplified version
  // In a real implementation, you would use NLP libraries

  // Check for contractions inconsistency
  const contractions = ["don't", "can't", "won't", "it's", "i'm", "you're"]
  const fullForms = ["do not", "cannot", "will not", "it is", "i am", "you are"]

  let mixedFormsCount = 0

  // Check if both contracted and full forms are used
  for (let i = 0; i < contractions.length; i++) {
    const contractionRegex = new RegExp(`\\b${contractions[i]}\\b`, "gi")
    const fullFormRegex = new RegExp(`\\b${fullForms[i]}\\b`, "gi")

    const contractionMatches = (text.match(contractionRegex) || []).length
    const fullFormMatches = (text.match(fullFormRegex) || []).length

    if (contractionMatches > 0 && fullFormMatches > 0) {
      mixedFormsCount++
    }
  }

  // Normalize to 0-1
  return Math.min(mixedFormsCount / 3, 1)
}

// Helper function to check for natural flow
function checkForNaturalFlow(sentences: string[]): number {
  // Check for sentence starters variety
  const starters = sentences
    .map((s) => {
      const words = s.trim().split(/\s+/)
      return words.length > 0 ? words[0].toLowerCase() : ""
    })
    .filter((s) => s.length > 0)

  const uniqueStarters = new Set(starters)
  const starterVarietyRatio = uniqueStarters.size / starters.length

  // Check for transition words
  const transitionWords = ["however", "therefore", "furthermore", "moreover", "nevertheless", "thus", "consequently"]
  let transitionCount = 0

  sentences.forEach((sentence) => {
    transitionWords.forEach((word) => {
      if (sentence.toLowerCase().includes(word)) {
        transitionCount++
      }
    })
  })

  // Normalize transition density (too many or too few are both suspicious)
  const idealTransitionRatio = 0.2 // About 1 in 5 sentences should have transitions
  const actualTransitionRatio = transitionCount / sentences.length
  const transitionScore = 1 - Math.abs(actualTransitionRatio - idealTransitionRatio) * 2

  // Combine scores
  return starterVarietyRatio * 0.6 + transitionScore * 0.4
}
