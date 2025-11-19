import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { validateRequest } from "@/lib/session";
import { prisma } from "@/lib/auth";
import { Flame, Zap } from "lucide-react";

export async function Header() {
  const { user } = await validateRequest();

  let userStats = null;
  if (user) {
    userStats = await prisma.user.findUnique({
      where: { id: user.id },
      select: { xp: true, streak: true },
    });
  }

  return (
    <header className="border-b w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        <div className="flex items-center gap-4">
          {user && userStats ? (
            <>
              <div className="flex items-center gap-4 mr-2 bg-secondary/50 px-4 py-1.5 rounded-full border">
                <div className="flex items-center gap-1.5 text-orange-500 font-bold">
                  <Flame size={18} className="fill-orange-500" />
                  <span>{userStats.streak}</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-1.5 text-yellow-600 font-bold">
                  <Zap size={18} className="fill-yellow-400" />
                  <span>{userStats.xp} XP</span>
                </div>
              </div>

              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/login">Log in</Link>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
