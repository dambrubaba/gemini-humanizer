"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { formatDistanceToNow } from "date-fns"
import type { Humanization } from "@/lib/types"

export function HumanizationHistory() {
  const [humanizations, setHumanizations] = useState<Humanization[]>([])
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

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
          className="text-xs border-neutral-800 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300"
        >
          Clear History
        </Button>
      </div>

      {humanizations.map((item) => (
        <Collapsible
          key={item.id}
          open={openItems[item.id]}
          onOpenChange={() => toggleItem(item.id)}
          className="border border-neutral-800 rounded-md bg-neutral-900/30"
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-4 h-auto font-normal hover:bg-neutral-800/50">
              <div className="flex flex-col items-start text-left">
                <span className="font-medium text-neutral-400">
                  {item.original_text.substring(0, 60)}
                  {item.original_text.length > 60 ? "..." : ""}
                </span>
                <span className="text-xs text-neutral-600 mt-1">
                  Style: {item.style} • {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </span>
              </div>
              <span className="text-neutral-500">{openItems[item.id] ? "▲" : "▼"}</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-0 pb-4 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <h4 className="text-xs font-medium mb-2 text-neutral-500">Original:</h4>
                  <p className="text-sm text-neutral-400 whitespace-pre-wrap">{item.original_text}</p>
                </div>
                <div>
                  <h4 className="text-xs font-medium mb-2 text-neutral-500">Humanized:</h4>
                  <p className="text-sm text-neutral-400 whitespace-pre-wrap">{item.humanized_text}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(item.humanized_text)
                  }}
                  className="text-xs border-neutral-800 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300"
                >
                  Copy Result
                </Button>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
