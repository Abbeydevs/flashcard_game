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
