import { ArrowUpRight, Calendar, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left side - Poster */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[2/3] shadow-2xl rounded-lg overflow-hidden bg-black flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/Affiches/visite.png"
                alt="La visite de la vieille dame"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right side - Text and CTA */}
          <div className="w-full md:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Troupe <span className="text-red-600">DOUBLE JEU</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Nous sommes la troupe de théâtre d'HEC Paris. Nous vous proposons
              deux spectacles originaux tous les ans.
            </p>

            <div className="space-y-6 py-4">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">
                    Dates des représentations
                  </h3>
                  <p className="text-gray-600">7 et 8 avril à HEC</p>
                  <p className="text-gray-600">12 avril au Palais des Glaces</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Lieux</h3>
                  <p className="text-gray-600">Campus HEC (7 et 8 avril)</p>
                  <p className="text-gray-600">
                    Palais des Glaces, Paris (12 avril)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Ticket className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Tarifs</h3>
                  <p className="text-gray-600">À HEC: 7-12€ selon catégorie</p>
                  <p className="text-gray-600">
                    Au Palais des Glaces: 12-20€ selon catégorie
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/tickets"
                className="inline-flex items-center px-8 py-4 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 text-lg font-medium shadow-lg"
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
