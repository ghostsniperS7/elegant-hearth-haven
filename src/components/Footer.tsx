import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">
              Luxe Furniture
            </h3>
            <p className="text-background/80 mb-4">
              Premium furniture that transforms your living space into a work of art.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#home" className="hover:text-background transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-background transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-background transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-background transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-background/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>123 Furniture Street, Design District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@luxefurniture.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; 2024 Luxe Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
