interface JourneyCardProps {
  icon: string;
  title: string;
  subtitle: string;
  text: string;
}

export default function JourneyCard({
  icon,
  title,
  subtitle,
  text,
}: JourneyCardProps) {
  return (
    <article className="carousel-card journey-card">
      <img src={icon} alt="" width={72} height={72} />
      <span className="testimony">
        <p>{text}</p>
      </span>
      <span className="names">
        <p>{title}</p>
        <p>{subtitle}</p>
      </span>
    </article>
  );
}
