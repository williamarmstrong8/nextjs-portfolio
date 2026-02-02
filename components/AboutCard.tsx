interface AboutCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const AboutCard = ({ title, description, icon }: AboutCardProps) => {
  return (
    <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="w-16 h-16 text-primary mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default AboutCard;
