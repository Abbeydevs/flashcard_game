import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting data seeding...");

  const pmpModule = await prisma.module.upsert({
    where: { name: "PMP" },
    update: {},
    create: {
      name: "PMP",
      description: "PMP Exam Prep (PMBOK 7th Edition Focus)",
    },
  });

  console.log(`Checked Module: ${pmpModule.name}`);

  const pmpProcess = await prisma.deck.upsert({
    where: {
      moduleId_name: {
        moduleId: pmpModule.id,
        name: "Process Domain",
      },
    },
    update: {},
    create: {
      name: "Process Domain",
      moduleId: pmpModule.id,
      description: "The Technical Aspects of Managing a Project",
    },
  });

  console.log(`Checked Deck: ${pmpProcess.name}`);

  console.log("🚀 Generating 20 sample cards...");

  const sampleQuestions = [
    {
      q: "What is the main output of the Validate Scope process?",
      a: "Accepted Deliverables",
      diff: 2,
    },
    {
      q: "Which document authorizes the existence of a project?",
      a: "Project Charter",
      diff: 1,
    },
    {
      q: "What is the key benefit of the Control Procurements process?",
      a: "Ensures both parties meet contractual obligations",
      diff: 3,
    },
    {
      q: "In which process group is the stakeholder register created?",
      a: "Initiating",
      diff: 1,
    },
    {
      q: "What tool is used to calculate the critical path?",
      a: "Critical Path Method (CPM)",
      diff: 4,
    },
    {
      q: "Who is responsible for the quality of the project deliverables?",
      a: "Project Manager",
      diff: 2,
    },
    {
      q: "What is the formula for Cost Performance Index (CPI)?",
      a: "EV / AC",
      diff: 3,
    },
    {
      q: "Which contract type carries the highest risk for the buyer?",
      a: "Cost Plus Percentage of Cost (CPPC)",
      diff: 5,
    },
    {
      q: "What is the purpose of a kick-off meeting?",
      a: "To engage stakeholders and set expectations",
      diff: 1,
    },
    {
      q: "Which conflict resolution technique is considered a win-win?",
      a: "Collaborate/Problem Solve",
      diff: 2,
    },
    // ... filling the rest with generic ones to hit 20
  ];

  for (let i = 0; i < 20; i++) {
    const data = sampleQuestions[i % sampleQuestions.length];

    await prisma.card.create({
      data: {
        deckId: pmpProcess.id,
        question: `${data.q} (Variant ${i + 1})`, // Make unique
        options: [
          { text: data.a, isCorrect: true },
          { text: "Incorrect Option A", isCorrect: false },
          { text: "Incorrect Option B", isCorrect: false },
          { text: "Incorrect Option C", isCorrect: false },
        ],
        explanation: `This is the explanation for ${data.a}.`,
        reference: "PMBOK 7th Ed",
        difficulty: data.diff,
      },
    });
  }

  console.log("✅ Seeding complete! Added 20 cards.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
