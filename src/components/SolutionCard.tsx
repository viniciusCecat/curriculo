interface SolutionCardProps {
  icon: string;
  title: string;
  text: string;
}

export default function SolutionCard({ icon, title, text }: SolutionCardProps) {
  return (
    <article className="card">
      <span>
        <img src={icon} alt={`icone ${title}`} width={64} height={64} />
      </span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        <hr />
      </div>
    </article>
  );
}
