import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-furniture.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Elegant modern furniture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Transform Your Space with
            <span className="text-primary block mt-2">Timeless Elegance</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover our curated collection of premium furniture designed to elevate
            your home. Each piece combines exceptional craftsmanship with modern aesthetics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
            >
              View Catalog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
