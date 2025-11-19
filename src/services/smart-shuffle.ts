import { prisma } from "@/lib/auth";

export async function getSmartDeck(userId: string, deckId: string, limit = 10) {
  const allCards = await prisma.card.findMany({
    where: { deckId },
    include: {
      userCardPerformances: {
        where: { userId },
      },
    },
  });

  const newCards: typeof allCards = [];
  const weakCards: typeof allCards = [];
  const reviewCards: typeof allCards = [];
  const masteredCards: typeof allCards = [];

  allCards.forEach((card) => {
    const perf = card.userCardPerformances[0];

    if (!perf) {
      newCards.push(card);
    } else if (perf.status === "LEARNING" || perf.score < 50) {
      weakCards.push(card);
    } else if (perf.status === "REVIEW") {
      reviewCards.push(card);
    } else {
      masteredCards.push(card);
    }
  });

  const selection: typeof allCards = [];

  const pickRandom = (arr: any[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const slotsForWeak = Math.ceil(limit * 0.5);
  const slotsForNew = Math.ceil(limit * 0.3);
  const slotsForReview = limit - slotsForWeak - slotsForNew;

  selection.push(...pickRandom(weakCards, slotsForWeak));
  selection.push(...pickRandom(newCards, slotsForNew));
  selection.push(
    ...pickRandom([...reviewCards, ...masteredCards], slotsForReview)
  );

  if (selection.length < limit) {
    const remaining = allCards.filter(
      (c) => !selection.find((s) => s.id === c.id)
    );
    selection.push(...pickRandom(remaining, limit - selection.length));
  }

  return selection.sort(() => 0.5 - Math.random());
}
