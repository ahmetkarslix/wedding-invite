import { EVENTS, FIRST_EVENT } from "@/lib/events";
import { MUSIC } from "@/lib/config";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Families } from "@/components/Families";
import { EventCard } from "@/components/EventCard";
import { RsvpForm } from "@/components/RsvpForm";
import { Reveal } from "@/components/Reveal";
import { SectionDivider } from "@/components/SectionDivider";
import { MusicToggle } from "@/components/MusicToggle";

const kicker = "font-body text-xs font-light uppercase tracking-[0.35em] text-muted";
const heading =
  "mt-3 font-body text-3xl font-light uppercase tracking-[0.22em] text-ink sm:text-4xl";

export default function Home() {
  return (
    <>
      {MUSIC.enabled && <MusicToggle src={MUSIC.src} />}

      <Hero />

      {/* Geri sayım */}
      <section id="geri-sayim" className="px-6 py-16 sm:py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className={kicker}>Büyük güne</p>
          <h2 className={heading}>Geri Sayım</h2>
          <p className="mt-4 font-body text-sm font-light text-ink-soft">
            {FIRST_EVENT.dateLabel} · {FIRST_EVENT.dayLabel} · {FIRST_EVENT.city}
          </p>
          <div className="mt-8">
            <Countdown targetIso={FIRST_EVENT.isoStart} />
          </div>
        </Reveal>
      </section>

      <SectionDivider className="py-2" />

      <Families />

      <SectionDivider className="py-2" />

      {/* Etkinlikler */}
      <section id="etkinlikler" className="px-6 py-16 sm:py-20">
        <Reveal className="mb-12 text-center">
          <p className={kicker}>Programımız</p>
          <h2 className={heading}>Kına &amp; Düğün</h2>
        </Reveal>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {EVENTS.map((event, i) => (
            <Reveal key={event.id} delay={i * 120}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider className="py-2" />

      {/* Katılım onayı */}
      <section id="katilim" className="px-6 py-16 sm:py-24">
        <Reveal className="mb-10 text-center">
          <p className={kicker}>Lütfen bize bildirin</p>
          <h2 className={heading}>Katılımını Onayla</h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm font-light leading-relaxed text-ink-soft">
            İki ayrı düğünümüz olduğu için her iki etkinlik için de ayrı ayrı yanıt
            verebilirsiniz. Katılamayacaksanız da belirtmeniz bizi mutlu eder.
          </p>
        </Reveal>
        <RsvpForm />
      </section>

      {/* Alt bilgi */}
      <footer className="border-t border-line px-6 py-12 text-center">
        <p className="font-script text-4xl text-ink">Seher &amp; Ahmet</p>
        <p className="mt-3 font-body text-xs uppercase tracking-[0.3em] text-muted">
          Eylül 2026 · Van &amp; Uşak
        </p>
      </footer>
    </>
  );
}
