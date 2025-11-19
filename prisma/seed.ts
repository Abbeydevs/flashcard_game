import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting data seeding...");

  const prince2Module = await prisma.module.create({
    data: {
      name: "PRINCE2 v7",
      description: "PRINCE2 7th Edition Foundation & Practitioner Exam Prep",
    },
  });

  const pmpModule = await prisma.module.create({
    data: {
      name: "PMP",
      description: "PMP Exam Prep (PMBOK 7th Edition Focus)",
    },
  });

  console.log(`Created Modules: ${prince2Module.name}, ${pmpModule.name}`);

  const p2Principles = await prisma.deck.create({
    data: {
      name: "Principles",
      moduleId: prince2Module.id,
      description: "The 7 Core Principles of PRINCE2",
    },
  });

  const pmpPeople = await prisma.deck.create({
    data: {
      name: "People Domain",
      moduleId: pmpModule.id,
      description: "Leadership, Team Management, and Conflict Resolution",
    },
  });

  const pmpProcess = await prisma.deck.create({
    data: {
      name: "Process Domain",
      moduleId: pmpModule.id,
      description: "The Technical Aspects of Managing a Project",
    },
  });

  console.log(`Created Decks: ${p2Principles.name}, ${pmpPeople.name}, etc.`);

  await prisma.card.create({
    data: {
      deckId: pmpProcess.id,
      question:
        "Which process involves authorizing the project at a high level?",
      options: [
        { text: "Planning", isCorrect: false },
        { text: "Initiating the Project", isCorrect: true },
        { text: "Closing the Project", isCorrect: false },
      ],
      explanation:
        "The Initiating the Project process ensures the project is properly authorized.",
      reference: "PMBOK 7 Process Domain",
      difficulty: 2,
    },
  });

  await prisma.card.create({
    data: {
      deckId: p2Principles.id,
      question: "Which PRINCE2 principle ensures continued justification?",
      options: [
        { text: "Learn from experience", isCorrect: false },
        { text: "Continued Business Justification", isCorrect: true },
        { text: "Manage by stages", isCorrect: false },
      ],
      explanation:
        "Every project must have a valid business case throughout its life.",
      reference: "PRINCE2 v7 Principle 1",
      difficulty: 1,
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
