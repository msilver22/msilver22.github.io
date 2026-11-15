---
name: Programma
description: The visual system of msilver22.github.io, an Italian modernist identity programme of two grounds, four flat inks and one typeface in three widths.
colors:
  paper: "#e9eef2"
  ink: "#14171f"
  graphite: "#474e5c"
  vino: "#7b1e34"
  pino: "#1f7a4d"
  cielo: "#2447b8"
  sole: "#f2c230"
  on-field: "#f1f5f8"
  field-ink: "#14171f"
  fig-vino: "#7b1e34"
  fig-pino: "#1f7a4d"
  fig-cielo: "#2447b8"
  fig-sole: "#f2c230"
  m-vino: "#7b1e34"
  m-pino: "#1a6b43"
  m-cielo: "#2447b8"
  m-sole: "#a36f00"
  paper-dark: "#11141b"
  ink-dark: "#e9eef2"
  graphite-dark: "#a4aebb"
  fig-vino-dark: "#dd6883"
  fig-pino-dark: "#41b07c"
  fig-cielo-dark: "#7591ff"
  m-vino-dark: "#dd6883"
  m-pino-dark: "#41b07c"
  m-cielo-dark: "#7591ff"
  m-sole-dark: "#f2c230"
typography:
  display:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 5.7vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  display-masthead:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 7.4vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2.125rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  title-band:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 2.7vw, 2.375rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "1.3125rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.012em"
    fontVariation: "'wdth' 100"
  lead:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  body:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.3
    fontVariation: "'wdth' 80"
  meta:
    fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.3
    fontVariation: "'wdth' 80"
  mono:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "0.8125rem"
    lineHeight: 1.6
rounded:
  none: "0px"
spacing:
  gutter: "clamp(1.25rem, 4.45vw, 4rem)"
  col: "9.5rem"
  col-compact: "7.5rem"
  register-gap: "2rem"
  fig: "clamp(20rem, 33vw, 32rem)"
  section: "clamp(4.5rem, 9vw, 7.5rem)"
components:
  button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.3rem"
  button-hover:
    backgroundColor: "{colors.vino}"
    textColor: "{colors.on-field}"
  button-on-field:
    backgroundColor: "{colors.on-field}"
    textColor: "{colors.field-ink}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.3rem"
  button-on-field-hover:
    backgroundColor: "{colors.field-ink}"
    textColor: "{colors.on-field}"
  link:
    textColor: "{colors.ink}"
    padding: "0.3rem 0"
  nav-link:
    textColor: "{colors.ink}"
    height: "2.75rem"
  masthead-home:
    backgroundColor: "{colors.vino}"
    textColor: "{colors.on-field}"
    typography: "{typography.display-masthead}"
  masthead-publications:
    backgroundColor: "{colors.pino}"
    textColor: "{colors.on-field}"
    typography: "{typography.display-masthead}"
  masthead-cv:
    backgroundColor: "{colors.cielo}"
    textColor: "{colors.on-field}"
    typography: "{typography.display-masthead}"
  masthead-news:
    backgroundColor: "{colors.sole}"
    textColor: "{colors.field-ink}"
    typography: "{typography.display-masthead}"
  band-pino:
    backgroundColor: "{colors.pino}"
    textColor: "{colors.on-field}"
    typography: "{typography.title-band}"
  band-cielo:
    backgroundColor: "{colors.cielo}"
    textColor: "{colors.on-field}"
    typography: "{typography.title-band}"
  row:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "1.4rem 0"
  row-key:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    width: "{spacing.col}"
  paper-number:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    width: "3.25rem"
  paper-number-target:
    backgroundColor: "{colors.pino}"
    textColor: "{colors.on-field}"
  field-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "3.25rem"
    padding: "0 1rem"
  footer:
    backgroundColor: "{colors.vino}"
    textColor: "{colors.on-field}"
---

# Design System: Programma

## Overview

**Creative North Star: "Programma"**

Programma treats one researcher's website as an Italian modernist identity programme. The surface is pale dusk-sky paper and blue-black ink, and four flat poster inks do all the colour work: wine, pine, cobalt and sun. Each page owns one of them. The home page is wine, publications pine, the CV cobalt, news sun, and that ink fills the page's masthead, its footer and its hover states. One typeface, Archivo, speaks in three widths: expanded for display, normal for reading, condensed for labels.

