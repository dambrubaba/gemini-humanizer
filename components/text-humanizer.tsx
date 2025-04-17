"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { humanizeText } from "@/lib/actions"
import { Loader2, ArrowRight, AlertCircle } from "lucide-react"
import type { Humanization } from "@/lib/types"
import { HumanizationHistory } from "@/components/humanization-history"

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

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return

    const timer = setTimeout(() => {
      setCooldown(cooldown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [cooldown])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    if (e.target.value.trim()) {
      setShowPreview(true)
    } else {
      setShowPreview(false)
      setShowOutput(false)
    }
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

  return (
    <div className="w-full">
      {/* Search-like input field */}
      <div className="mb-8">
        <Textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Paste AI-generated text here..."
          className="min-h-[100px] resize-none bg-neutral-900 border-neutral-800 text-neutral-300 placeholder:text-neutral-600 focus:border-neutral-700 focus:ring-0"
          maxLength={5000}
        />
        <div className="mt-1 text-right text-xs text-neutral-600">{inputText.length}/5000 characters</div>
      </div>

      {/* Preview section - only shown when there's input */}
      {showPreview && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="w-[220px] bg-neutral-900 border-neutral-800 text-neutral-300 focus:ring-0">
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-300">
                {HUMANIZATION_STYLES.map((style) => (
                  <SelectItem
                    key={style.value}
                    value={style.value}
                    className="focus:bg-neutral-800 focus:text-neutral-200"
                  >
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={handleHumanize}
              disabled={loading || !inputText.trim() || cooldown > 0}
              className="ml-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border-none"
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
            <div className="p-3 bg-red-900/20 text-red-400 text-sm rounded-md flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Output section - only shown after conversion */}
          {showOutput && (
            <div className="mt-6 p-4 border border-neutral-800 rounded-md bg-neutral-900/50">
              <div className="space-y-4">
                <h2 className="text-sm text-neutral-400">Humanized Output</h2>
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[200px] bg-neutral-900 border-neutral-800 text-neutral-300 focus:ring-0"
                />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(outputText)
                    }}
                    className="flex-1 border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300"
                  >
                    Copy to Clipboard
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setOutputText("")
                      setShowOutput(false)
                    }}
                    className="flex-1 border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300"
                  >
                    Clear Output
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* History toggle button */}
          <div className="mt-8 text-center">
            <Button
              variant="ghost"
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-neutral-500 hover:text-neutral-300 hover:bg-transparent"
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
