import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Footprints, Hand, Shirt, Ruler, Unplug, Timer, PawPrint, Check, X,
  Truck, Package, Home, RotateCcw, ShieldCheck, Gift, Heart, Users, ArrowDown,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { config } from "@/config";
import hero from "@/assets/hero.jpg";
import lifestyle from "@/assets/lifestyle.jpg";
import sowka from "@/assets/sowka.jpg";
import mis from "@/assets/mis.jpg";
import swinka from "@/assets/swinka.jpg";
import piesek from "@/assets/piesek.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "tuptusie – szelki do nauki chodzenia dla dzieci" },
      { name: "description", content: "Szelki do nauki chodzenia z długim uchwytem. Ty idziesz prosto, maluch stawia pierwsze kroki. 7–24 mies., do 15 kg, 4 wzory." },
      { property: "og:title", content: "tuptusie – Ile razy dziś się schyliłaś?" },
      { property: "og:description", content: "Szelki do nauki chodzenia z długim, miękkim uchwytem. Twoje plecy zasłużyły na przerwę." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const variants = [
  { id: "sowka", name: "Sówka", img: sowka },
  { id: "mis", name: "Miś", img: mis },
  { id: "swinka", name: "Świnka", img: swinka },
  { id: "piesek", name: "Piesek", img: piesek },
] as const;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xl font-bold tracking-tight ${light ? "text-navy-foreground" : "text-navy"}`}>
      <Footprints className="h-6 w-6 text-primary" /> tuptusie
    </span>
  );
}

function Section({ id, title, kicker, cream, children }: { id?: string; title?: ReactNode; kicker?: string; cream?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`px-5 py-16 sm:py-24 ${cream ? "bg-cream" : ""}`}>
      <div className="mx-auto max-w-5xl">
        {(title || kicker) && (
          <Reveal className="mb-10 text-center">
            {kicker && <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">{kicker}</p>}
            {title && <h2 className="text-2xl font-bold leading-tight text-navy sm:text-4xl">{title}</h2>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-card p-6 shadow-soft ${className}`}>{children}</div>;
}

const CTA = ({ label = "Wybieram swój wzór" }: { label?: string }) => (
  <a href="#kup" className="btn-cta">{label} <ArrowDown className="h-4 w-4" /></a>
);