Everything is flat. Corners are square, structure is drawn with ink rules, and depth comes only from one flat plane overlapping another. The home page carries the programme's one figure: a multi-agent system built from a dome, a square, a circle and a triangle, standing on a full-width ink line called the shore. The figure is a live simulation that the visitor can rearrange and extend; without JavaScript, or with reduced motion, it stays as a still drawing. Lists on every page sit on one fixed column register, so dates, years and keys line up from page to page.

The system serves two readers equally: researchers who want the papers, and people evaluating a profile who want the trajectory and the CV. It is wrong, even when polished, if it reads as an academic template, as cold and impersonal, or as a creative-agency showpiece where effects outrank the science. The words are not part of the design: every heading, label and sentence comes from the content files, and the design changes presentation only.

**Key Characteristics:**
- Two grounds (paper, ink) and four flat field inks; no gradients, no shadows, no translucent colour at rest.
- One ink per page, set by the page key and carried by masthead, footer, hovers and underline marks.
- One typeface in three widths: expanded 125%, normal 100%, condensed 80%.
- Square corners; 2px ink rules open a block, 1px ink rules divide its rows.
- One fixed column register for every list; publications numbered in a margin column.
- One entrance per page, feedback on controls, nothing revealed on scroll.

### Motion grammar

Two easing curves are tokens: ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for everything that arrives or responds, and ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` for the masthead changing ink between pages. Motion moves and scales flat shapes; colour does not fade in.

- **Word rise (every page).** The page's display line rises word by word from behind a clip edge: each word translates up from 112% of its height over 720ms on ease-out, delayed by its index times 45ms plus 40ms. It is the only CSS entrance on inner pages.
- **Shore draw (home).** The 2px shore scales from zero width, anchored left, over 1100ms on ease-out after a 150ms delay.
- **Figure arrival (home, script only).** The orchestrator dome rises from behind the shore over 850ms; agents and tools arrive between 260ms and 830ms, each springing up from 82% scale with a 200ms opacity ramp; the twelve edges draw from their source end over 520ms each. The first task enters at 1450ms.
- **The simulation.** A task dot rides in along the shore from the left edge of the viewport, passes the queue, and reaches the orchestrator, which delegates through the router to two or three leads 190ms apart. Robots consult a neighbour and may use their memory, store, documents or tools; results return through the router, and the answer leaves along the shore past the exit. A hop lasts its visible length times 4.2ms, held between 340ms and 1700ms. A robot that receives a message springs, blinks and wobbles a few degrees; its eyes turn toward whoever it is talking to, and it blinks on its own every few seconds. A tool, the router and the memory turn 90 or 60 degrees when used. A new task starts every 3.2 to 4.4 seconds and at most two overlap. The trace readout holds each line at least 650ms. The clock stops when the visitor pauses it, when the figure is off screen, and when the tab is hidden. Visitors drag any shape and add up to three robots of their own, which the orchestrator uses at once.
- **Direct manipulation.** Any node can be dragged (it lifts to 107% scale; the dome moves along the shore only) and the edges follow. A click on empty space adds an agent wired to the orchestrator and to its nearest agent, and it is used at once. Three added agents are the limit; a fourth click moves the oldest.
- **Hover (fine pointers only).** Links draw a 2px ink underline from the left over 240ms; arrows nudge 2 to 3px in their own direction over 200ms; the nav square turns 90 degrees over 300ms; the button takes the page ink over 160ms; the publication sheet lifts 0.75rem over 300ms; hovering one news row sets the others to graphite over 200ms.
- **Press.** The button scales to 0.97, the theme toggle to 0.94 and the run toggle to 0.92, over 160ms on ease-out.
- **Disclosure.** Abstract and citation panels open by height over 300ms on ease-out while the plus icon turns 45 degrees.
- **Between pages.** Same-origin navigations use view transitions: the navigation bar is a named group that holds still, the masthead is a named group that morphs over 420ms on ease-in-out, and the rest of the page swaps over 240ms on ease-out.
- **Reduced motion.** All animation and transition durations collapse to 0.01ms with no delay, view transitions are switched off, and the figure script exits before it touches the drawing, so the still figure remains and the run controls stay hidden.

**The One Entrance Rule.** A page gets one entrance, and it is the display line rising word by word. The home page adds the shore and the figure to that same moment; no other element animates in.

**The Nothing On Scroll Rule.** Nothing fades, slides or reveals as the visitor scrolls. Content below the first screen is already there when they reach it.

## Colors

Two grounds and four flat poster inks drawn from the portrait; every ink is a solid field that carries its own text colour.

### Primary
The page ink. One of four fields, chosen by the page key, identical in light and dark themes.
- **Vino, wine** (`#7b1e34`): home and the not-found page. Masthead and footer field, button hover, the default page ink.
- **Pino, pine green** (`#1f7a4d`): publications. Also the first of the two publication bands on the home page.
- **Cielo, cobalt** (`#2447b8`): the CV. Also the second publication band on the home page.
- **Sole, sun yellow** (`#f2c230`): news and news permalinks. The one light field, so it takes dark text. It is also the text selection colour on every page.

