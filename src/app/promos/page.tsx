"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { promos, roleAbbreviations } from "@/data/promos";
import Image from "next/image";
import { useState } from "react";

export default function PromosPage() {
  const [selectedPromo, setSelectedPromo] = useState("2024");

  const filteredMembers = promos[selectedPromo];

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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMembers.map((member, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-56 w-full">
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
                                  {roleAbbreviations[abbr] || abbr}
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
