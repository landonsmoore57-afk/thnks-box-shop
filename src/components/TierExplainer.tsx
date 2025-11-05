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
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-[hsl(var(--brand-gold)/0.05)] rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[hsl(var(--brand-gold)/0.03)] rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-4 animate-fade-in">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
            Three Tiers of Excellence
          </h2>
          <p className="text-xl text-muted-foreground">
            Every collection is available in three carefully calibrated quality levels to suit your needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={`p-8 group hover:scale-105 transition-all duration-300 animate-fade-in ${
                tier.highlighted 
                  ? 'border-2 border-[hsl(var(--brand-gold))] shadow-2xl shadow-[hsl(var(--brand-gold)/0.1)] bg-gradient-to-br from-background to-[hsl(var(--brand-gold)/0.05)]' 
                  : 'border-2 border-border/50 hover:border-[hsl(var(--brand-gold)/0.5)] hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tier.highlighted && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--brand-gold)/0.1)] border border-[hsl(var(--brand-gold)/0.3)] mb-6">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--brand-gold))] animate-pulse" />
                  <span className="text-xs font-bold text-[hsl(var(--brand-gold))] uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-3xl font-bold text-foreground mb-2 group-hover:text-[hsl(var(--brand-gold))] transition-colors">
                  {tier.name}
                </h3>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{tier.tagline}</p>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {tier.description}
              </p>

              <ul className="space-y-4">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 group/item">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--brand-gold)/0.15)] flex items-center justify-center mt-0.5 group-hover/item:bg-[hsl(var(--brand-gold)/0.3)] transition-colors">
                      <Check className="h-4 w-4 text-[hsl(var(--brand-gold))]" />
                    </div>
                    <span className="text-foreground leading-relaxed">{feature}</span>
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
