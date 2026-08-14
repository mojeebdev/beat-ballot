---
name: "BEAT BALLOT Design System"
product: "BEAT BALLOT"
source: "Adapted from user-supplied visual reference"
status: "draft"
confidence: "high"
generated_by: "StyleGraft"
---

# BEAT BALLOT Design System

## 1. Product Context

BEAT BALLOT is an independent Nigerian music-culture voting game around `HIT // FOR // HIT: Olamide / Davido`. Its primary action is a single authenticated, informed ballot for the current pairing. The audience is mobile-first music fans who already understand the cultural conversation and need a fair, credible place to participate—not a simulation of an official artist battle.

The emotional target is charged, public and respectful: the page should feel like a city music bulletin posted at the moment an argument becomes communal. Trust is essential. The unaffiliated disclaimer, source links, vote gate and no-fake-activity stance must remain visible rather than being buried in a legal footer.

## 2. Translation Summary

| Reference principle | Decision | BEAT BALLOT expression |
| --- | --- | --- |
| Monumental stacked poster headline | Preserve | Oversized `HIT // FOR // HIT` occupies the hero, with readable, editorial serif/condensed-display tension rather than rounded novelty lettering. |
| Central one-page announcement hierarchy | Adapt | The hero announces the cultural premise, then rapidly resolves into the live ballot; no event registration or marketing-email funnel. |
| Diagonal announcement tape crossing the hero | Preserve | A thin, gold-on-void “LIVE BALLOT / ONE PICK PER ROUND / UNAFFILIATED” tape crosses the hero at a restrained angle. It must never obscure the vote button or heading on small screens. |
| Playful illustrated characters and devices | Exclude | Use no cartoon mascots, borrowed objects or character art. Texture comes from typographic scale, rule lines, index marks and abstract record-label geometry. |
| Pale blue field and bright comic palette | Exclude | Replace with void-green/near-black, warm ivory, solar gold and a sparing red-orange counter-accent. |
| Strong public participation invitation | Preserve | “Cast your pick” is the dominant interaction, reinforced by transparent instructions and post-vote reveal—not attendee registration. |
| Sparse field broken by a few large visual anchors | Adapt | Use the vote cards, results ledger and catalogue records as anchors; avoid empty decorative space that delays voting. |

## 3. Design Intent

**North star:** a living record-index poster for a public music argument—elevated enough to earn trust, immediate enough to vote on with one thumb.

Operating principles:

1. Put the round and the two records ahead of product explanation.
2. Make evidence look like publishing metadata, never like dashboard analytics.
3. Use asymmetry to create friction and momentum, not to hide actions or content.
4. Let a gold signal mean “live, selected, or actionable”; it is not decoration.
5. Make the unaffiliated status part of the identity system, not an apologetic afterthought.
6. Reward participation with the results reveal and precise fan context, never invented popularity theatre.

## 4. Colour System

Selected palette, extending the current production tokens:

| Token | Value | Role |
| --- | --- | --- |
| `--bb-void-deep` | `#091510` | page depth, footer, selected-action inversion |
| `--bb-void` | `#10231C` | primary canvas |
| `--bb-ivory` | `#F0E9CC` | primary text and paper panels |
| `--bb-ivory-dim` | `#C8C3AA` | long-form supporting text and secondary metadata |
| `--bb-solar` | `#E9B34B` | live indicator, tape, active action, rank and source emphasis |
| `--bb-orange` | `#EE7345` | Davido counter-signal, warnings and limited interactive contrast |
| `--bb-line` | `rgba(240,233,204,.34)` | primary border/rule |
| `--bb-line-quiet` | `rgba(240,233,204,.14)` | subordinate rule/texture |

Use roughly 78% void, 16% ivory, 5% gold and under 1% orange across a screen. Ivory panels are earned by a reveal, form or editorial interruption; do not turn every section into a card. Verify contrast whenever ivory text is dimmed or gold is used as small text; gold is strongest as a larger label, rule or icon.

## 5. Typography

- **Display:** a high-contrast editorial serif or compressed display face with sharp, cultural-poster scale. Use for `HIT // FOR // HIT`, round title, song title and the largest editorial statements. Current Georgia/Iowan fallback is acceptable until a licensed webfont is selected.
- **Metadata:** a precise monospaced family for timestamps, record years, evidence levels, statuses, source links, controls and the diagonal tape.
- **Body:** readable serif at 16–20px, 1.15–1.3 line-height; never set explanatory copy in all caps.

