import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <ProductGrid />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
