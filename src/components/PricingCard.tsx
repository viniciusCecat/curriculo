import Button from "./Button";
import Check from "../assets/check.svg";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  premium?: boolean;
  bonus?: string;
}

export default function PricingCard({
  title,
  description,
  price,
  period,
  features,
  premium,
  bonus,
}: PricingCardProps) {
  return (
    <article className={premium ? "pricing-card premium" : "pricing-card"}>
      {bonus && (
        <span className="bonus">
          <p>{bonus}</p>
        </span>
      )}

      <span className="plan">
        <h3>{title}</h3>
        <p>{description}</p>
      </span>

      <span className="price">
        <h2>{price}</h2>
        {period && <p>{period}</p>}
      </span>

      <Button text="Solicitar" href="#contact" secondary={!premium} />

      <span className="hr" />

      <ul className="features">
        {features.map((feature) => (
          <li key={feature}>
            <img src={Check} alt="" width={24} height={24} />
            <p>{feature}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
