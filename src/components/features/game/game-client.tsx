"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import Link from "next/link";

type CardType = {
  id: string;
  question: string;
  options: any;
  explanation: string | null;
  reference: string | null;
};

interface GameClientProps {
  deckName: string;
  cards: CardType[];
}

export function GameClient({ deckName, cards }: GameClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = (currentIndex / cards.length) * 100;

  const options = Array.isArray(currentCard?.options)
    ? (currentCard.options as { text: string; isCorrect: boolean }[])
    : [];

  const handleOptionClick = (index: number, isCorrect: boolean) => {
    if (isAnswered) return; // Prevent changing answer

    setSelectedOption(index);
    setIsAnswered(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <Card className="max-w-xl mx-auto text-center py-10">
        <CardHeader>
          <CardTitle className="text-3xl">Session Complete! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-6xl font-bold text-primary">
            {Math.round((score / cards.length) * 100)}%
          </div>
          <p className="text-muted-foreground">
            You got {score} out of {cards.length} correct.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button onClick={() => window.location.reload()}>
              <RotateCcw className="mr-2 w-4 h-4" /> Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentCard) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold">No cards in this deck yet!</h2>
        <Button asChild className="mt-4">
          <Link href="/dashboard">Go Back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>{deckName}</span>
        <span>
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>
      <Progress value={progress} className="h-2" />

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-xl leading-normal">
            {currentCard.question}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {options.map((option, index) => {
            let variant = "outline";
            let className = "justify-start text-left h-auto py-4 text-base";

            if (isAnswered) {
              if (option.isCorrect) {
                variant = "default";
                className +=
                  " bg-green-600 hover:bg-green-600 text-white border-green-600";
              } else if (selectedOption === index && !option.isCorrect) {
                variant = "destructive";
              } else {
                className += " opacity-50";
              }
            } else if (selectedOption === index) {
              variant = "secondary";
            }

            return (
              <Button
                key={index}
                // @ts-ignore
                variant={variant}
                className={`w-full ${className}`}
                onClick={() => handleOptionClick(index, option.isCorrect)}
                disabled={isAnswered}
              >
                <span className="mr-auto">{option.text}</span>
                {isAnswered && option.isCorrect && (
                  <CheckCircle className="ml-2 w-5 h-5" />
                )}
                {isAnswered &&
                  selectedOption === index &&
                  !option.isCorrect && <XCircle className="ml-2 w-5 h-5" />}
              </Button>
            );
          })}
        </CardContent>

        {isAnswered && (
          <CardFooter className="flex flex-col items-start bg-muted/30 pt-6 border-t">
            <div className="space-y-2 mb-4 w-full">
              <h4 className="font-semibold flex items-center gap-2">
                Explanation
                {currentCard.reference && (
                  <Badge variant="outline" className="text-xs font-normal">
                    {currentCard.reference}
                  </Badge>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentCard.explanation}
              </p>
            </div>
            <Button className="w-full" onClick={handleNext}>
              {currentIndex + 1 === cards.length
                ? "Finish Deck"
                : "Next Question"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
