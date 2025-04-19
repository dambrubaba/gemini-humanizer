"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { formatDistanceToNow } from "date-fns"
import type { Humanization } from "@/lib/types"
import { Copy } from "lucide-react"

export function HumanizationHistory() {
  const [humanizations, setHumanizations] = useState<Humanization[]>([])
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Load history from localStorage
  useEffect(() => {
    const loadHistory = () => {
      const historyJson = localStorage.getItem("humanization_history")
      const history: Humanization[] = historyJson ? JSON.parse(historyJson) : []
      setHumanizations(history)
    }

    // Load initially
    loadHistory()

    // Listen for updates
    window.addEventListener("humanization_updated", loadHistory)

    return () => {
      window.removeEventListener("humanization_updated", loadHistory)
    }
  }, [])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const clearHistory = () => {
    localStorage.removeItem("humanization_history")
    setHumanizations([])
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (humanizations.length === 0) {
    return <div className="text-center text-neutral-600 text-sm">No humanization history yet.</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={clearHistory}
          className="text-xs border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          Clear History
        </Button>
      </div>

      {humanizations.map((item) => (
        <Collapsible
          key={item.id}
          open={openItems[item.id]}
          onOpenChange={() => toggleItem(item.id)}
          className="border border-border rounded-md bg-background/30"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-4 h-auto font-normal hover:bg-secondary/50">
              <div className="flex flex-col items-start text-left w-full pr-4">
                <span className="font-medium text-foreground truncate w-full">
                  {item.original_text.substring(0, 60)}
                  {item.original_text.length > 60 ? "..." : ""}
                </span>
                <span className="text-xs text-muted-foreground mt-1 truncate w-full">
                  Style: {item.style} • {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </span>
              </div>
              <span className="text-muted-foreground flex-shrink-0">{openItems[item.id] ? "▲" : "▼"}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-0 pb-4 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <h4 className="text-xs font-medium mb-2 text-muted-foreground">Original:</h4>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{item.original_text}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium mb-2 text-muted-foreground">Humanized:</h4>
                  <p className="text-sm text-foreground whitespace-pre-wrap">{item.humanized_text}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(item.humanized_text, item.id)}
                  className="text-xs border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {copiedId === item.id ? (
                    "Copied!"
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Result
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
