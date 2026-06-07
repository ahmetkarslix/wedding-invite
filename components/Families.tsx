import { Reveal } from "./Reveal";
import { ScrollCue } from "./ScrollCue";

// Aileler — davetiyedeki gibi iki isim, kalbin altında.
const FAMILIES = ["Esma & Mehmet Kılınçarslan", "Semra & Erhan Karslı"];

export function Families() {
  return (
    <section id="aileler" className="px-6 py-16 sm:py-20">
      <Reveal className="text-center">
        <p className="font-body text-xs font-light uppercase tracking-[0.35em] text-muted">
          Sizleri davet etmenin mutluluğuyla
        </p>
        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
          {FAMILIES.map((family, i) => (
            <div key={family} className="flex flex-col items-center gap-4">
              <p className="font-body text-lg font-light tracking-wide text-ink sm:text-xl">
                {family}
              </p>
              {i === 0 && (
                <span className="font-script text-3xl text-accent sm:hidden">&amp;</span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
      <ScrollCue href="#etkinlikler" />
    </section>
  );
}
