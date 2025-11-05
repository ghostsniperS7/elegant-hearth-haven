import bedroomImage from "@/assets/bedroom-category.jpg";
import livingImage from "@/assets/living-category.jpg";

const Categories = () => {
  const categories = [
    {
      title: "Bedroom",
      description: "Create your perfect sanctuary",
      image: bedroomImage,
    },
    {
      title: "Living Room",
      description: "Where comfort meets style",
      image: livingImage,
    },
  ];

  return (
    <section id="categories" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collections for every room in your home
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-[400px]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="font-playfair text-3xl font-bold mb-2">
                  {category.title}
                </h3>
                <p className="text-white/90 mb-4">{category.description}</p>
                <span className="inline-flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                  Explore Collection →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
