import { checkUserSubscription } from "@/app/actions";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

interface SubscriptionCheckProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export async function SubscriptionCheck({
  children,
  redirectTo = "/espace-membres",
}: SubscriptionCheckProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const isSubscribed = await checkUserSubscription(user?.id!);

  if (!isSubscribed) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}
