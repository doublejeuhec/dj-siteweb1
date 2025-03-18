"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SmtpMessage } from "../smtp-message";

// Generate years for the dropdown (from 1980 to current year)
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = 1980; year <= currentYear; year++) {
    years.push(year);
  }
  return years;
};

export default function Signup(props: { searchParams: Promise<Message> }) {
  const [searchParams, setSearchParams] = useState<Message | null>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    secret_code: "",
    join_year: "",
    phone_number: "",
    profession: "",
  });

  useEffect(() => {
    const loadSearchParams = async () => {
      const params = await props.searchParams;
      setSearchParams(params);
    };

    loadSearchParams();

    // Load saved form data from localStorage
    const savedData = localStorage.getItem("signupFormData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Don't restore the password and secret code for security
        setFormData({
          ...parsedData,
          password: parsedData.password || "",
          secret_code: parsedData.secret_code || "",
        });
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, [props.searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      // Save to localStorage (including sensitive fields when user is filling the form)
      localStorage.setItem("signupFormData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleYearChange = (value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, join_year: value };
      localStorage.setItem("signupFormData", JSON.stringify(newData));
      return newData;
    });
  };

  // Custom form submission handler to preserve form data
  const handleSubmit = async (formData: FormData) => {
    try {
      await signUpAction(formData);
    } catch (error) {
      console.error("Signup error:", error);
    }
    // Don't clear the form data on submission - let the server response determine what happens next
  };

  if (searchParams && "message" in searchParams) {
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
          <form className="flex flex-col space-y-6" action={handleSubmit}>
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
                  value={formData.full_name}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
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
                  value={formData.secret_code}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="join_year" className="text-sm font-medium">
                  Année d'entrée dans la troupe
                </Label>
                <Select
                  value={formData.join_year}
                  onValueChange={handleYearChange}
                  name="join_year"
                >
                  <SelectTrigger id="join_year" className="w-full">
                    <SelectValue placeholder="Sélectionnez une année" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateYears().map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* Hidden input to ensure join_year is included in form submission */}
                <input
                  type="hidden"
                  name="join_year"
                  value={formData.join_year}
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
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession" className="text-sm font-medium">
                  Information sur ton métier : entreprise ; poste ; domaine
                </Label>
                <Input
                  id="profession"
                  name="profession"
                  type="text"
                  placeholder="Consultant, Ingénieur, Étudiant..."
                  required
                  className="w-full"
                  value={formData.profession}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <SubmitButton
              pendingText="Inscription en cours..."
              className="w-full"
            >
              S'inscrire
            </SubmitButton>

            {searchParams && <FormMessage message={searchParams} />}
          </form>
        </div>
        <SmtpMessage />
      </div>
    </>
  );
}
