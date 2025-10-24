import { Clock, Award, Truck, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const ValueProps = () => {
  const props = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Order in minutes. No complexity, just choose your tier and checkout.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Award,
      title: "Three Tiers",
      description: "Basic, Standard, Elite. Same themes, scaled to your budget.",
      gradient: "from-brand-teal to-brand-blue"
    },
    {
      icon: Truck,
      title: "Nationwide",
      description: "Fast, reliable delivery to all 50 states with full tracking.",
      gradient: "from-brand-purple to-brand-coral"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make corporate gifting simple, elegant, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {props.map((prop, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 group">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${prop.gradient} mb-6 group-hover:scale-110 transition-transform`}>
                <prop.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{prop.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
