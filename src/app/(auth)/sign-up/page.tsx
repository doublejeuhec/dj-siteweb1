import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { signUpAction } from "@/app/actions";
import Navbar from "@/components/navbar";
import { InfoIcon } from "lucide-react";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm">
          <form className="flex flex-col space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  className="text-primary font-medium hover:underline transition-all"
                  href="/sign-in"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-md flex gap-3 text-sm text-blue-700">
              <InfoIcon className="h-5 w-5 flex-shrink-0 text-blue-500" />
              <div>
                <p className="font-medium">Réservé aux membres de la troupe</p>
                <p>
                  Vous devez connaître le mot de passe secret de la troupe pour
                  créer un compte.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-sm font-medium">
                  Nom complet
                </Label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Jean Dupont"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Votre mot de passe"
                  minLength={6}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secret_code" className="text-sm font-medium">
                  Mot de passe secret de la troupe
                </Label>
                <Input
                  id="secret_code"
                  name="secret_code"
                  type="password"
                  placeholder="Mot de passe secret"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="join_year" className="text-sm font-medium">
                  Année d'entrée dans la troupe
                </Label>
                <Input
                  id="join_year"
                  name="join_year"
                  type="number"
                  placeholder="2015"
                  min="1980"
                  max="2023"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-sm font-medium">
                  Numéro de téléphone
                </Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession" className="text-sm font-medium">
                  Activité professionnelle actuelle
                </Label>
                <Input
                  id="profession"
                  name="profession"
                  type="text"
                  placeholder="Consultant, Ingénieur, Étudiant..."
                  required
                  className="w-full"
                />
              </div>
            </div>

            <SubmitButton
              formAction={signUpAction}
              pendingText="Inscription en cours..."
              className="w-full"
            >
              S'inscrire
            </SubmitButton>

            <FormMessage message={searchParams} />
          </form>
        </div>
        <SmtpMessage />
      </div>
    </>
  );
}
