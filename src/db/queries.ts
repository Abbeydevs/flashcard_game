import { prisma } from "@/lib/auth";

export async function getModulesWithDecks() {
  const modules = await prisma.module.findMany({
    include: {
      decks: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return modules;
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
