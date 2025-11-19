import { prisma } from "@/lib/auth";

export async function checkAndResetStreak(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { streak: true, lastStudyDate: true, createdAt: true },
  });

  if (!user) return;

  const now = new Date();
  const lastStudy = new Date(user.lastStudyDate);

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const lastDate = new Date(
    lastStudy.getFullYear(),
    lastStudy.getMonth(),
    lastStudy.getDate()
  ).getTime();

  const oneDay = 24 * 60 * 60 * 1000;
  const diff = today - lastDate;

  let newStreak = user.streak;
  let shouldUpdate = false;

  if (diff === 0) {
    if (user.streak === 0) {
      newStreak = 1;
      shouldUpdate = true;
    } else {
      return;
    }
  } else if (diff === oneDay) {
    newStreak += 1;
    shouldUpdate = true;
  } else {
    newStreak = 1;
    shouldUpdate = true;
  }

  if (shouldUpdate) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        streak: newStreak,
        lastStudyDate: now,
      },
    });
  }
}
