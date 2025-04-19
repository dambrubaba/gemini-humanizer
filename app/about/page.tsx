import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col px-4 py-12 md:py-24 max-w-3xl mx-auto">
      <header className="mb-12">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Humanizer
        </Link>
      </header>

      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-6">About AI Text Humanizer</h1>

        <div className="space-y-6 text-sm">
          <section>
            <h2 className="text-lg font-medium mb-3">What is AI Text Humanizer?</h2>
            <p className="mb-3">
              AI Text Humanizer is a specialized tool designed to transform AI-generated content into natural,
              human-like writing that can bypass AI detection systems while maintaining professional quality.
            </p>
            <p>
              Using advanced linguistic techniques and Google's Gemini AI, our tool restructures text to remove
              statistical patterns that AI detectors look for, without introducing errors or compromising quality.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3">Why Choose Our Humanizer?</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Quality-Focused Approach</h3>
                <p>
                  Unlike competitors that introduce typos and grammatical errors to fool AI detectors, our humanizer
                  maintains professional quality while still achieving high bypass rates.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Multiple Humanization Styles</h3>
                <p>
                  Choose from 8 different writing styles to match your specific needs, from technical writing to
                  emotional content.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Built-in AI Detection Testing</h3>
                <p>
                  Test your humanized content with our integrated AI detector to ensure it will pass other detection
                  systems before you use it.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Privacy-Focused</h3>
                <p>
                  Your content is never stored on our servers. History is saved locally on your device, giving you
                  complete control over your data.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Powered by Advanced AI</h3>
                <p>
                  Utilizing Google's Gemini 1.5 Pro model, our humanizer leverages cutting-edge AI to produce the most
                  natural-sounding text possible.
                </p>
              </div>

              <div>
                <h3 className="font-medium">Minimalist, Distraction-Free Interface</h3>
                <p>Our clean, terminal-inspired design keeps the focus on your content, not flashy UI elements.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3">How It Works</h2>
            <p className="mb-3">Our humanizer uses sophisticated linguistic techniques to modify AI-generated text:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Structural diversity in sentences and paragraphs</li>
              <li>Natural language patterns that mimic human writing</li>
              <li>Perplexity optimization to create unexpected but appropriate word combinations</li>
              <li>Burstiness enhancement to vary information density naturally</li>
              <li>Pattern disruption to avoid statistical regularities</li>
            </ul>
            <p className="mt-3">
              These techniques allow the text to maintain its original meaning and professional quality while becoming
              undetectable to AI content scanners.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium mb-3">Use Cases</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Academic writing assistance</li>
              <li>Professional content creation</li>
              <li>Marketing copy development</li>
              <li>Creative writing enhancement</li>
              <li>Technical documentation</li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="mt-16 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} AI Text Humanizer</p>
      </footer>
    </div>
  )
}
