import { BookOpen } from "lucide-react";
import { patterns } from "./data/patterns";
import { PatternCard } from "./components/PatternCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Design Patterns Explorer
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover and learn popular design patterns with practical Python examples. 
            See how to improve your code quality with before and after examples.
          </p>
        </div>

        <div className="grid gap-8">
          {patterns.map((category) => (
            <div key={category.category} className="space-y-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
                {category.category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.patterns.map((pattern) => (
                  <PatternCard key={pattern.name} pattern={pattern} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}