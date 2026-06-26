import Estrela from "../assets/estrela.svg";
import EstrelaVazia from "../assets/estrela-vazia.svg";

interface TestimonialCardProps {
  image: string;
  text: string;
  title: string;
  subtitle: string;
  stars: number;
}

export default function TestimonialCard({
  image,
  text,
  title,
  subtitle,
  stars,
}: TestimonialCardProps) {
  const rating = Math.min(Math.max(stars, 0), 5);

  return (
    <article className="carousel-card testimonial-card">
      <img className="testimonial-image" src={image} alt="" width={72} height={72} />
      <span className="testimony">
        <p>{text}</p>
      </span>
      <span className="rating" aria-label={`${rating} de 5 estrelas`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <img
            key={`${title}-${index}`}
            src={index < rating ? Estrela : EstrelaVazia}
            alt=""
            width={22}
            height={22}
          />
        ))}
      </span>
      <span className="names">
        <p>{title}</p>
        <p>{subtitle}</p>
      </span>
    </article>
  );
}
