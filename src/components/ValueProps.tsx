import { Clock, Award, Truck } from "lucide-react";

const ValueProps = () => {
  const props = [
    {
      icon: Clock,
      title: "Streamlined Process",
      description: "Select your tier, customize if needed, and checkout in minutes. No complexity, just efficiency."
    },
    {
      icon: Award,
      title: "Three Quality Tiers",
      description: "Basic, Standard, and Elite options ensure the perfect match for your budget and occasion."
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      description: "Reliable fulfillment across all 50 states with real-time tracking and white-glove service."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {props.map((prop, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-navy/5 mb-6 group-hover:bg-brand-gold/10 transition-colors">
                <prop.icon className="h-7 w-7 text-brand-navy" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-brand-navy">{prop.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
