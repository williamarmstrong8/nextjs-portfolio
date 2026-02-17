import Avatar from "./Avatar";
import CoverImage from "./CoverImage";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./DateFormatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section className="mb-16 md:mb-24">
      <div className="mb-8 md:mb-12">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            <Link
              href={`/blog/${slug}`}
              className="text-foreground hover:text-nav-active transition-colors"
            >
              {title}
            </Link>
          </h2>
          <div className="text-muted-foreground mb-4">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {excerpt}
          </p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
}
