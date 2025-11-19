import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BrainCircuit,
  Trophy,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { validateRequest } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-24 px-4 bg-linear-to-b from-background to-muted/50">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
            Master Your <span className="text-primary">PMP & PRINCE2</span>{" "}
            Exams
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop wasting time on flashcards you already know. Our smart
            algorithm adapts to your learning pace, focusing on your weak spots
            to get you certified faster.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button size="lg" className="h-12 px-8 text-lg" asChild>
            <Link href="/signup">
              Start Learning Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-lg"
            asChild
          >
            <Link href="/login">Log In</Link>
          </Button>
        </div>

        <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Adaptive Logic
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Gamified XP
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Official
            Syllabus
          </div>
        </div>
      </section>

      <section className="container mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BrainCircuit className="w-10 h-10 text-primary" />}
            title="Smart Shuffle Algorithm"
            description="Our AI-driven logic prioritizes the cards you struggle with, ensuring maximum retention in minimum time."
          />
          <FeatureCard
            icon={<Trophy className="w-10 h-10 text-yellow-500" />}
            title="Gamified Progress"
            description="Earn XP, build daily streaks, and unlock mastery badges. Studying doesn't have to be boring."
          />
          <FeatureCard
            icon={<Target className="w-10 h-10 text-red-500" />}
            title="Laser-Focused Content"
            description="Curated decks specifically for PMP (Process, People) and PRINCE2 v7 (Principles, Themes)."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-none shadow-none bg-muted/30 hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