Type scale: 10–11px metadata; 15–18px body; 22–30px song/result row; 40–84px section display; 58–112px mobile hero; 112–255px desktop hero. Display may run tightly (`-0.06em` to `-0.11em`) but body and controls should not. Hero lines can collide optically; controls and source data cannot.

## 6. Layout and Rhythm

- Use a page gutter of `20px` at 360px, scaling to `64px` at large desktop. Do not let vote controls reach the viewport edge.
- Treat each section as a bulletin spread separated by a single thin rule. Prefer 1–2 strong columns over grids of identical cards.
- Desktop hero: asymmetrical 60/40 information split with headline spanning its own band; round status stays visually quiet above it.
- Ballot: two equal record panels with a narrow vertical `VS` spine. Results and last-ten feed form an uneven 44/56 split.
- Catalogue: a dense, rule-led ledger. Source, year and role are columns—not badges floating in card chrome.
- Use one controlled grid break per major section: a tape through the hero, a displaced about-sticker, or a result panel on a faint ivory wash. Never stack all three in one viewport.

Vertical cadence: 12/20/32px internal steps; 56–94px section breathing room on mobile; 65–126px on desktop. The ballot begins within roughly one thumb-scroll of the initial page load on phones.

## 7. Composition Grammar

1. **Poster field:** one extreme display statement above a practical response surface.
2. **Bulletin interruption:** diagonal tape crosses a background field only; it carries live status or public rules, never promotional filler.
3. **Evidence ledger:** horizontal rules turn catalogue, results and activity into adjacent forms of record keeping.
4. **Asymmetric counterweight:** when text has huge scale on one side, use a small mono datum, marker or source block at the opposing edge.
5. **Selection inversion:** the chosen or completed state turns ivory with void text; no neon glows, confetti or trophy language.
6. **Controlled density:** hero is bold and sparse; arena is decisive; catalogue is dense; footer resolves quietly.

## 8. Imagery and Art Direction

Do not use artist artwork, audio, lyrics, music-video stills, cartoon characters, bubbly device illustrations or source-reference graphics. The visual material should be abstract and owned: low-opacity halftone/noise, a cropped vinyl-groove arc, index ticks, typographic slashes, and archival music-bulletin rules.

If imagery is later commissioned, favor abstract physical artifacts—anonymous concert-stub textures, monochrome noticeboard paper, or macro record grooves—rather than portraiture. All imagery must support the paired records and never imply artist endorsement.

## 9. Shape and Material Language

- 1px rules are the default boundary. They are present but quiet.
- Corners are square by default; only the artist initial mark may be circular.
- Controls are rectangular, solid and label-led. Buttons invert, fill gold, or fill orange on hover; they do not lift into soft floating cards.
- Apply a low-opacity dot/noise texture to void surfaces only. Keep text layers clean.
- The diagonal tape is ivory or solar with void lettering, outlined in void, rotated between `-3deg` and `-6deg` on large screens. It may become horizontal on mobile.

## 10. Components

| Component | Rules |
| --- | --- |
| Header | Wordmark left; a compact round signal centered/near-center; navigation or sign-in right. On mobile retain wordmark plus one sign-in/status control. |
| Bulletin tape | Text is factual: live state, single-vote rule, and unaffiliated status. Repeats only when enough width exists. |
| Round header | Round number and lens in mono, title in display, prompt in a ruled side note. |
| Vote pair | Two editorial panels, each with artist, year, role, source and one full-width choice action. Selection/complete state is unambiguous and non-repeatable. |
| Alias form | A single full-width field with a mono label. Explain that alias is public; do not request additional profile data. |
| Results ledger | Hidden before vote. After vote, show song pace and fan leaderboard as lines of evidence, not visualized “growth” charts. |
| Last-ten feed | Alias, artist, track and relative time only. New rows enter once; no counters or fake “watching now” claims. |
| Catalogue row | Year, title, artist, role, evidence, short milestone, source. Filters are simple selects/chips, not a dashboard filter bar. |

Required states: loading should use mono status and reserved layout space; empty activity explicitly says no activity has been fabricated; duplicate vote confirms the sealed ballot; rate-limit says when to retry; failures preserve the pick and offer a single retry.

