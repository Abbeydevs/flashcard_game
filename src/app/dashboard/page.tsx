import { validateRequest } from "@/lib/session";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/features/auth/logout-button";
import { getModulesWithDecks } from "@/db/queries";
import { DeckSelectionGrid } from "@/components/features/dashboard/deck-selection-grid";

export default async function DashboardPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  const modulesWithDecks = await getModulesWithDecks();

  return (
    <div className="container mx-auto py-12 space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome back, {user.email}!
        </h1>
        <LogoutButton />
      </div>

      <p className="text-lg text-muted-foreground">
        Select a certification module or jump back into a deck to continue your
        preparation.
      </p>

      <DeckSelectionGrid modules={modulesWithDecks} />
    </div>
  );
}
