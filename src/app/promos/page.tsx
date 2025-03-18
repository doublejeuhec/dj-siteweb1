"use client";

import Footer from "@/components/footer";
import MemberCard from "@/components/MemberCard";
import Navbar from "@/components/navbar";
import { promos } from "@/data/promos";
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
                  <MemberCard key={index} member={member} index={index} />
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
