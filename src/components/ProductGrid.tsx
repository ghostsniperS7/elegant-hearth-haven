import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import chairImage from "@/assets/chair-product.jpg";
import sofaImage from "@/assets/sofa-product.jpg";
import tableImage from "@/assets/table-product.jpg";

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: "Modern Oak Chair",
      price: "$299",
      image: chairImage,
      category: "Seating",
    },
    {
      id: 2,
      name: "Elegant Comfort Sofa",
      price: "$1,299",
      image: sofaImage,
      category: "Living Room",
    },
    {
      id: 3,
      name: "Minimalist Coffee Table",
      price: "$599",
      image: tableImage,
      category: "Tables",
    },
  ];

  return (
    <section id="shop" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked pieces that define modern elegance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-5 w-5 text-foreground" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">
                  {product.category}
                </p>
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
