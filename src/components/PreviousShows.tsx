import Image from "next/image";

const previousShows = [
  {
    title: "Le songe d'une nuit d'été",
    date: "Avril 2024",
    image: "/images/Affiches/Songe2.png",
    youtubeUrl: "https://youtu.be/fh1phNN9u8s?si=ZwpxNSE2f2MnarA7",
    description: "Une adaptation onirique de l'œuvre de Shakespeare",
  },
  {
    title: "Les jumeaux vénitiens",
    date: "Décembre 2023",
    image: "/images/Affiches/Jumeaux.jpg",
    youtubeUrl: "https://youtu.be/4t701ayLoUU?si=ehL11ZzN8EQmRayw",
    description: "Une comédie italienne pleine de rebondissements",
  },
  {
    title: "Un fil à la patte",
    date: "Avril 2023",
    image: "/images/Affiches/fil.jpg",
    youtubeUrl: "https://youtu.be/6esbvoB5DTY?si=Y96LSJZW8Ld1cV-u",
    description: "Le chef-d'œuvre comique de Georges Feydeau",
  },
];

export default function PreviousShows() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Nos anciens spectacles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez nos précédentes productions à travers ces extraits vidéo
          </p>
          <div className="mt-6 w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {previousShows.map((show, index) => (
              <div key={index} className="flex justify-center">
                <a
                  href={show.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full max-w-xs transform transition-transform hover:scale-105"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-100">
                    <div className="relative w-full aspect-[2/3]">
                      <Image
                        src={show.image}
                        alt={show.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center transform hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-red-600 ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-red-600 font-medium mb-2">
                        {show.date}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                      <p className="text-gray-600">{show.description}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