function Index() {
  const [selected, setSelected] = useState<(typeof variants)[number]["id"]>("sowka");
  const current = variants.find((v) => v.id === selected)!;

  return (
    <div className="pb-24 md:pb-0">
      <div className="sticky top-0 z-40 bg-navy px-4 py-2 text-center text-xs font-medium text-navy-foreground sm:text-sm">
        🚚 Darmowa wysyłka od {config.freeShippingFrom} zł · ↩️ 14 dni na zwrot
      </div>

      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Logo />
        <a href="#kup" className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground md:inline-block">Kup teraz</a>
      </header>

      {/* 1 HERO */}
      <section className="px-5 pb-16 pt-4 sm:pt-10">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <Reveal>
            <h1 className="text-4xl font-extrabold leading-tight text-navy sm:text-5xl">Ile razy dziś się schyliłaś?</h1>
            <p className="mt-4 text-lg text-muted-foreground">Maluch uczy się chodzić, a ty chodzisz za nim zgięta wpół. Twoje plecy zasłużyły na przerwę.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["7–24 mies.", "do 15 kg", "regulowane", "4 wzory"].map((c) => (
                <span key={c} className="rounded-full bg-cream px-4 py-1.5 text-sm font-medium text-navy">{c}</span>
              ))}
            </div>
            <div className="mt-8"><CTA /></div>
          </Reveal>
          <Reveal>
            <img src={hero} alt="Przed: mama schylona nad maluchem. Po: mama idzie wyprostowana z szelkami tuptusie" width={1024} height={1024} className="w-full rounded-2xl shadow-soft" />
          </Reveal>
        </div>
      </section>

      {/* 2 BRZMI ZNAJOMO */}
      <Section cream kicker="Brzmi znajomo?" title="Każdy dzień wygląda tak samo">
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "Schylasz się kilkadziesiąt razy dziennie",
            "Wieczorem plecy bolą bardziej niż po siłowni",
            "On chce chodzić bez końca, a ty nie dajesz rady",
            "Każdy spacer kończy się noszeniem na rękach",
          ].map((t) => (
            <Reveal key={t}><Card className="flex items-center gap-4"><span className="text-2xl">😮‍💨</span><p className="font-medium text-navy">{t}</p></Card></Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center text-lg font-semibold text-navy">To nie ty jesteś słaba. Nikt nie jest stworzony do chodzenia w pół.</Reveal>
      </Section>

      {/* 3 ROZWIĄZANIE */}
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal><img src={lifestyle} alt="Mama idzie wyprostowana, maluch w szelkach tuptusie" loading="lazy" width={1024} height={1024} className="w-full rounded-2xl shadow-soft" /></Reveal>
          <Reveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Rozwiązanie</p>
            <h2 className="text-3xl font-bold leading-tight text-navy sm:text-4xl">Ty idziesz prosto. On stawia pierwsze kroki.</h2>
            <p className="mt-4 text-muted-foreground">Szelki tuptusie mają długi, miękki uchwyt. Trzymasz go na wysokości dłoni – i asekurujesz malucha bez schylania się. On ćwiczy kroki we własnym tempie, ty wreszcie prostujesz plecy.</p>
          </Reveal>
        </div>
      </Section>

      {/* 4 PRZED vs PO */}
      <Section cream title="Przed vs po">
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal><Card className="h-full">
            <h3 className="mb-4 text-lg font-bold text-muted-foreground">Bez szelek</h3>
            <ul className="space-y-3">{["Ciągłe schylanie", "Ból pleców", "Łapanie w ostatniej chwili", "Krótkie spacery"].map((t) => (
              <li key={t} className="flex gap-3 text-muted-foreground"><X className="h-5 w-5 shrink-0" />{t}</li>))}</ul>
          </Card></Reveal>
          <Reveal><Card className="h-full ring-2 ring-primary">
            <h3 className="mb-4 text-lg font-bold text-primary">Z szelkami tuptusie</h3>
            <ul className="space-y-3">{["Idziesz wyprostowana", "Asekurujesz bez wysiłku", "Maluch ćwiczy we własnym tempie", "Dłuższe spacery"].map((t) => (
              <li key={t} className="flex gap-3 font-medium text-navy"><Check className="h-5 w-5 shrink-0 text-primary" />{t}</li>))}</ul>
          </Card></Reveal>
        </div>
      </Section>

      {/* 5 DLACZEGO */}
      <Section kicker="Dlaczego tuptusie" title="Przemyślane w każdym detalu">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            [Hand, "Długi uchwyt", "Trzymasz go bez schylania"],
            [Shirt, "Miękka kamizelka", "Bawełna + oddychająca siateczka"],
            [Ruler, "Regulowane paski", "Ramiona 24–42 cm"],
            [Unplug, "Odpinany dół", "Dopasujesz do potrzeb"],
            [Timer, "Zapinanie w kilka sekund", "Proste plastikowe klamry"],
            [PawPrint, "4 wzory zwierzątek", "Sówka, Miś, Świnka, Piesek"],
          ].map(([Icon, t, d]) => {
            const I = Icon as typeof Hand;
            return (
              <Reveal key={t as string}><Card className="h-full p-5">
                <span className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-accent text-primary"><I className="h-5 w-5" /></span>
                <h3 className="font-semibold text-navy">{t as string}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
              </Card></Reveal>
            );
          })}
        </div>
      </Section>

      {/* 6 JAK TO DZIAŁA */}
      <Section cream title="Jak to działa?">
        <div className="grid gap-4 md:grid-cols-3">
          {[["Zakładasz", "Kamizelka zapina się w kilka sekund."], ["Chwytasz uchwyt", "Długi uchwyt – bez schylania."], ["Idziecie razem", "On stawia kroki, ty asekurujesz."]].map(([t, d], i) => (
            <Reveal key={t}><Card className="h-full text-center">
              <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground">{i + 1}</span>
              <h3 className="text-lg font-bold text-navy">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </Card></Reveal>
          ))}
        </div>
      </Section>

      {/* 7 ROSNĄ */}
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal><img src={sowka} alt="Regulowane szelki Sówka" loading="lazy" width={816} height={816} className="w-full rounded-2xl shadow-soft" /></Reveal>
          <Reveal>
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">Rosną z maluchem</h2>
            <ul className="mt-6 space-y-4">
              {[["Odpinany dół", "część w kroku 17–34 cm"], ["Regulowane ramiona", "24–42 cm"], ["Zapięcie w pasie", "obwód klatki 54–70 cm"]].map(([t, d]) => (
                <li key={t} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span><b className="text-navy">{t}</b> <span className="text-muted-foreground">– {d}</span></span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 8 DLA KOGO */}
      <Section cream title="Dla kogo?">
        <div className="grid gap-4 md:grid-cols-3">
          {[[Heart, "Mamy z bólem pleców", "Daj plecom odpocząć podczas nauki chodzenia."], [Ruler, "Rodzice wysokiego wzrostu", "Im wyżej, tym głębiej trzeba się schylać. Już nie."], [Users, "Babcie i dziadkowie", "Spacer z wnukiem bez nadwyrężania kręgosłupa."]].map(([Icon, t, d]) => {
            const I = Icon as typeof Heart;
            return <Reveal key={t as string}><Card className="h-full"><I className="mb-3 h-7 w-7 text-primary" /><h3 className="font-bold text-navy">{t as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></Card></Reveal>;
          })}
        </div>
      </Section>

      {/* 9 KUP */}
      <Section id="kup" kicker="Wybierz ulubieńca" title="Który wzór pokocha twój maluch?">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {variants.map((v) => {
            const active = v.id === selected;
            return (
              <button key={v.id} type="button" onClick={() => setSelected(v.id)} aria-pressed={active}
                className={`relative overflow-hidden rounded-2xl bg-card p-2 text-left shadow-soft transition ${active ? "ring-4 ring-primary" : "ring-1 ring-border"}`}>
                <img src={v.img} alt={`Szelki ${v.name}`} loading="lazy" width={816} height={816} className="aspect-square w-full rounded-xl object-cover" />
                <span className="block px-2 py-2 font-semibold text-navy">{v.name}{v.id === "sowka" && <span className="ml-1 text-xs font-medium text-primary">· ulubiony</span>}</span>
                {active && <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" /></span>}
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground">Wybrany wzór: <b className="text-navy">{current.name}</b></p>
          <p className="text-4xl font-extrabold text-navy">{config.price} zł</p>
          <a href={config.shopifyLinks[selected]} className="btn-cta w-full max-w-sm text-lg">Kup teraz</a>
          <p className="text-xs text-muted-foreground">🚚 Darmowa wysyłka od {config.freeShippingFrom} zł · ↩️ 14 dni na zwrot</p>
        </div>
      </Section>

      {/* 10 WYMIARY */}
      <Section cream title="Wymiary">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Reveal><img src={sowka} alt="Wymiary szelek" loading="lazy" width={816} height={816} className="w-full rounded-2xl shadow-soft" /></Reveal>
          <Reveal><Card className="p-0">
            <table className="w-full text-sm">
              <tbody>
                {[["Wysokość", "57–82 cm"], ["Paski na ramiona", "24–42 cm"], ["Przód", "14 cm"], ["Część w kroku", "17–34 cm"], ["Obwód klatki", "54–70 cm"], ["Wiek", "7–24 mies."], ["Maks. waga", "15 kg"], ["Materiał", "bawełna + siateczka"]].map(([a, b]) => (
                  <tr key={a} className="border-b last:border-0"><td className="px-5 py-3 text-muted-foreground">{a}</td><td className="px-5 py-3 text-right font-semibold text-navy">{b}</td></tr>
                ))}
              </tbody>
            </table>
          </Card>
          <p className="mt-3 text-center text-xs text-muted-foreground">Wymiary mierzone ręcznie, możliwa różnica 2–3 cm</p></Reveal>
        </div>
      </Section>

      {/* 11 PREZENT */}
      <Section title="Idealny prezent">
        <div className="grid gap-4 md:grid-cols-3">
          {["Na baby shower", "Na roczek", "Dla świeżo upieczonej mamy"].map((t) => (
            <Reveal key={t}><Card className="flex items-center gap-4"><Gift className="h-7 w-7 shrink-0 text-primary" /><p className="font-semibold text-navy">{t}</p></Card></Reveal>
          ))}
        </div>
      </Section>

      {/* 12 WYSYŁKA */}
      <Section cream title="Wysyłka i zwroty">
        <div className="grid gap-4 md:grid-cols-3">
          {[[Package, "Zamówienie", "Potwierdzenie przychodzi mailem."], [Truck, "Wysyłka", "Numer do śledzenia otrzymasz mailem."], [Home, "Dostawa", "14–30 dni roboczych."]].map(([Icon, t, d], i) => {
            const I = Icon as typeof Truck;
            return <Reveal key={t as string}><Card className="h-full text-center"><I className="mx-auto mb-3 h-8 w-8 text-primary" /><p className="text-xs font-semibold text-muted-foreground">Krok {i + 1}</p><h3 className="font-bold text-navy">{t as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></Card></Reveal>;
          })}
        </div>
        <Reveal className="mt-8 space-y-3 text-center">
          <p className="font-semibold text-navy">Czas dostawy: 14–30 dni roboczych. Numer do śledzenia przesyłki otrzymasz mailem.</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <span className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-navy shadow-soft"><RotateCcw className="h-4 w-4 text-primary" />14 dni na zwrot bez podania przyczyny</span>
            <span className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-navy shadow-soft"><ShieldCheck className="h-4 w-4 text-primary" />Bezpieczne płatności</span>
          </div>
        </Reveal>
      </Section>

      {/* 13 FAQ */}
      <Section title="Częste pytania">
        <Accordion type="single" collapsible className="mx-auto max-w-2xl space-y-3">
          {[
            ["Od jakiego wieku można używać?", "Od 7 do 24 miesięcy – od pierwszych kroków z pomocą. Maksymalna waga dziecka to 15 kg."],
            ["Czy będą pasować na moje dziecko?", "Szelki mają regulowane paski na ramiona (24–42 cm), regulowaną część w kroku (17–34 cm) i obwód klatki 54–70 cm."],
            ["Ile trwa dostawa?", "14–30 dni roboczych. Numer do śledzenia przesyłki otrzymasz mailem."],
            ["Dlaczego dostawa trwa tak długo?", "Produkt wysyłany jest z magazynu zagranicznego – dzięki temu możemy zaoferować niższą cenę."],
            ["Jak śledzić paczkę?", "Po wysyłce otrzymasz maila z numerem przesyłki i linkiem do śledzenia."],
            ["Czy mogę zwrócić produkt?", "Tak – masz 14 dni na zwrot bez podania przyczyny."],
            ["Czy mogę podnosić dziecko za uchwyt?", "Nie. Uchwyt służy wyłącznie do asekuracji przy chodzeniu – nigdy nie podnoś za niego dziecka."],
            ["Czy szelki zastępują opiekę?", "Nie. Dziecko zawsze musi być pod nadzorem dorosłego."],
            ["Jak dbać o szelki?", "Pierz ręcznie w letniej wodzie i susz na płasko."],
            ["Jakie formy płatności?", config.paymentMethods],
          ].map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="rounded-2xl border-0 bg-cream px-5">
              <AccordionTrigger className="text-left font-semibold text-navy hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* 14 FINAŁ */}
      <section className="bg-navy px-5 py-20 text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-navy-foreground sm:text-5xl">Wyprostuj się, mamo 🦉</h2>
          <p className="mt-4 text-lg text-navy-foreground/80">Twój maluch stawia pierwsze kroki. Ty możesz iść obok – prosto i bez bólu.</p>
          <div className="mt-8"><CTA /></div>
        </Reveal>
      </section>

      {/* 15 STOPKA */}
      <footer className="bg-cream px-5 py-12 text-sm">
        <div className="mx-auto max-w-5xl space-y-6">
          <Logo />
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-navy">
            <a href={config.links.regulamin}>Regulamin</a>
            <a href={config.links.prywatnosc}>Polityka prywatności</a>
            <a href={config.links.zwroty}>Zwroty i reklamacje</a>
            <a href={`mailto:${config.email}`}>Kontakt ({config.email})</a>
          </nav>
          <p className="text-muted-foreground">{config.companyData}</p>
          <p className="text-xs text-muted-foreground">Produkt pomaga w asekuracji i nie zastępuje stałego nadzoru osoby dorosłej. Przed każdym użyciem sprawdź klamry i szwy. Nie używaj w pobliżu schodów, wody i jezdni.</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 bg-background/90 p-3 backdrop-blur md:hidden">
        <a href="#kup" className="btn-cta w-full">Wybieram swój wzór</a>
      </div>
    </div>
  );
}
