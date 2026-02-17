import Image from "next/image";

type Props = {
  name: string;
  picture: string;
};

export default function Avatar({ name, picture }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-border">
        <Image
          src={picture}
          alt={name}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <span className="font-semibold text-foreground">{name}</span>
    </div>
  );
}
