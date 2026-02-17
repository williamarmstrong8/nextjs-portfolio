type Props = {
  children?: React.ReactNode;
};

export default function BlogContainer({ children }: Props) {
  return <div className="w-full">{children}</div>;
}
