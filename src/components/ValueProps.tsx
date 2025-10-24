import { Clock, Award, Truck } from "lucide-react";

const ValueProps = () => {
  const props = [
    {
      icon: Clock,
      title: "Order in Minutes",
      description: "No customization complexity. Choose your tier, add to cart, done."
    },
    {
      icon: Award,
      title: "Three Quality Tiers",
      description: "Basic, Standard, or Elite — same great themes, scaled to your budget."
    },
    {
      icon: Truck,
      title: "Ships Nationwide",
      description: "Fast, reliable delivery across all 50 states. Track every box."
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-4xl font-bold text-center mb-16">Why Choose Thnks & Co.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {props.map((prop, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                <prop.icon className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">{prop.title}</h3>
              <p className="text-muted-foreground">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
