import { Truck, Shield, Clock, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $500",
    },
    {
      icon: Shield,
      title: "Warranty",
      description: "5-year quality guarantee",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "2-5 business days",
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Handcrafted excellence",
    },
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-background transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
