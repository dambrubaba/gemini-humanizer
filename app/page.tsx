import { TextHumanizer } from "@/components/text-humanizer"
import { Twitter, Github, Globe, Mail } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col px-4 py-12 md:py-24 max-w-3xl mx-auto">
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image src="/robot-head.png" alt="Robot head avatar" width={32} height={32} className="object-cover" />
          </div>
          <div>
            <h1 className="text-sm text-neutral-300">
              bramha <span className="text-neutral-500">[humanizer]</span>
            </h1>
            <p className="text-xs text-neutral-500">bypass AI detection</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://x.com/scionofshiv"
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://github.com/dambrubaba"
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://damburudhar.vercel.app"
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe className="h-4 w-4" />
            <span className="sr-only">Website</span>
          </a>
          <a
            href="mailto:dambrureddy321@gmail.com"
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        <TextHumanizer />
      </main>

      <footer className="mt-16 text-center text-xs text-neutral-600">
        <p>© {new Date().getFullYear()} AI Text Humanizer</p>
      </footer>
    </div>
  )
}