### Secondary
Derived inks that sit on the ground rather than under text. They change with the theme so they stay visible on both grounds.
- **Figure inks** (`fig-vino`, `fig-pino`, `fig-cielo`, `fig-sole`): fills for the agents figure and the four squares in the navigation. In the light theme they equal the fields; in the dark theme wine, pine and cobalt lighten (`#dd6883`, `#41b07c`, `#7591ff`) and sun stays as it is.
- **Underline marks** (`m-vino`, `m-pino`, `m-cielo`, `m-sole`): the 2px line under links, the text caret and the focus outline of the search fields. In the light theme pine deepens (`#1a6b43`) and sun becomes ochre (`#a36f00`) so the line reads on pale paper; in the dark theme the marks take the lightened figure values and sun returns to `#f2c230`.

### Neutral
- **Dusk-sky paper** (`#e9eef2`; dark theme `#11141b`): the ground of every page, the fill of outlined tools in the figure, the label colour of the ink button.
- **Blue-black ink** (`#14171f`; dark theme `#e9eef2`): text, rules, figure edges, icons, the ink button.
- **Graphite** (`#474e5c`; dark theme `#a4aebb`): secondary text only: authors, venues in italics, institutions, counts, the trace hint, placeholders.
- **On-field** (`#f1f5f8`): text on the wine, pine and cobalt fields. Fixed in both themes.
- **Field ink** (`#14171f`): text on the sun field. Fixed in both themes.

### Named Rules
**The Locked Palette Rule.** The palette is two grounds, graphite and four field inks, with the figure and mark variants listed above. No new hue, tint, shade or opacity step is added; a new need is met with an existing ink.

**The One Ink Per Page Rule.** A page shows its own ink in the masthead, the footer, hovers and underline marks. The other three inks appear on it only as the navigation squares, the home figure and the two home publication bands.

**The Fields Carry Their Own Text Rule.** Text on wine, pine and cobalt is on-field; text on sun is field ink. Fields and their text do not change between light and dark themes.

**The Marks Are Not Text Rule.** Mark colours and figure inks draw lines and fill shapes. They are never used as a text colour; text is ink, graphite, or a field's own text colour.

## Typography

**Display Font:** Archivo at 125% width (with 'Helvetica Neue', Helvetica, Arial, sans-serif)
**Body Font:** Archivo at 100% width (same fallbacks)
**Label/Mono Font:** Archivo at 80% width for labels; ui-monospace, 'SF Mono', Menlo, Consolas for BibTeX only

