"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { humanizeText } from "@/lib/actions"
import { Loader2, ArrowRight, AlertCircle, Check, Copy, RotateCcw, Zap } from "lucide-react"
import type { Humanization } from "@/lib/types"
import { HumanizationHistory } from "@/components/humanization-history"
import { detectAIText } from "@/lib/ai-detector"
import { Progress } from "@/components/ui/progress"

const HUMANIZATION_STYLES = [
  { value: "natural", label: "Natural Language & Flow" },
  { value: "emotional", label: "Emotional Connection" },
  { value: "conversational", label: "Conversational Elements" },
  { value: "personal", label: "Personal Touch" },
  { value: "active", label: "Active Engagement" },
  { value: "transitions", label: "Natural Transitions" },
  { value: "cultural", label: "Cultural Adaptability" },
  { value: "technical", label: "Technical Balance" },
]

// Track requests in client-side memory
const REQUEST_TRACKING = {
  lastRequestTime: 0,
  requestCount: 0,
  resetTime: 0,
}

export function TextHumanizer() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [style, setStyle] = useState("natural")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showOutput, setShowOutput] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [copied, setCopied] = useState(false)
  const [cleared, setCleared] = useState(false)
  const [detectionResult, setDetectionResult] = useState<{
    aiScore: number
    humanScore: number
    features: {
      repetitivePatterns: number
      sentenceVariability: number
      unusualPhrasing: number
      naturalFlow: number
      inconsistencies: number
    }
  } | null>(null)
  const [showDetectionResult, setShowDetectionResult] = useState(false)
  const [detectingText, setDetectingText] = useState(false)

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return

    const timer = setTimeout(() => {
      setCooldown(cooldown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [cooldown])

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (!copied) return

    const timer = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [copied])

  // Reset cleared state after 2 seconds
  useEffect(() => {
    if (!cleared) return

    const timer = setTimeout(() => {
      setCleared(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [cleared])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    if (e.target.value.trim()) {
      setShowPreview(true)
    } else {
      setShowPreview(false)
      setShowOutput(false)
    }
    // Reset detection results when input changes
    setDetectionResult(null)
    setShowDetectionResult(false)
  }

  const handleHumanize = async () => {
    if (!inputText.trim()) return

    // Client-side rate limiting
    const now = Date.now()

    // Check if we need to reset the counter
    if (REQUEST_TRACKING.resetTime < now) {
      REQUEST_TRACKING.requestCount = 0
      REQUEST_TRACKING.resetTime = now + 60000 // 1 minute window
    }

    // Check if we've made too many requests
    if (REQUEST_TRACKING.requestCount >= 10) {
      setError("You've reached the rate limit. Please try again later.")
      return
    }

    // Check if we're trying to make requests too quickly
    if (now - REQUEST_TRACKING.lastRequestTime < 2000) {
      setError("Please wait a moment before making another request.")
      setCooldown(2)
      return
    }

    // Update tracking
    REQUEST_TRACKING.lastRequestTime = now
    REQUEST_TRACKING.requestCount++

    setLoading(true)
    setError(null)
    setDetectionResult(null)
    setShowDetectionResult(false)

    try {
      // Input validation
      if (inputText.length > 5000) {
        throw new Error("Text must be less than 5000 characters.")
      }

      const result = await humanizeText({
        text: inputText,
        style,
      })

      if (result.error) {
        throw new Error(result.error)
      }

      setOutputText(result.humanizedText)
      setShowOutput(true)

      // Save to local storage history
      const timestamp = new Date().toISOString()
      const newHumanization: Humanization = {
        id: timestamp,
        original_text: inputText,
        humanized_text: result.humanizedText,
        style,
        created_at: timestamp,
      }

      // Get existing history
      const historyJson = localStorage.getItem("humanization_history")
      const history: Humanization[] = historyJson ? JSON.parse(historyJson) : []

      // Add new item and limit to 10 entries
      const updatedHistory = [newHumanization, ...history].slice(0, 10)
      localStorage.setItem("humanization_history", JSON.stringify(updatedHistory))

      // Dispatch event to notify history component
      window.dispatchEvent(new Event("humanization_updated"))
    } catch (err: any) {
      setError(err.message || "Failed to humanize text. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
    setCopied(true)
  }

  const handleClearOutput = () => {
    setOutputText("")
    setShowOutput(false)
    setDetectionResult(null)
    setShowDetectionResult(false)
    setCleared(true)
  }

  const handleDetectAI = () => {
    if (!outputText) return

    setDetectingText(true)
    setShowDetectionResult(false)

    // Simulate a delay for analysis
    setTimeout(() => {
      const result = detectAIText(outputText)
      setDetectionResult(result)
      setShowDetectionResult(true)
      setDetectingText(false)
    }, 1500)
  }

  return (
    <div className="w-full">
      {/* Search-like input field */}
      <div className="mb-8">
        <Textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Paste AI-generated text here..."
          className="min-h-[100px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-0"
          maxLength={5000}
        />
        <div className="mt-1 text-right text-xs text-muted-foreground">{inputText.length}/5000 characters</div>
      </div>

      {/* Preview section - only shown when there's input */}
      {showPreview && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="w-[220px] bg-background border-border text-foreground focus:ring-0">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border text-foreground">
                {HUMANIZATION_STYLES.map((style) => (
                  <SelectItem
                    key={style.value}
                    value={style.value}
                    className="focus:bg-secondary focus:text-foreground"
                  >
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleHumanize}
              disabled={loading || !inputText.trim() || cooldown > 0}
              className="ml-2 bg-secondary hover:bg-secondary/80 text-foreground border-none"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Humanizing...
                </>
              ) : cooldown > 0 ? (
                <>Wait {cooldown}s...</>
              ) : (
                <>
                  Humanize <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-destructive/20 text-destructive text-sm rounded-md flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Output section - only shown after conversion */}
          {showOutput && (
            <div className="mt-6 p-4 border border-border rounded-md bg-background/50">
              <div className="space-y-4">
                <h2 className="text-sm text-foreground">Humanized Output</h2>
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[200px] bg-background border-border text-foreground focus:ring-0"
                />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCopyToClipboard}
                    className="flex-1 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleClearOutput}
                    className="flex-1 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {cleared ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Cleared!
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Clear Output
                      </>
                    )}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={handleDetectAI}
                  disabled={detectingText}
                  className="w-full mt-2 border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {detectingText ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing Text...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Run Detection Test
                    </>
                  )}
                </Button>

                {showDetectionResult && detectionResult && (
                  <div className="mt-4 p-4 border border-border rounded-md bg-background">
                    <h3 className="text-sm font-medium mb-2">AI Detection Results</h3>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Human-like: {detectionResult.humanScore}%</span>
                          <span className="text-xs">AI-like: {detectionResult.aiScore}%</span>
                        </div>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500" style={{ width: `${detectionResult.humanScore}%` }} />
                          <div className="bg-red-500" style={{ width: `${detectionResult.aiScore}%` }} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-medium">Analysis Breakdown:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="flex justify-between">
                              <span>Varied Patterns:</span>
                              <span>{Math.round(detectionResult.features.repetitivePatterns * 100)}%</span>
                            </div>
                            <Progress value={detectionResult.features.repetitivePatterns * 100} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span>Sentence Variety:</span>
                              <span>{Math.round(detectionResult.features.sentenceVariability * 100)}%</span>
                            </div>
                            <Progress value={detectionResult.features.sentenceVariability * 100} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span>Natural Phrasing:</span>
                              <span>{Math.round(detectionResult.features.unusualPhrasing * 100)}%</span>
                            </div>
                            <Progress value={detectionResult.features.unusualPhrasing * 100} className="h-1" />
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <span>Flow Quality:</span>
                              <span>{Math.round(detectionResult.features.naturalFlow * 100)}%</span>
                            </div>
                            <Progress value={detectionResult.features.naturalFlow * 100} className="h-1" />
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {detectionResult.humanScore >= 70 ? (
                          <p>✅ This text appears mostly human-like and should bypass most AI detectors.</p>
                        ) : detectionResult.humanScore >= 50 ? (
                          <p>⚠️ This text has mixed characteristics and might be flagged by some AI detectors.</p>
                        ) : (
                          <p>❌ This text has strong AI patterns and would likely be detected as AI-generated.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* History toggle button */}
          <div className="mt-8 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-muted-foreground hover:text-foreground hover:bg-transparent"
            >
              {showHistory ? "Hide History" : "Show History"}
            </Button>
          </div>

          {/* History section */}
          {showHistory && (
            <div className="mt-4">
              <HumanizationHistory />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
