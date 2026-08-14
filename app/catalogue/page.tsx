import type { Metadata } from "next";
import Link from "next/link";
import { CatalogueArchive } from "@/components/catalogue-archive";
import { EditorialShell } from "@/components/editorial-shell";

export const metadata: Metadata = {
  title: "The Index | Beat Ballot",
  description: "A sourced index of records in Beat Ballot's Olamide and Davido cultural-game conversation.",
  alternates: { canonical: "/catalogue" },
};

export default function CataloguePage() {
  return (
    <EditorialShell>
      <section className="editorial-hero">
        <p className="section-label">BB / INDEX / 40 RECORDS</p>
        <h1>THE<br /><em>INDEX.</em></h1>
        <p>Every record carries its year, credited role, concise cultural context, evidence level and an external source. It is research, not a ranking.</p>
        <Link className="arrow-action" href="/#arena">RETURN TO THE BALLOT <span>↓</span></Link>
      </section>
      <section className="archive-section">
        <div className="archive-note"><span>CATALOGUE NOTE</span><p>Lead and co-lead records enter the main ballot. Features and shared records remain in the index only. <strong>“The Money” is neutral and awards neither artist.</strong></p></div>
        <CatalogueArchive />
      </section>
    </EditorialShell>
  );
}