**Character:** One grotesk doing three jobs by changing width, not family. Expanded semibold sets the poster voice, the normal width reads plainly, and the condensed width keeps dates, venues and counts compact and tabular. Archivo is self-hosted as two variable files (roman and italic, Latin subset, weights 100 to 900, widths 62% to 125%) under the SIL Open Font License; the stylesheet sets width with `font-stretch`.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 5.7vw, 5.5rem)`, line-height 0.98, tracking -0.035em, expanded, balanced wrap): the page title, one per page. On masthead pages it runs larger, `clamp(2.75rem, 7.4vw, 6rem)`. The footer email uses the same voice at `clamp(1.2rem, 4.6vw, 4.25rem)`.
- **Headline** (600, `clamp(1.5rem, 2.5vw, 2.125rem)`, line-height 1.08, tracking -0.025em, expanded): section headings. Year numerals use it at `clamp(1.75rem, 3vw, 2.75rem)` with line-height 1; CV section headings at `clamp(1.375rem, 2vw, 1.75rem)`.
- **Title** (600, 1.3125rem, line-height 1.25, tracking -0.012em, normal width): paper titles and CV entry titles. On a publication band the title switches to the expanded width at `clamp(1.5rem, 2.7vw, 2.375rem)`.
- **Body** (400, 1.0625rem, line-height 1.6, normal width, pretty wrap): running text. The bio is a lead at 1.1875rem / 1.55 with a 35rem measure; row and abstract text holds a 44rem measure, publication entries 50rem. A news permalink sets its text at `clamp(1.25rem, 2vw, 1.625rem)` / 1.45.
- **Label** (600, 0.9375rem, line-height 1.3, condensed, sentence case): venues, row keys, publication numbers, the search label, dates. A lighter meta step (500, 0.875rem, condensed, graphite) carries counts and the trace hint. Navigation and utility links are 500 at 0.9375rem in the normal width.

### Named Rules
**The Three Widths Rule.** Hierarchy is made with width and size inside one family: expanded for display and headings, normal for text and titles, condensed for labels. No second typeface is introduced; the monospace stack exists only for BibTeX.

**The Tabular Figures Rule.** Every number that sits in a column or changes in place uses tabular figures: row keys, years, publication numbers, counts, dates and the trace readout.

**The Labels Are Data Rule.** The label voice carries facts from the content files: a venue, a date, a count, a form label. It is sentence case, never uppercased or letter-spaced, and never used for a slogan above a heading.

## Layout

Content sits in one wrapper with a maximum width of 100rem and a side gutter of `clamp(1.25rem, 4.45vw, 4rem)` that respects safe-area insets. Fields (mastheads, bands, the footer) and the shore run the full width of the viewport; their contents return to the wrapper. Major sections are separated by `clamp(4.5rem, 9vw, 7.5rem)`.

**The register.** Every list is a two-column grid: a key column of 9.5rem and a flexible body, 2rem apart. News rows put the date in the key column; CV rows put the years or the field name there; the publications and news archives put the year numeral there, sticky 1.25rem from the top, with the rows beside it. Inside a publication entry a 3.25rem margin column holds the bracketed number. CV sections add a 15rem heading column to the left of their rows.

**The figure column.** On the home page a right-hand column of `clamp(20rem, 33vw, 32rem)` holds the agents figure above the shore, and the trace readout and the identity block below it, so all three share one left edge. The headline spans the full grid at a maximum of 9.75em, and the portrait (13.25rem column) and the bio hang under the shore at the left.

**Responsive behaviour.**
- At 72rem and below the portrait column narrows to 11rem and the trace hint wraps under the readout.
- At 56rem and below the key column becomes 7.5rem; the hero becomes one column with the figure centred at up to 30rem; the identity block moves under the bio across the full width with a 2px ink rule above it; bands and CV sections stack.
- At 40rem and below the navigation wraps its four links onto a second row; the register collapses to one column with the key above the body; the year numeral stops being sticky; the search field and the year select stack; the ink button takes the full width.

Navigation links, the theme toggle, the figure's pause toggle and footer links hold a 2.75rem minimum height. Print hides the navigation, the search tools, the figure and its readout, and prints fields as black text on no background.

**The One Register Rule.** A new list uses the existing key column and gap. It does not introduce its own column widths, and its keys line up with the keys of every other list on the site.

## Elevation & Depth

The system is flat. The stylesheet contains no box shadow, no text shadow, no filter, no gradient and no backdrop effect. Depth is conveyed by overlap alone: the publication sheet sits on its band and runs off the band's bottom edge, figure shapes cover the ends of their edges, the orchestrator dome is cut by the shore, and a full-width field meets the paper at a hard edge. Lift is expressed as movement, not shadow: the sheet rises 0.75rem on hover and a dragged agent grows to 107%.

### Named Rules
**The Flat Planes Rule.** A surface is one solid colour with a hard edge. If something needs to feel in front, it overlaps; it never casts a shadow, blurs what is behind it, or fades into it.

## Shapes

Corners are square (0px) on every control, field, image and panel. Circles exist only as geometry: circular agents, a round tool, message dots and the theme icon. The figure is built from four primitives (dome, square, circle, triangle) filled with a figure ink, plus small outlined tools drawn as paper with a 2px ink stroke.

Lines come in two weights. A 2px ink rule is structural: the shore, the top of every register block, the border of the search fields, the rule above the footer meta line, link underlines, figure edges. A 1px ink rule divides: between rows and around the citation box. Icons are 16-unit line drawings with a 2px stroke and no fill, sized at 0.8em of the text they follow; the navigation squares are 0.625rem.

**The Two Rule Weights Rule.** 2px opens a block or draws a structural line; 1px separates rows inside it. Rules are solid ink (or the current text colour on a field), never grey and never dashed.

## Components

Controls are plain and exact: solid blocks and ruled lines that answer the pointer by changing ink or drawing a line.

### Buttons
- **Shape:** square block (0px radius), padding 0.85rem 1.3rem, 600 weight at body size, label and arrow icon 0.65em apart.
- **Primary:** ink background with paper text. Used once per view for the main step (Publications on the home page, the way home on the not-found page).
- **On a field:** on-field background with field-ink text in a wine, pine or cobalt masthead (the CV's Download PDF); on the sun masthead it inverts to field ink with on-field text.
- **Hover / Press:** on the ground the block takes the page ink and its text colour over 160ms; on a field it swaps its two colours. The arrow nudges in its direction. Press scales the block to 0.97.
- **Narrow screens:** in the home actions the button fills the row with the arrow pushed to the right edge.

### Text links
- **Action link:** 600 weight, an optional trailing arrow icon, a resting 2px underline in the page's mark colour and a 2px ink underline that draws over it from the left on hover (240ms, ease-out). Inside mastheads and bands the mark is dropped and only the hover line remains.
- **Prose link:** underlined in the page's mark colour at 2px, 0.2em below the text; on hover the underline turns to the text colour over 150ms.
- **Quiet link** (identity block, footer, paper titles, row dates): no underline at rest, a 2px underline on hover.
- **Focus:** a 2px outline in the current text colour, offset 3px, on every focusable element. The solid button draws its outline in ink (the masthead button in the field's text colour), because its own text colour would vanish against the ground.

### Navigation
- **Style:** the `ms22` wordmark at the left (700, 1.375rem, expanded, the only bold weight in the system), four links at the right (500, 0.9375rem), then the theme toggle. Each link is led by a 0.625rem square in that page's figure ink.
- **States:** the current page carries a 2px ink underline; hover draws the same underline and turns the square 90 degrees. The theme toggle is a half-filled circle that rotates 180 degrees in the dark theme and scales to 0.94 on press; it appears only when the script runs.
- **Mobile:** at 40rem and below the links move to a second row and spread across it.
- **Between pages:** the bar is a named view-transition group and does not move.

### Masthead
- **Style:** a full-width field in the page ink on every page except home. The display title sits bottom-left in the field's text colour; links, a button or a date sit bottom-right in the condensed label voice or as action links.
- **Padding:** `clamp(3rem, 8vw, 6.5rem)` above, `clamp(1.75rem, 3vw, 2.5rem)` below.
- **Between pages:** the masthead is a named view-transition group, so one page's field becomes the next page's.

### Register rows
- **Style:** a block opens with a 2px ink rule; each row is the key column plus body, padded 1.4rem above and below and closed by a 1px ink rule. Keys are condensed 600 with tabular figures; a date key is a quiet link to the news permalink.
- **State:** on fine pointers, hovering a row in a news list sets the other rows to graphite.

### Publication entry
- **Style:** a bracketed number in the 3.25rem margin column; then the title (a quiet link), the venue as a label under it, all authors in graphite with Matteo Silvestri in ink at 600, the journal in graphite italics, and a row of action links.
- **Disclosures:** Abstract and Cite / BibTeX open in place behind a plus icon. The citation sits in a 1px ink box in the monospace stack with a full-width Copy citation bar that inverts to ink on hover and press.
- **Target:** an entry opened by its anchor shows its number on the page ink in the field's text colour, and its abstract opens.

### Inputs / Fields
- **Style:** paper background, 2px ink border, square corners, 3.25rem minimum height, 1rem inner padding; graphite placeholder. The select is the same box with a chevron drawn from two 2px ink strokes.
- **Label and count:** a condensed 600 label above; a condensed 500 graphite result count below, announced politely.
- **Focus:** a 2px outline in the page's mark colour, offset 2px.
- **Availability:** search and year filter appear only when the script runs; the full list is always in the page.

### Publication band (signature)
A full-width field, pine then cobalt in alternation, for each selected publication on the home page. Left: the title in the expanded width, and at the bottom one row with the venue label and the Paper and Code links. Right: the paper's preview as a flat sheet, `min(34rem, 42%)` wide, that overlaps the band's bottom edge and is cut by it. The sheet rises 0.75rem when it or the title is hovered. The sheet's backing is literal white behind the page raster; it is not a palette colour and is not reused elsewhere.

### Agents figure and shore (signature)
A 13:11 drawing, `clamp(20rem, 33vw, 32rem)` wide, standing on the shore: a multi-agent architecture with no text inside it. Robots are agents, drawn from flat primitives (a head, two eyes cut out in the paper colour, a mouth bar on the larger ones, an ink antenna): the wine orchestrator is a large dome rising from the line, three lead robots stand above it (pine with a square head, cobalt with a round head, sun with an arched head), and two smaller robots sit above them (wine with a visor, pine with square eyes). The other shapes are what the robots use: an ink diamond router between the orchestrator and the leads, a sun hexagon for shared memory, three cobalt bars for a store, two outlined sheets for documents, and four outlined tools (squares and circles). On the shore itself three cobalt squares form the task queue at the left and a pine triangle marks the exit at the right. Nineteen 2px ink edges join them, carrying 6.5-unit message dots in the sender's ink. Under the shore sits the readout: a pause/play toggle, the trace in tabular figures in the form `task 01 · cobalt robot → sun robot`, and on its own row the hint "Drag a robot, or press an empty spot to add one.". The figure is decorative and hidden from assistive technology; its behaviour is described under Motion grammar.

### Footer
The page ink closes the page: a full-width field holding the email address in the display voice with an underline that draws on hover (300ms), a row of profile links, and a meta line (copyright with the name, RSS, back to top) under a 2px rule in the field's text colour.

## Do's and Don'ts

### Do:
- **Do** take every colour from the tokens: paper, ink, graphite, the four fields, their text colours, and the figure and mark variants.
- **Do** give a new page one of the four inks through its page key, and let masthead, footer, hovers and marks follow from it.
- **Do** set text on wine, pine and cobalt in on-field (`#f1f5f8`) and text on sun in field ink (`#14171f`), in both themes.
- **Do** build hierarchy from Archivo's three widths: 125% for display and headings, 100% for text, 80% for labels.
- **Do** place every list on the register: a 9.5rem key column (7.5rem at 56rem and below, stacked at 40rem and below) and a 2rem gap.
- **Do** open a block with a 2px ink rule and divide its rows with 1px ink rules.
- **Do** use tabular figures for dates, years, numbers and counts.
- **Do** keep the page readable with no script: search, filters, the theme toggle, copy buttons and the live figure are enhancements that appear only when the script runs.
- **Do** honour reduced motion: collapse durations, switch off view transitions, leave the figure still.
- **Do** take every word and number from the content files. The home headline is the author's sentence and the home news heading is "News".

### Don't:
- **Don't** add a colour, tint or opacity step to the palette, and don't use a gradient or a translucent wash anywhere.
- **Don't** use a box shadow, text shadow, blur or glow. Depth is overlap only.
- **Don't** use a mark colour or a figure ink as a text colour.
- **Don't** round a corner on a control, field, image or panel.
- **Don't** introduce a second typeface, uppercase labels or added letter-spacing.
- **Don't** give a list its own column widths; it sits on the register.
- **Don't** fade, slide or reveal content on scroll, and don't add a second entrance to a page.
- **Don't** write slogans, topic cards, kickers above headings, invented biography or research summaries. Text is binding; a design change alters presentation only.
- **Don't** let it read as an academic template, as cold and impersonal, or as a creative-agency showpiece where effects outrank the science.
