import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// We define the type structure for our component props
interface DeckSelectionGridProps {
  modules: {
    name: string;
    description: string | null;
    decks: {
      id: string;
      name: string;
    }[];
  }[];
}

export function DeckSelectionGrid({ modules }: DeckSelectionGridProps) {
  return (
    <div className="space-y-12">
      {modules.map((module) => (
        <section key={module.name} className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight border-b pb-2">
            {module.name}
            <span className="text-lg font-normal text-muted-foreground ml-3">
              ({module.description})
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {module.decks.map((deck) => (
              <Link key={deck.id} href={`/game/${deck.id}`}>
                <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{deck.name}</CardTitle>
                    <CardDescription>
                      {/* Placeholder for progress bar/stats later */}
                      Ready to review {module.name} concepts.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">Start Deck</Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* Display message if no decks exist (though they should with our seed data) */}
            {module.decks.length === 0 && (
              <p className="text-muted-foreground">
                No decks available for this module yet.
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
