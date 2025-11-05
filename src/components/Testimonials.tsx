import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "The quality of the furniture exceeded my expectations. Every piece is beautifully crafted and has transformed my living space completely.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Interior Designer",
      content:
        "I recommend Luxe Furniture to all my clients. Their attention to detail and commitment to quality is unmatched in the industry.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Happy Customer",
      content:
        "From browsing to delivery, the entire experience was seamless. The furniture is stunning and the customer service is exceptional.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of satisfied homeowners
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
