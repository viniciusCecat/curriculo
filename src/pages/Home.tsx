import { FormEvent, useEffect, useState } from "react";
import Button from "../components/Button";
import JourneyCard from "../components/JourneyCard";
import PricingCard from "../components/PricingCard";
import SolutionCard from "../components/SolutionCard";
import Logo from "../assets/logo.svg";
import Menu from "../assets/menu.svg";
import Fechar from "../assets/fechar.svg";
import HeroCurriculo from "../assets/hero-curriculo.svg";
import Codigo from "../assets/codigo.svg";
import Site from "../assets/site.svg";
import Contato from "../assets/contato.svg";
import Linkedin from "../assets/linkedin.svg";
import Github from "../assets/github.svg";
import EmailIcon from "../assets/email.svg";
import "../styles/header.css";
import "../styles/hero.css";
import "../styles/solution.css";
import "../styles/testimonials.css";
import "../styles/pricing.css";
import "../styles/contact.css";
import "../styles/footer.css";

const links = [
  { href: "#hero", text: "Home" },
  { href: "#solution", text: "Solucoes" },
  { href: "#testimonials", text: "Trajetoria" },
  { href: "#pricing", text: "Precos" },
  { href: "#contact", text: "Contato" },
];

const journey = [
  {
    icon: Site,
    title: "Formacao",
    subtitle: "Engenharia de Software",
    text: "Cursando Engenharia de Software de 2024 a 2026 no Centro Universitario Fundacao Assis Gurgacz.",
  },
  {
    icon: Codigo,
    title: "Projetos",
    subtitle: "Graduacao",
    text: "Desenvolvimento de projetos academicos com foco em logica de programacao e organizacao de codigo.",
  },
  {
    icon: Contato,
    title: "Objetivo",
    subtitle: "Oportunidade na area",
    text: "Busca uma oportunidade para aplicar os conhecimentos da faculdade e evoluir na area de tecnologia.",
  },
];

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");

    if (html) {
      html.style.overflow = showMobileMenu ? "hidden" : "auto";
    }
  }, [showMobileMenu]);

  function closeMenu() {
    setShowMobileMenu(false);
  }

  async function sendContactEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setStatus("Enviando mensagem...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Erro ao enviar mensagem.");
      }

      setEmail("");
      setMessage("");
      setStatus("Mensagem enviada com sucesso.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Nao foi possivel enviar.";
      setStatus(errorMessage);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <nav className="container flex items-center justify-between py-sm">
          <a href="#hero" aria-label="Voltar ao inicio">
            <img
              className="brand-logo"
              src={Logo}
              alt="Logo Vinicius Cecatto"
              width={210}
              height={53}
            />
          </a>

          <div className="desktop-only">
            <ul className="flex gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="desktop-only">
            <div className="flex items-center gap-1">
              <a className="reverse-color" href="mailto:Vinicecat@gmail.com">
                E-mail
              </a>
              <Button text="Contato" href="#contact" />
            </div>
          </div>

          <div className="mobile-menu">
            {showMobileMenu ? (
              <div className="mobile-menu-content">
                <div className="container flex justify-between">
                  <ul>
                    {links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} onClick={closeMenu}>
                          {link.text}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a className="reverse-color" href="mailto:Vinicecat@gmail.com">
                        E-mail
                      </a>
                    </li>
                  </ul>
                  <button
                    className="icon-button"
                    type="button"
                    onClick={() => setShowMobileMenu(false)}
                    aria-label="Fechar menu"
                    title="Fechar menu"
                  >
                    <img src={Fechar} alt="" width={24} height={24} />
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="icon-button"
                type="button"
                onClick={() => setShowMobileMenu(true)}
                aria-label="Abrir menu"
                title="Abrir menu"
              >
                <img src={Menu} alt="" width={24} height={24} />
              </button>
            )}
          </div>
        </nav>
      </header>

      <main>
        <section id="hero">
          <img
            className="hero-art"
            src={HeroCurriculo}
            alt="Ilustracao de curriculo digital"
          />

          <div className="container hero-content">
            <span className="tag">Curriculo digital</span>
            <h1>Vinicius Cecatto</h1>
            <p>
              Estudante de Engenharia de Software em busca de uma oportunidade
              na area, com foco em logica de programacao, Git, GitHub e
              aprendizado pratico.
            </p>

            <div className="hero-actions">
              <Button text="Falar comigo" href="#contact" />
              <Button text="Ver habilidades" href="#solution" secondary />
            </div>

            <div className="hero-stats" aria-label="Resumo profissional">
              <span>
                <strong>2024-2026</strong>
                <p>FAG cursando</p>
              </span>
              <span>
                <strong>GitHub</strong>
                <p>Versionamento</p>
              </span>
              <span>
                <strong>Ingles</strong>
                <p>Intermediario</p>
              </span>
            </div>
          </div>
        </section>

        <section className="container" id="solution">
          <header>
            <span>
              <h2>Solucoes</h2>
              <span className="desktop-only">
                <h2>Sob medida para voce</h2>
              </span>
            </span>
            <p>
              Esta pagina transforma o curriculo em uma experiencia online, com
              <strong> objetivo profissional</strong>, formacao, projetos
              academicos, habilidades e contato facil.
            </p>
          </header>

          <section className="even-columns">
            <SolutionCard
              icon={Site}
              title="Formacao academica"
              text="Engenharia de Software, 2024 a 2026, cursando no Centro Universitario Fundacao Assis Gurgacz."
            />
            <SolutionCard
              icon={Codigo}
              title="Projetos academicos"
              text="Desenvolvimento de projetos durante a graduacao, com Git e GitHub para versionamento."
            />
            <SolutionCard
              icon={Contato}
              title="Habilidades"
              text="Logica de programacao, Git, GitHub e ingles intermediario cursando na Wise Up."
            />
          </section>
        </section>

        <section id="testimonials">
          <header>
            <span>
              <p className="desktop-only">Resumo do curriculo</p>
              <h2>Minha trajetoria</h2>
            </span>
            <p>
              Pontos principais da minha formacao, projetos academicos e objetivo
              profissional.
            </p>
          </header>

          <section className="carousel" aria-label="Trajetoria academica">
            <div className="carousel-content">
              {[...journey, ...journey].map((item, index) => (
                <JourneyCard key={`${item.title}-${index}`} {...item} />
              ))}
            </div>
          </section>
        </section>

        <section id="pricing" className="container">
          <header>
            <p className="desktop-only">Planos e precos</p>
            <h2>Nossos planos</h2>
          </header>

          <section className="even-columns gap-1-5">
            <PricingCard
              title="Curriculo digital"
              description="Pagina simples para apresentar perfil, formacao e contato."
              price="A combinar"
              features={[
                "Layout responsivo",
                "Secoes principais",
                "Publicacao no Netlify",
              ]}
            />
            <PricingCard
              title="Oportunidade"
              description="Disponibilidade para aprender, contribuir e evoluir com acompanhamento."
              price="Disponivel"
              premium
              bonus="AREA DE SOFTWARE"
              features={[
                "Engenharia de Software",
                "Aprendizado supervisionado",
                "Laranjeiras do Sul - PR",
              ]}
            />
            <PricingCard
              title="Projeto academico"
              description="Participacao em trabalhos com foco em logica e fundamentos de software."
              price="A combinar"
              features={[
                "Git e GitHub",
                "Logica de programacao",
                "Organizacao de codigo",
              ]}
            />
          </section>
        </section>

        <section id="contact" className="container">
          <header>
            <p>Envie sua duvida</p>
            <h2>Entre em contato</h2>
            <span>
              Entre em contato para falar sobre oportunidades, projetos
              academicos ou aprendizado. Laranjeiras do Sul - PR | (42)
              92001-4058.
            </span>
          </header>

          <form onSubmit={sendContactEmail}>
            <label htmlFor="email">Seu melhor e-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              placeholder="Ex: Gostei do seu curriculo, podemos conversar sobre um projeto?"
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
            />

            <Button
              text={isSending ? "Enviando..." : "Enviar"}
              type="submit"
              disabled={isSending}
            />
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
      </main>

      <footer>
        <section className="container footer-main">
          <div className="footer-brand">
            <img src={Logo} alt="Logo Vinicius Cecatto" width={210} height={58} />
            <div className="social">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <img src={Linkedin} alt="" width={24} height={24} />
              </a>
              <a
                href="https://github.com/viniciusCecat"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
              >
                <img src={Github} alt="" width={24} height={24} />
              </a>
              <a
                href="mailto:Vinicecat@gmail.com"
                aria-label="E-mail"
                title="E-mail"
              >
                <img src={EmailIcon} alt="" width={24} height={24} />
              </a>
            </div>
          </div>

          <div>
            <h3>Empresa</h3>
            <a href="#hero">Sobre mim</a>
            <a href="#solution">Habilidades</a>
            <a href="#testimonials">Trajetoria</a>
          </div>

          <div>
            <h3>Funcionalidades</h3>
            <a href="#solution">Formacao</a>
            <a href="#pricing">Planos</a>
            <a href="#contact">Formulario</a>
          </div>

          <div>
            <h3>Recursos</h3>
            <a href="https://github.com/viniciusCecat" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="mailto:Vinicecat@gmail.com">E-mail</a>
            <a href="tel:+5542920014058">Telefone</a>
            <a href="#contact">Contato</a>
          </div>
        </section>

        <section className="footer-bottom">
          <p>
            Feito com carinho na aula de Programacao Web (c) 2026 Vinicius Cecatto
            - Todos os direitos reservados.
          </p>
        </section>
      </footer>
    </>
  );
}
