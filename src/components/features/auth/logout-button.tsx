"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/(auth)/actions";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await logout();
        });
      }}
    >
      <LogOut className="w-4 h-4 mr-2" />
      {isPending ? "Logging out..." : "Log Out"}
    </Button>
  );
}
