import "../styles/button.css";

interface ButtonProps {
  text: string;
  href?: string;
  type?: "button" | "submit";
  secondary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  text,
  href,
  type = "button",
  secondary,
  onClick,
  disabled,
}: ButtonProps) {
  const className = secondary ? "btn-secondary" : "btn-primary";

  if (href) {
    return (
      <a className={className} href={href}>
        {text}
      </a>
    );
  }

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
