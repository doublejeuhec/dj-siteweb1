const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-8 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center"></div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Notre Histoire
            </h3>
            <div className="w-12 h-1 bg-red-600 mb-6 rounded-full"></div>
            <p className="text-gray-600 flex-grow">
              Depuis 25 ans, Double Jeu fait vibrer la scène d'HEC Paris en
              réunissant des passionnés de théâtre autour de spectacles toujours
              plus ambitieux. Ce qui n'était au départ qu'une troupe étudiante
              s'est transformé en un véritable collectif artistique, attirant
              chaque année des talents désireux de faire vivre des pièces de
              qualité. Aujourd'hui, nous avons la fierté de proposer deux
              spectacles par an, dont l'un dans un théâtre parisien prestigieux,
              le Palais des Glaces.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Notre Vision
            </h3>
            <div className="w-12 h-1 bg-red-600 mb-6 rounded-full"></div>
            <p className="text-gray-600 flex-grow">
              Nous croyons que le théâtre est une aventure collective où se
              mêlent rigueur, créativité et audace. Notre ambition ? Offrir aux
              étudiants et au public des pièces captivantes, mises en scène par
              un professionnel reconnu, dans des conditions
              quasi-professionnelles. Chaque production est l'occasion de
              repousser nos limites et d'explorer de nouvelles formes
              d'expression artistique, tout en préservant l'esprit d'équipe et
              de transmission qui fait la force de notre troupe.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Notre Équipe
            </h3>
            <div className="w-12 h-1 bg-red-600 mb-6 rounded-full"></div>
            <p className="text-gray-600 flex-grow">
              Double Jeu, c'est une vingtaine d'étudiants réunis par une passion
              commune et répartis sur deux promotions. Chaque année, huit
              nouveaux comédiens rejoignent la troupe après des auditions
              exigeantes, intégrant un groupe soudé où l'expérience des anciens
              se transmet aux nouveaux. Mais notre équipe ne se limite pas à la
              scène : décorateurs, costumiers, responsables de la communication…
              Chacun a un rôle clé à jouer pour donner vie aux spectacles qui
              marquent la vie du campus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
