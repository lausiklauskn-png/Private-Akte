import { ArrowDown, ArrowLeft, ArrowUp, X } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";

/**
 * Seitenleiste in der schmalen Ansicht (Klaus 18.11.2026; Vorbild: Seitenleiste der Familienakte, Maße von dort):
 * ein schmaler Griff am rechten Rand, mittig, fest. Ein Tipp öffnet Knöpfe mit Symbol und Wort – nach oben, nach unten, zurück
 * und die Seiten der App. Nach jedem Tipp klappt sie zu; Tipp daneben oder Esc schließt. Am breiten Monitor nicht zu sehen (CSS).
 */
export function Seitenleiste<S extends string>({ seite, seiten, gehe, zurueck, fassung }: {
  seite: string; seiten: Array<{ id: S; name: string; symbol: ComponentType<{ size?: number }> }>; gehe: (s: S) => void; zurueck?: () => void; fassung: string;
}) {
  const [offen, setOffen] = useState(false);
  const ort = useRef<HTMLElement>(null);
  useEffect(() => { setOffen(false); }, [seite]);
  useEffect(() => {
    if (!offen) return;
    const weg = (e: Event) => { if (!ort.current?.contains(e.target as Node)) setOffen(false); };
    const taste = (e: KeyboardEvent) => { if (e.key === "Escape") setOffen(false); };
    document.addEventListener("pointerdown", weg); document.addEventListener("keydown", taste);
    return () => { document.removeEventListener("pointerdown", weg); document.removeEventListener("keydown", taste); };
  }, [offen]);
  const tun = (f: () => void) => () => { setOffen(false); f(); };
  return <aside ref={ort} className={`seitenleiste${offen ? " offen" : ""}`} aria-label="Seitenleiste" data-seitenleiste={offen ? "offen" : "zu"}>
    {offen
      ? <div className="seitenleiste-knoepfe" role="menu">
          <button type="button" className="seitenleiste-zu" onClick={() => setOffen(false)} aria-label="Seitenleiste schließen"><X size={18}/></button>
          <button type="button" role="menuitem" data-leiste="oben" onClick={tun(() => window.scrollTo({ top: 0, behavior: "smooth" }))}><ArrowUp size={20}/><span>Nach oben</span></button>
          <button type="button" role="menuitem" data-leiste="unten" onClick={tun(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" }))}><ArrowDown size={20}/><span>Nach unten</span></button>
          {zurueck && <button type="button" role="menuitem" data-leiste="zurueck" onClick={tun(zurueck)}><ArrowLeft size={20}/><span>Zurück</span></button>}
          <hr/>
          {seiten.map((s) => <button key={s.id} type="button" role="menuitem" data-leiste={s.id} aria-current={seite === s.id ? "page" : undefined} onClick={tun(() => gehe(s.id))}><s.symbol size={20}/><span>{s.name}</span></button>)}
          <span className="seitenleiste-fassung" data-leiste-fassung>V {fassung}</span>
        </div>
      : <button type="button" className="seitenleiste-griff" onClick={() => setOffen(true)} aria-label="Seitenleiste öffnen: nach oben, nach unten, zurück, Seiten" title="Seitenleiste" data-leiste-griff><span aria-hidden="true"/></button>}
  </aside>;
}
