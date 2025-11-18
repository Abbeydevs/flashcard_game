import { Zap } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="bg-primary text-primary-foreground p-1 rounded-md group-hover:bg-primary/90 transition-colors">
        <Zap size={20} />
      </div>
      <span className="font-bold text-xl tracking-tight">FlashCard</span>
    </Link>
  );
}
