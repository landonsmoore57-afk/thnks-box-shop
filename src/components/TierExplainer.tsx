import { Check } from "lucide-react";

const TierExplainer = () => {
  const tiers = [
    {
      name: "Basic",
      color: "tier-basic",
      description: "Essential quality for everyday appreciation",
      features: [
        "Core products from each collection",
        "Standard packaging",
        "Ships within 2-3 business days",
        "Perfect for team gifts"
      ]
    },
    {
      name: "Standard",
      color: "tier-standard",
      description: "Premium selections for special occasions",
      features: [
        "Enhanced product quality",
        "Premium packaging & presentation",
        "Priority processing",
        "Ideal for client gifts"
      ]
    },
    {
      name: "Elite",
      color: "tier-elite",
      description: "Luxury experiences for VIP recipients",
      features: [
        "Top-tier luxury products",
        "Custom gift wrap available",
        "White-glove fulfillment",
        "Executive-level impressions"
      ]
    }
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Three Tiers, One Simple Choice
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Every gift box is available in Basic, Standard, and Elite tiers. Same theme, scaled quality and pricing to match your budget and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={index}
              className="bg-card text-card-foreground rounded-lg p-8 border-2 border-transparent hover:border-accent transition-all"
            >
              <div className={`inline-block px-4 py-2 rounded-full bg-${tier.color}/10 text-${tier.color} font-bold mb-4`}>
                {tier.name}
              </div>
              <p className="text-muted-foreground mb-6 min-h-[3rem]">
                {tier.description}
              </p>
              <ul className="space-y-3">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TierExplainer;
