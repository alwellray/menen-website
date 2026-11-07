import { FlowButton } from "../components/ui/flow-button";
import { ThemeSwitcher } from "../components/ui/theme-switcher-1";
import About3 from "../components/ui/about-3";
import MissionVisionShowcase from "../components/ui/spatial-product-showcase";
import ServicesStack from "../components/ui/services-stack";
import BottomNavBar from "../components/ui/bottom-nav-bar";
import PortfolioGallery from "../components/ui/portfolio-gallery";
import InkOrbitHero from "../components/ui/ink-orbit-hero";
import Image from "next/image";
import { advantages, contact, projects, sectors } from "../content/company";
import Enquiry from "./enquiry";
import Motion from "./motion";

function Brand() {
  return <a className="brand" href="#top" aria-label="MANEN home">
    <Image src="/manen-logo.png" alt="MANEN Facility & Project Solutions" width={170} height={54} unoptimized />
  </a>;
}

export default function Home() {
  return (
    <main id="top" className="overflow-x-clip w-full max-w-full">
      <a className="skip" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="shell nav">
          <Brand />
          <BottomNavBar className="header-navigation" />
          <FlowButton className="nav-cta" href="#contact" text="Get in touch" />
        </div>
      </header>

      <InkOrbitHero />

      <section className="section shell" id="company">
        <div className="split-heading"><h2>Meet MANEN.</h2><p>We help organisations, developers, property owners and private clients deliver and maintain built assets with technical expertise, careful coordination and clear accountability.</p></div>
        <About3 />
        <MissionVisionShowcase />
        <p className="values">Integrity · Excellence · Innovation · Safety · Partnership</p>
        <div className="advantage-grid">{advantages.map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}</div>
      </section>


      <ServicesStack />

      <section className="section shell" id="sectors">
        <div className="split-heading"><h2>Built around your sector.</h2><p>From a private renovation to a complex operating facility, the scope starts with the way you use your property.</p></div>
        <div className="sector-list">{sectors.map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="section portfolio" id="portfolio"><div className="shell">
        <div className="split-heading"><h2>Project portfolio</h2><p>Explore MANEN’s approach to project delivery, facility operations and engineering work.</p></div>
        {projects.length ? <div className="project-grid">{projects.map((project) => <article key={project.title}>
          <div className="project-image"><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
          <p>{project.service}{project.location && ` · ${project.location}`}</p><h3>{project.title}</h3><p>{project.description}</p>
        </article>)}</div> : <PortfolioGallery />}
      </div></section>

      <section className="section contact" id="contact"><div className="shell contact-grid">
        <div><h2>Let’s discuss your project.</h2><p className="section-intro">Tell us what you’re planning, managing or improving. Share your location, scope and timing so we can discuss the right support.</p>
          <address>{contact.address}<a href={`tel:+${contact.internationalPhone}`}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a></address>
          <a className="text-link" href={`https://wa.me/${contact.internationalPhone}`}>Chat on WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
        <Enquiry />
      </div></section>
      <footer><div className="shell footer"><Brand /><p>MANEN Facility & Project Solutions Ltd · Lagos, Nigeria</p><a href="#top">Back to top ↑</a></div></footer>
      <ThemeSwitcher />
      <Motion />
    </main>
  );
}
