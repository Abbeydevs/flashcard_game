import { validateRequest } from "@/lib/session";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LogoutButton } from "@/components/features/auth/logout-button";

export default async function DashboardPage() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="container mx-auto py-12">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome to FlashCard, {user.email}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This is your protected dashboard. You can now start building the
            game features.
          </p>
          <p className="text-sm font-medium">
            **Next Step:** Build the Deck Selection UI here.
          </p>
          <LogoutButton />
        </CardContent>
      </Card>
    </div>
  );
}
