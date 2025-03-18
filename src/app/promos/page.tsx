"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface Member {
  title: string;
  src: string;
  poste: string;
  roles: Record<string, string>;
  commentaireOR: string;
}

const promo2024 = [
  {
    title: "Adèle Quesnoit",
    src: "/images/CF/Promo2024/optimized/Adèle.jpg",
    poste: "Membre éminente",
    roles: {
      JV: "Arlequin",
    },
    commentaireOR: "",
  },
  {
    title: "Ambre Caillaux",
    src: "/images/CF/Promo2024/optimized/Ambre.jpg",
    poste: "Trésorière",
    roles: {
      JV: "Brighella",
    },
    commentaireOR: "",
  },
  {
    title: "Arthur Milgrom",
    src: "/images/CF/Promo2024/optimized/Arthur.jpg",
    poste: "Responsable représentation",
    roles: {
      JV: "Tonino",
    },
    commentaireOR: "",
  },
  {
    title: "Gabriel Fauchon",
    src: "/images/CF/Promo2024/optimized/Gabriel.jpg",
    poste: "Vice-président",
    roles: {
      JV: "Pancrace",
    },
    commentaireOR: "qu'il faut faire attention aux feeeeeeeemmes",
  },
  {
    title: "Garance Pauwels",
    src: "/images/CF/Promo2024/optimized/Garance.jpg",
    poste: "Secrétaire générale",
    roles: {
      JV: "Colombine",
    },
    commentaireOR: "",
  },
  {
    title: "Matthis Cadeau",
    src: "/images/CF/Promo2024/optimized/Matthis.jpg",
    poste: "Membre éminent parti trop vite",
    roles: {
      JV: "Le marquis Lelio",
      SNE: "Thésée et Mort-de-faim (qui joue lui même la Lune)",
    },
    commentaireOR: "qu'il fait très bien la lune qui dit ah bah d'accord",
  },
  {
    title: "Mia Berthier",
    src: "/images/CF/Promo2024/optimized/Mia.jpg",
    poste: "Membre Membre éminente partie trop vite",
    roles: {
      JV: "Pantalone",
      SNE: "Titania",
    },
    commentaireOR:
      "que son dos va bien malgré des heures passées à dormir sur un escalier",
  },
  {
    title: "Nell Sibue",
    src: "/images/CF/Promo2024/optimized/Nell.jpg",
    poste: "Responsable cohésion",
    roles: {
      JV: "Beatrice",
    },
    commentaireOR: "",
  },
  {
    title: "Raphaël Géron",
    src: "/images/CF/Promo2024/optimized/Raphaël.jpg",
    poste: "Vice-président",
    roles: {
      JV: "Florindo",
      SNE: "Lysandre",
    },
    commentaireOR: "",
  },
  {
    title: "Sacha Malochet",
    src: "/images/CF/Promo2024/optimized/Sacha.jpg",
    poste: "Président",
    roles: {
      JV: "Zanetto",
    },
    commentaireOR: "",
  },
  {
    title: "Selene Brunel",
    src: "/images/CF/Promo2024/optimized/Selene.jpg",
    poste: "Membre éminente partie trop vite",
    roles: {
      JV: "Le Prévôt",
      SNE: "Hermia",
    },
    commentaireOR: "",
  },
  {
    title: "Zineb Senhaji",
    src: "/images/CF/Promo2024/optimized/Zineb.jpg",
    poste: "Membre éminente partie trop vite",
    roles: {
      JV: "Tiburce",
      SNE: "Hippolyte, La fée, Fleur des Pois, Etriqué (qui joue elle-même le Lion)",
    },
    commentaireOR: "",
  },
];

const promo2025 = [
  {
    title: "Alexandre",
    src: "/images/CF/Promo2025/optimized/Alexandre.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Alexis",
    src: "/images/CF/Promo2025/optimized/Alexis.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Camille",
    src: "/images/CF/Promo2025/optimized/Camille.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Florence",
    src: "/images/CF/Promo2025/optimized/Florence.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Gabriel B",
    src: "/images/CF/Promo2025/optimized/GabrielB.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Jade",
    src: "/images/CF/Promo2025/optimized/Jade.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Jules",
    src: "/images/CF/Promo2025/optimized/Jules.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Lothaire",
    src: "/images/CF/Promo2025/optimized/Lothaire.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Madeleine",
    src: "/images/CF/Promo2025/optimized/Madeleine.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Nicolas",
    src: "/images/CF/Promo2025/optimized/Nicolas.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
  {
    title: "Louise Rivier",
    src: "/images/CF/Promo2025/optimized/Louise.jpg",
    poste: "Membre",
    roles: {
      VVD: "À compléter",
    },
    commentaireOR: "",
  },
];

const promos = {
  "2024": promo2024,
  "2025": promo2025,
};

export default function PromosPage() {
  const [selectedPromo, setSelectedPromo] = useState("2024");

  const filteredMembers = promos[selectedPromo as keyof typeof promos];

  const roleAbbreviations = {
    JV: "Les Jumeaux Vénitiens",
    SNE: "Le Songe d'une Nuit d'Été",
    VVD: "À venir",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold">
              Les Promotions de DOUBLE JEU
            </h1>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="bg-white p-4 rounded-xl inline-flex">
              <select
                className="px-4 py-2 border rounded-md text-lg font-medium"
                value={selectedPromo}
                onChange={(e) => setSelectedPromo(e.target.value)}
              >
                {Object.keys(promos).map((year) => (
                  <option key={year} value={year}>
                    Promotion {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            {filteredMembers.length === 0 ? (
              <p className="text-center py-8 text-gray-500">
                Aucun membre trouvé pour cette promotion
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMembers.map((member, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={member.src}
                        alt={member.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        quality={80}
                        loading={index < 4 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                      />
                    </div>
                    <CardHeader className="pb-1 pt-3">
                      <CardTitle className="text-base">
                        {member.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="font-medium text-blue-600 text-sm mb-1">
                        {member.poste}
                      </p>

                      <div className="space-y-1 mb-2">
                        <p className="text-xs font-semibold">Rôles :</p>
                        <ul className="text-xs text-gray-600">
                          {Object.entries(member.roles).map(
                            ([abbr, role], idx) => (
                              <li key={idx}>
                                <span className="font-medium">
                                  {roleAbbreviations[
                                    abbr as keyof typeof roleAbbreviations
                                  ] || abbr}
                                </span>{" "}
                                : {role}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {member.commentaireOR && (
                        <div className="text-xs italic text-gray-500 mt-1">
                          <span className="font-medium">On raconte </span>
                          {member.commentaireOR}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
