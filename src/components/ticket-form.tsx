"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../supabase/supabase";

interface TicketFormProps {
  userId?: string;
  userEmail?: string;
}

export default function TicketForm({ userId, userEmail }: TicketFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: userEmail || "",
    phone: "",
    date: "",
    // HEC tickets
    hec_student_tickets: "0",
    young_tickets: "0",
    hec_staff_tickets: "0",
    other_tickets: "0",
    // Palais des Glaces tickets
    palais_hec_student_tickets: "0",
    palais_young_tickets: "0",
    palais_other_tickets: "0",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotal = () => {
    if (!formData.date) return 0;

    if (formData.date.includes("hec")) {
      // HEC prices
      const hecStudentPrice = 7;
      const youngPrice = 9;
      const hecStaffPrice = 9;
      const otherPrice = 12;

      const hecStudentTotal =
        parseInt(formData.hec_student_tickets || "0") * hecStudentPrice;
      const youngTotal = parseInt(formData.young_tickets || "0") * youngPrice;
      const hecStaffTotal =
        parseInt(formData.hec_staff_tickets || "0") * hecStaffPrice;
      const otherTotal = parseInt(formData.other_tickets || "0") * otherPrice;

      return hecStudentTotal + youngTotal + hecStaffTotal + otherTotal;
    } else if (formData.date.includes("palais")) {
      // Palais des Glaces prices
      const palaisHecStudentPrice = 12;
      const palaisYoungPrice = 15;
      const palaisOtherPrice = 20;

      const palaisHecStudentTotal =
        parseInt(formData.palais_hec_student_tickets || "0") *
        palaisHecStudentPrice;
      const palaisYoungTotal =
        parseInt(formData.palais_young_tickets || "0") * palaisYoungPrice;
      const palaisOtherTotal =
        parseInt(formData.palais_other_tickets || "0") * palaisOtherPrice;

      return palaisHecStudentTotal + palaisYoungTotal + palaisOtherTotal;
    }

    return 0;
  };

  const totalAmount = calculateTotal();
  const hasTickets = totalAmount > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.date) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      if (!hasTickets) {
        throw new Error("Veuillez sélectionner au moins un billet");
      }

      // Validate that tickets match the selected venue
      if (
        formData.date.includes("hec") &&
        parseInt(formData.hec_student_tickets || "0") +
          parseInt(formData.young_tickets || "0") +
          parseInt(formData.hec_staff_tickets || "0") +
          parseInt(formData.other_tickets || "0") ===
          0
      ) {
        throw new Error(
          "Veuillez sélectionner au moins un billet pour la représentation à HEC"
        );
      }

      if (
        formData.date.includes("palais") &&
        parseInt(formData.palais_hec_student_tickets || "0") +
          parseInt(formData.palais_young_tickets || "0") +
          parseInt(formData.palais_other_tickets || "0") ===
          0
      ) {
        throw new Error(
          "Veuillez sélectionner au moins un billet pour la représentation au Palais des Glaces"
        );
      }

      // Create checkout session
      console.log("Sending request to edge function with data:", {
        ...formData,
        user_id: userId,
        return_url: window.location.origin,
      });

      let checkoutUrl;

      try {
        const { data, error } = await supabase.functions.invoke(
          "create-ticket-checkout",
          {
            body: {
              ...formData,
              user_id: userId,
              return_url: window.location.origin,
            },
          }
        );

        console.log("Edge function response:", { data, error });

        if (error) {
          console.error("Edge function error:", error);
          throw error;
        }

        // Store the URL from the response
        checkoutUrl = data?.url;

        if (!checkoutUrl) {
          throw new Error("Aucune URL de paiement retournée");
        }
      } catch (invokeError) {
        console.error("Failed to invoke edge function:", invokeError);
        throw new Error(
          `Failed to send request to edge function: ${invokeError instanceof Error ? invokeError.message : String(invokeError)}`
        );
      }

      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
    } catch (err: any) {
      setError(
        err.message ||
          "Une erreur s'est produite lors de la création du paiement"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Réservation</CardTitle>
        <CardDescription>
          Complétez le formulaire pour réserver vos places
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Votre nom"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date de la représentation *</Label>
              <Select
                name="date"
                value={formData.date}
                onValueChange={(value) => handleChange("date", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-04-07-hec">
                    7 avril 2024 - 20h00 (HEC)
                  </SelectItem>
                  <SelectItem value="2024-04-08-hec">
                    8 avril 2024 - 20h00 (HEC)
                  </SelectItem>
                  <SelectItem value="2024-04-12-palais">
                    12 avril 2024 - 17h00 (Palais des Glaces)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Votre numéro de téléphone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">
                Sélectionnez vos billets
              </h3>
              <p className="text-sm text-blue-700 mb-3">
                Les tarifs s'ajustent automatiquement selon la date choisie
              </p>

              {formData.date && formData.date.includes("hec") ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hec_student_tickets">
                      Étudiants HEC (7€)
                    </Label>
                    <Select
                      name="hec_student_tickets"
                      value={formData.hec_student_tickets || "0"}
                      onValueChange={(value) =>
                        handleChange("hec_student_tickets", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="young_tickets">
                      Personnes -26 ans (9€)
                    </Label>
                    <Select
                      name="young_tickets"
                      value={formData.young_tickets || "0"}
                      onValueChange={(value) =>
                        handleChange("young_tickets", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hec_staff_tickets">
                      Personnel HEC (9€)
                    </Label>
                    <Select
                      name="hec_staff_tickets"
                      value={formData.hec_staff_tickets || "0"}
                      onValueChange={(value) =>
                        handleChange("hec_staff_tickets", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="other_tickets">Autres (12€)</Label>
                    <Select
                      name="other_tickets"
                      value={formData.other_tickets || "0"}
                      onValueChange={(value) =>
                        handleChange("other_tickets", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : formData.date && formData.date.includes("palais") ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="palais_hec_student_tickets">
                      Étudiants HEC (12€)
                    </Label>
                    <Select
                      name="palais_hec_student_tickets"
                      value={formData.palais_hec_student_tickets || "0"}
                      onValueChange={(value) =>
                        handleChange("palais_hec_student_tickets", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="palais_young_tickets">
                      Personnes -26 ans (15€)
                    </Label>
                    <Select
                      name="palais_young_tickets"
                      value={formData.palais_young_tickets || "0"}
                      onValueChange={(value) =>
                        handleChange("palais_young_tickets", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="palais_other_tickets">Autres (20€)</Label>
                    <Select
                      name="palais_other_tickets"
                      value={formData.palais_other_tickets || "0"}
                      onValueChange={(value) =>
                        handleChange("palais_other_tickets", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="0" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <p className="text-amber-600 text-sm">
                  Veuillez d'abord sélectionner une date pour voir les tarifs
                  disponibles
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
              {error}
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center font-medium">
              <span>Total</span>
              <span>{totalAmount.toFixed(2)}€</span>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full flex items-center gap-2"
            size="lg"
            disabled={loading || !hasTickets}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Traitement en cours...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Procéder au paiement
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-xs text-gray-500 text-center">
          En cliquant sur "Procéder au paiement", vous serez redirigé vers notre
          système de paiement sécurisé.
        </p>
      </CardFooter>
    </Card>
  );
}
