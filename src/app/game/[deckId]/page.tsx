import { getDeckWithCards } from "@/db/queries";
import { validateRequest } from "@/lib/session";
import { redirect, notFound } from "next/navigation";
import { GameClient } from "@/components/features/game/game-client";
import { prisma } from "@/lib/auth";
import { getSmartDeck } from "@/services/smart-shuffle";

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

  const deckDetails = await prisma.deck.findUnique({
    where: { id: deckId },
    select: { name: true },
  });

  if (!deckDetails) {
    return notFound();
  }

  const smartCards = await getSmartDeck(user.id, deckId, 10);

  const deck = await getDeckWithCards(deckId);

  if (!deck) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <GameClient deckName={deckDetails.name} cards={smartCards} />
    </div>
  );
}
