interface PhotoGridCardProps {
  className?: string;
  size?: string;
}

const PhotoGridCard = ({ className, size }: PhotoGridCardProps) => {
  return (
    <div className={`bg-card border border-border rounded-xl p-4 ${className}`}>
      <div className="grid grid-cols-2 gap-2 h-full">
        <div className="bg-muted rounded aspect-square"></div>
        <div className="bg-muted rounded aspect-square"></div>
        <div className="bg-muted rounded aspect-square"></div>
        <div className="bg-muted rounded aspect-square"></div>
      </div>
    </div>
  );
};

export default PhotoGridCard;