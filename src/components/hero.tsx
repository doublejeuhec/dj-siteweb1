import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Ticket } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side - Poster */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[2/3] shadow-xl rounded-lg overflow-hidden">
              <Image
                src="/images/Affiches/visite.jpg"
                alt="Affiche du spectacle actuel"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <span className="text-white/80 text-sm font-medium">
                  PRÉSENTE
                </span>
                <h3 className="text-white text-3xl font-bold mt-1">
                  La visite de la vieille dame
                </h3>
                <p className="text-white/90 mt-2">
                  Une pièce de Friedrich Dürrenmatt
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Text and CTA */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Troupe de Théâtre <span className="text-red-600">DOUBLE JEU</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Depuis 1995, notre troupe enchante le public avec des
              interprétations vibrantes des plus grands classiques et des
              créations originales audacieuses.
            </p>

            <div className="space-y-4 py-2">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Dates des représentations</h3>
                  <p className="text-gray-600">7 et 8 avril à HEC</p>
                  <p className="text-gray-600">12 avril au Palais des Glaces</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Lieux</h3>
                  <p className="text-gray-600">Campus HEC (7 et 8 avril)</p>
                  <p className="text-gray-600">
                    Palais des Glaces, Paris (12 avril)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ticket className="w-5 h-5 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Tarifs</h3>
                  <p className="text-gray-600">À HEC: 7-12€ selon catégorie</p>
                  <p className="text-gray-600">
                    Au Palais des Glaces: 12-20€ selon catégorie
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/tickets"
                className="inline-flex items-center px-8 py-4 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 text-lg font-medium shadow-md"
              >
                Acheter des billets
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
