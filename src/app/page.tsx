import AboutSection from "@/components/AboutSection";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreviousShows from "@/components/PreviousShows";
import { ArrowUpRight, Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section with Split Design */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left side - Poster */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-[2/3] shadow-2xl rounded-lg overflow-hidden bg-black flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-3xl font-bold mt-1">
                    La visite de la vieille dame
                  </h3>
                  <p className="text-white/90 mt-2 text-lg">
                    de Friedrich Dürrenmatt
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Text and CTA */}
            <div className="w-full md:w-1/2 space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Troupe <span className="text-red-600">DOUBLE JEU</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Nous sommes la troupe de théâtre d'HEC Paris. Nous vous
                proposons deux spectacles originaux tous les ans.
              </p>

              <div className="space-y-6 py-4">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      Dates des représentations
                    </h3>
                    <p className="text-gray-600">7 et 8 avril à HEC</p>
                    <p className="text-gray-600">
                      12 avril au Palais des Glaces
                    </p>
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
                    <p className="text-gray-600">
                      À HEC: 7-12€ selon catégorie
                    </p>
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

      {/* About Section - Now using the component */}
      <AboutSection />

      {/* Current Production Section */}
      <section id="spectacle" className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Notre Spectacle Actuel
            </h2>

            <div className="mt-6 w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-16 items-center max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                La visite de la vieille dame
              </h3>
              <div className="w-12 h-1 bg-red-600 rounded-full"></div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Dans cette pièce captivante de Friedrich Dürrenmatt, nous
                explorons les thèmes de la vengeance, de la justice et de la
                corruption morale. Claire Zahanassian, devenue immensément
                riche, revient dans sa ville natale pour se venger d'un ancien
                amant qui l'a abandonnée.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Notre mise en scène contemporaine met en lumière la critique
                sociale et les dilemmes moraux de cette œuvre majeure du théâtre
                germanophone, offrant une expérience théâtrale intense et
                mémorable.
              </p>
              <div className="pt-6">
                <Link
                  href="/tickets"
                  className="inline-flex items-center px-8 py-4 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all transform hover:scale-105 text-lg font-medium shadow-md"
                >
                  Réserver maintenant
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-video rounded-xl overflow-hidden shadow-xl bg-black flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <span className="text-white/80 text-2xl font-medium">
                  La visite de la vieille dame
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Shows Section - Now using the component */}
      <PreviousShows />

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Ce que dit notre public
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des spectateurs conquis par nos précédentes productions
            </p>
            <div className="mt-6 w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Sophie Martin",
                quote:
                  "Une mise en scène audacieuse et des comédiens talentueux. J'ai été transportée du début à la fin !",
              },
              {
                name: "Thomas Leroy",
                quote:
                  "DOUBLE JEU réussit toujours à me surprendre. Leur interprétation des classiques est à la fois respectueuse et innovante.",
              },
              {
                name: "Émilie Dubois",
                quote:
                  "Un moment magique en famille. Les enfants ont adoré et nous aussi ! Nous reviendrons sans hésiter.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-red-600 text-4xl mb-4">"</div>
                <p className="italic text-gray-600 mb-6 text-lg">
                  {testimonial.quote}
                </p>
                <p className="font-semibold text-gray-900">
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à vivre une expérience théâtrale inoubliable ?
          </h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto text-xl">
            Réservez vos places dès maintenant et rejoignez-nous pour une soirée
            magique.
          </p>
          <Link
            href="/tickets"
            className="inline-flex items-center px-10 py-5 text-red-600 bg-white rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-xl font-medium shadow-xl"
          >
            Acheter des billets
            <ArrowUpRight className="ml-2 w-6 h-6" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
