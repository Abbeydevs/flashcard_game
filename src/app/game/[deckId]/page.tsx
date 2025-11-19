import { getDeckWithCards } from "@/db/queries";
import { validateRequest } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { GameClient } from "@/components/features/game/game-client";

interface GamePageProps {
  params: Promise<{
    deckId: string;
  }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const { deckId } = await params;

  const deck = await getDeckWithCards(deckId);

  if (!deck) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <GameClient deckName={deck.name} cards={deck.cards} />
    </div>
  );
}
