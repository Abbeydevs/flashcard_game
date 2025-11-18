import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo />
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Master your PMP & PRINCE2 exams with adaptive learning.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CertifySprint. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
