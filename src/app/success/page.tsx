import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Ticket } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Paiement Réussi !
            </CardTitle>
            <CardDescription>
              Merci pour votre achat. Votre paiement a été traité avec succès.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="bg-green-50 p-4 rounded-lg w-full text-center border border-green-100">
              <div className="flex justify-center mb-2">
                <Ticket className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-green-800 font-medium">
                Vos billets ont été réservés
              </p>
            </div>

            <p className="text-center text-muted-foreground">
              Vous recevrez un email de confirmation avec les détails de votre
              réservation dans quelques instants.
            </p>

            <div className="flex gap-4 w-full">
              <Button asChild variant="outline" className="w-1/2">
                <Link href="/espace-membres">Mon Compte</Link>
              </Button>
              <Button asChild className="w-1/2">
                <Link href="/">Retour à l'Accueil</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
