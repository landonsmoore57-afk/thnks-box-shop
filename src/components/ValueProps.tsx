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
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[hsl(var(--brand-gold)/0.03)] rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {props.map((prop, index) => (
            <div 
              key={index} 
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(var(--brand-gold)/0.1)] to-[hsl(var(--brand-gold)/0.05)] mb-6 group-hover:from-[hsl(var(--brand-gold)/0.2)] group-hover:to-[hsl(var(--brand-gold)/0.1)] transition-all duration-300 group-hover:scale-110 border border-[hsl(var(--brand-gold)/0.2)]">
                <prop.icon className="h-9 w-9 text-[hsl(var(--brand-gold))]" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3 text-foreground group-hover:text-[hsl(var(--brand-gold))] transition-colors">
                {prop.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
