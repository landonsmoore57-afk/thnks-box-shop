import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const TierExplainer = () => {
  const tiers = [
    {
      name: "Basic",
      tagline: "Essential Quality",
      description: "Thoughtfully selected items perfect for team appreciation and everyday recognition.",
      features: [
        "Core collection items",
        "Professional packaging",
        "2-3 business day processing",
        "Ideal for team gifting"
      ]
    },
    {
      name: "Standard",
      tagline: "Premium Selection",
      description: "Enhanced quality and presentation for clients and important business relationships.",
      features: [
        "Upgraded product selection",
        "Premium presentation",
        "Priority processing",
        "Perfect for client gifts"
      ],
      highlighted: true
    },
    {
      name: "Elite",
      tagline: "Luxury Experience",
      description: "The finest selections with white-glove service for your most valued relationships.",
      features: [
        "Top-tier luxury items",
        "Custom presentation options",
        "Dedicated service",
        "Executive-level gifting"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="font-display text-4xl font-semibold mb-4 text-brand-navy">
            Three Tiers of Excellence
          </h2>
          <p className="text-lg text-muted-foreground">
            Every collection is available in three carefully calibrated quality levels to suit your needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={`p-8 ${tier.highlighted ? 'border-brand-gold border-2 shadow-lg' : 'border'}`}
            >
              {tier.highlighted && (
                <div className="text-xs font-semibold text-brand-gold mb-4 uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-2xl font-semibold text-brand-navy mb-1">{tier.name}</h3>
                <p className="text-sm font-medium text-muted-foreground">{tier.tagline}</p>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                {tier.description}
              </p>

              <ul className="space-y-3">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-brand-navy flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
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