## 11. Responsive Behaviour

**360–479px (primary):** hero headline wraps deliberately to two or three compact lines; tape becomes horizontal if it threatens legibility; ballot stacks Olamide / `VS` / Davido; pick buttons are 48px minimum height and full width. Results stack below feed. Keep source links visible and do not hide the disclaimer.

**480–767px:** retain stacked ballot, but allow the tape’s slight angle and place catalogue filters on one line only if they fit without truncation.

**768–1199px:** restore split feed/results and two-column catalogue; vote cards can remain side by side once each title and action still has comfortable room.

**1200px+:** allow the poster headline to become dominant and the tape to run edge-to-edge. Do not increase the main reading measure past about 70 characters.

## 12. Motion and Interaction

Motion is inferred from the reference’s playful poster energy and must remain controlled:

- bulletin tape may make a 1–2px settle on load, never marquee endlessly;
- fresh last-ten entries rise/fade in over 250–400ms;
- vote action gives immediate pressed/inverted feedback while the server request is pending;
- selection uses color and copy change, never large scale jumps;
- respect `prefers-reduced-motion`: no tape movement, entry animation or smooth scroll.

## 13. Accessibility

- Use semantic headings in actual hierarchy, ordered lists for ranks and catalogue records, and `aria-live="polite"` only for vote/status confirmation.
- Keep minimum 44×44px hit targets; a vote action should be at least 48px tall.
- Do not rely on Olamide/Davido color difference alone; repeat artist names in text.
- Maintain visible focus rings in solar against void and void against ivory inversion.
- Ensure all public metadata is readable at 10px mono only where it is genuinely secondary; timestamps and sources remain zoom-safe.
- Decorative texture, tape duplicates and non-informative marks are hidden from assistive technology.

## 14. Anti-Slop Constraints

1. No glassmorphism, gradients, glow halos or Web3 token motifs.
2. No generic metric cards, donut charts, “total users,” viewer counts or fabricated momentum.
3. No cartoon art, mascot systems, emoji stickers or bubbly display type.
4. No blue/purple SaaS palette, rounded dashboard modules or soft drop shadows.
5. No event-registration language, RSVP counts, ticketing structures or email-capture-as-primary-action.
6. No artwork, lyrics, audio embeds or claims of artist/label involvement.
7. No confetti, trophies or “winner” treatment: results are the room’s pace, not an official verdict.
8. No diagonal tape over input labels, vote actions, source links or small-screen headings.

## 15. Do / Don't

| Do | Don't |
| --- | --- |
| Use a solar tape to state “ONE PICK PER ROUND.” | Use a tape as an animated advertisement. |
| Let the enormous title create the poster energy. | Borrow the reference’s rounded, cartoonish lettering. |
| Use rules and source metadata to make the ballot credible. | Replace context with charts, scores or invented reach. |
| Stack the two records clearly on phones. | Preserve desktop asymmetry at the cost of thumb reach. |
| Show the independent disclaimer at hero/about/footer moments. | Imply an official artist versus event. |

## 16. Implementation Guidance

The existing Next.js application already has suitable tokens in `app/globals.css`; normalize them under the `--bb-*` names above rather than introducing a second theme. Keep page composition in `components/ballot-experience.tsx`, with a small `BulletinTape` component and a `RoundHeader` component added only if implementation begins. Preserve the server-owned vote API and existing result gate exactly as-is.

Recommended CSS boundaries: global tokens/type/rules; hero/tape; arena/vote pair; live ledgers; catalogue; responsive overrides. Use CSS grid for macro composition, flex for rows, and no absolute positioning for the vote action. A tape can use absolute positioning on desktop only when its content is duplicated in a screen-reader-safe inline status.

Before implementation, make a 360px screenshot the primary visual approval surface, then verify 768px and 1440px. Do not add a font package without an explicit licensed-font decision; use current serif and mono fallbacks in the interim.

## 17. Uncertain Decisions

- The reference does not establish a specific suitable display serif or condensed typeface. Select a licensed font or continue with the current editorial fallback before production typography changes.
- The reference implies playful motion but does not show its timing. The restrained motion rules above are an inference and should be validated with a mobile prototype.
- No owned photography/art direction has been supplied. The system intentionally specifies abstract material until rights-cleared visual assets exist.
