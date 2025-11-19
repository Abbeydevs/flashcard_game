import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, Trophy } from "lucide-react";
import Link from "next/link";

interface DeckSelectionGridProps {
  modules: {
    name: string;
    description: string | null;
    decks: {
      id: string;
      name: string;
      description: string | null;
      totalCards: number;
      masteredCards: number;
      progress: number;
    }[];
  }[];
}

export function DeckSelectionGrid({ modules }: DeckSelectionGridProps) {
  return (
    <div className="space-y-12">
      {modules.map((module) => (
        <section key={module.name} className="space-y-6">
          <div className="flex items-center gap-3 border-b pb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {module.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {module.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {module.decks.map((deck) => (
              <Link key={deck.id} href={`/game/${deck.id}`} className="group">
                <Card className="h-full transition-all hover:border-primary hover:shadow-md relative overflow-hidden">
                  {deck.progress === 100 && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                      COMPLETED
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {deck.name}
                      </CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-10">
                      {deck.description ||
                        "Master the key concepts in this domain."}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Mastery</span>
                        <span
                          className={
                            deck.progress === 100
                              ? "text-green-600"
                              : "text-primary"
                          }
                        >
                          {deck.progress}%
                        </span>
                      </div>
                      <Progress value={deck.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Badge
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {deck.totalCards} Cards
                      </Badge>

                      <div className="flex items-center text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Start Learning <ArrowRight className="ml-1 w-3 h-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
