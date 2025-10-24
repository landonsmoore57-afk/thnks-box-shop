import { Check, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TierExplainer = () => {
  const tiers = [
    {
      name: "Basic",
      tagline: "Essential Quality",
      description: "Perfect for everyday appreciation and team gifting.",
      color: "tier-basic",
      gradient: "from-green-400 to-emerald-500",
      features: [
        "Core collection items",
        "Standard packaging",
        "2-3 day processing",
        "Ideal for teams"
      ]
    },
    {
      name: "Standard",
      tagline: "Premium Choice",
      description: "Elevated quality for clients and special occasions.",
      color: "tier-standard",
      gradient: "from-brand-blue to-brand-teal",
      isPopular: true,
      features: [
        "Enhanced products",
        "Premium packaging",
        "Priority processing",
        "Perfect for clients"
      ]
    },
    {
      name: "Elite",
      tagline: "Luxury Experience",
      description: "Top-tier excellence for VIP recipients.",
      color: "tier-elite",
      gradient: "from-brand-purple to-brand-coral",
      features: [
        "Luxury selections",
        "Custom gift wrap",
        "White-glove service",
        "Executive impressions"
      ]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="font-display text-5xl font-bold mb-6">
            Three Tiers, Perfectly Scaled
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every collection available in three quality levels. Choose the tier that matches your budget and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={`p-8 relative overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                tier.isPopular ? 'border-brand-blue' : 'border-border'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-0">
                  <Badge className={`bg-gradient-to-r ${tier.gradient} text-white border-0 rounded-bl-lg rounded-tr-xl px-4 py-1`}>
                    <Star className="h-3 w-3 mr-1 inline" />
                    Popular
                  </Badge>
                </div>
              )}

              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} mb-6`}>
                <span className="text-white font-bold text-xl">{tier.name[0]}</span>
              </div>

              <h3 className="font-display text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm font-medium text-muted-foreground mb-3">{tier.tagline}</p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {tier.description}
              </p>

              <ul className="space-y-3">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${tier.gradient} flex items-center justify-center mt-0.5`}>
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TierExplainer;
