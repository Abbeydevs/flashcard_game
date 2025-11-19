import { prisma } from "@/lib/auth";
import { validateRequest } from "@/lib/session";

export async function getModulesWithDecks() {
  const { user } = await validateRequest();
  if (!user) return [];

  const modules = await prisma.module.findMany({
    include: {
      decks: {
        include: {
          cards: {
            include: {
              userCardPerformances: {
                where: { userId: user.id },
              },
            },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return modules.map((mod) => ({
    id: mod.id,
    name: mod.name,
    description: mod.description,
    decks: mod.decks.map((deck) => {
      const totalCards = deck.cards.length;

      const masteredCards = deck.cards.filter(
        (card) => card.userCardPerformances[0]?.status === "MASTERED"
      ).length;

      const progress =
        totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

      return {
        id: deck.id,
        name: deck.name,
        description: deck.description,
        totalCards,
        masteredCards,
        progress,
      };
    }),
  }));
}

export async function getDeckWithCards(deckId: string) {
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: {
      cards: true,
    },
  });

  return deck;
}
