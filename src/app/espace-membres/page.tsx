import Navbar from "@/components/navbar";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Camera,
  InfoIcon,
  MessageCircle,
  UserCircle,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function EspaceMembres() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <SubscriptionCheck>
      <Navbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Espace Membres</h1>
            <div className="bg-blue-50 text-sm p-4 px-5 rounded-lg text-blue-700 flex gap-3 items-start border border-blue-100">
              <InfoIcon
                size="18"
                className="text-blue-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="font-medium">
                  Bienvenue dans l'espace privé de la troupe DOUBLE JEU !
                </p>
                <p className="mt-1">
                  Cet espace est réservé aux membres de la troupe pour partager
                  des photos, discuter et organiser les répétitions.
                </p>
              </div>
            </div>
          </header>

          {/* User Profile Section */}
          <section className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <UserCircle size={48} className="text-primary" />
              <div>
                <h2 className="font-semibold text-xl">Profil Membre</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-blue-500" />
                  Galerie Photos
                </CardTitle>
                <CardDescription>
                  Partagez vos photos des répétitions et spectacles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fonctionnalité à venir prochainement...
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  Forum de Discussion
                </CardTitle>
                <CardDescription>
                  Échangez avec les autres membres de la troupe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fonctionnalité à venir prochainement...
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Annuaire des Membres
                </CardTitle>
                <CardDescription>
                  Retrouvez les coordonnées des membres
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Fonctionnalité à venir prochainement...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </SubscriptionCheck>
  );
}
