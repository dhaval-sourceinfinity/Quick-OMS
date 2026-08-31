# DESIGN.md

# QuickOMS Marketing Website Design System Specification

## 1. Scope

This specification defines the visual, structural, responsive, and
behavioral rules for the QuickOMS marketing website represented by the
supplied reference pages:

- Home
- Pricing
- Compare
- FAQ
- Contact / Book Demo

The website must feel like one product, not five independently designed
pages.

The visual direction is:
- operational SaaS;
- clean and structured;
- calm rather than flashy;
- dark navy brand framing;
- confident blue action surfaces;
- light neutral content canvas;
- restrained borders and shadows;
- strong information hierarchy;
- consistent spacing and alignment.

Exact values should be synchronized with Figma MCP data when available.
Until then, this document defines semantic roles and consistency rules
rather than locking implementation to unverified screenshot measurements.

---

# 2. Design Source Hierarchy

Use this priority order:

1. Approved Figma variables, styles, components, and page frames.
2. Approved design tokens defined in this document.
3. Supplied snapshots as visual references.
4. Documented fallback assumptions.

Do not create competing values because one page screenshot appears slightly
different.

If the same visual role appears to have multiple values, investigate whether
it is:
- a responsive variant;
- a component variant;
- a different surface role;
- a rendering difference;
- or an inconsistency requiring Figma verification.

---

# 3. Design Token Model

All recurring visual values must be represented as semantic variables.

Use five token layers.

## 3.1 Reference Tokens

Raw approved values from Figma:
- primitive colors;
- primitive spacing;
- primitive radius;
- primitive font sizes;
- primitive line heights;
- primitive shadows;
- primitive breakpoints.

Reference tokens should not be scattered directly through page components.

## 3.2 Semantic Tokens

### Color

Required semantic roles:
- `color.bg.canvas`
- `color.bg.surface`
- `color.bg.surface-muted`
- `color.bg.inverse`
- `color.bg.brand`
- `color.bg.brand-emphasis`
- `color.text.primary`
- `color.text.secondary`
- `color.text.muted`
- `color.text.inverse`
- `color.text.accent`
- `color.action.primary`
- `color.action.primary-hover`
- `color.action.secondary`
- `color.border.default`
- `color.border.subtle`
- `color.border.strong`
- `color.status.success`
- `color.status.error`
- `color.focus.ring`

### Typography

- `font.family.primary`
- `font.weight.regular`
- `font.weight.medium`
- `font.weight.semibold`
- `font.weight.bold`

Text roles:
- `text.display`
- `text.page-title`
- `text.section-title`
- `text.card-title`
- `text.body`
- `text.body-small`
- `text.label`
- `text.meta`
- `text.nav`
- `text.button`

### Spacing

Required aliases:
- `space.page-inline`
- `space.section-block`
- `space.section-block-compact`
- `space.content-gap`
- `space.card-padding`
- `space.card-gap`
- `space.control-gap`
- `space.inline-gap`

### Size

- `size.container.max`
- `size.header.height`
- `size.control.min-height`
- `size.icon.sm`
- `size.icon.md`
- `size.icon.lg`
- `size.touch.min`

### Shape

- `radius.xs`
- `radius.sm`
- `radius.md`
- `radius.lg`
- `radius.pill`

### Border and Elevation

- `border.width.default`
- `border.width.emphasis`
- `shadow.none`
- `shadow.card`
- `shadow.floating`
- `shadow.focus`

### Motion

- `motion.fast`
- `motion.normal`
- `motion.slow`
- `easing.standard`

Motion values must support reduced motion.

## 3.3 Component Tokens

Components may define semantic aliases for approved differences.

Examples:
- `button.primary.background`
- `button.primary.text`
- `button.primary.radius`
- `card.default.padding`
- `card.default.border`
- `hero.background`
- `cta.background`
- `table.highlighted-column.background`

Component tokens may reference semantic tokens and must not duplicate raw
values.

## 3.4 Layout Tokens

Define shared values for:
- page container;
- narrow text measure;
- wide content measure;
- desktop/tablet/mobile breakpoints;
- standard grid gaps;
- section spacing;
- header offsets where required.

## 3.5 Page Tokens

Page tokens are allowed only for genuine page-specific composition.
They must not redefine the global visual language.

---

# 4. Color System Rules

## 4.1 Dark Structural Surface

Used for:
- global header;
- footer;
- dark integrations section;
- selected high-contrast panels.

Characteristics:
- deep navy;
- cool-toned;
- stable and low-noise;
- supports light text.

Do not create multiple visually similar navy values without semantic purpose.

## 4.2 Brand Gradient Surface

Used for:
- hero backgrounds;
- primary CTA bands;
- selected highlighted plan/comparison emphasis.

Characteristics:
- dark-to-bright blue depth;
- subtle grid overlay where approved;
- brighter center/lower emphasis where approved;
- light text.

Grid decoration is one reusable treatment.

## 4.3 Light Content Canvas

Used for:
- page body;
- pricing;
- comparison;
- FAQ;
- forms.

Use a soft neutral/light canvas unless Figma explicitly specifies another
surface.

## 4.4 Accent

A restrained warm accent is used for small labels such as section eyebrows
and metadata emphasis.

Do not use the accent as a replacement for the primary brand action.

---

# 5. Typography System

The exact font family comes from Figma.

The hierarchy must remain consistent.

## 5.1 Page Titles

Rules:
- strong weight;
- compact but readable line-height;
- centered when the pattern is centered;
- constrained content width;
- natural responsive wrapping;
- no forced screenshot-only line breaks.

## 5.2 Section Titles

Used for:
- workflow;
- business management;
- integrations;
- pricing;
- comparison;
- FAQ.

Rules:
- subordinate to page title;
- stronger than card titles;
- consistent weight and line-height across pages;
- centered or left-aligned according to the section pattern.

## 5.3 Card and Panel Titles

Used in:
- pricing cards;
- contact panels;
- feature cards;
- form sections.

Must use one shared hierarchy.

## 5.4 Body Text

Rules:
- readable at all widths;
- muted text remains legible;
- line length controlled by content measure;
- body copy must not compete with headings.

## 5.5 Labels and Navigation

Labels are compact and structured.

Distinguish labels from body copy through weight, size, or spacing rather
than random color changes.

---

# 6. Global Layout System

## 6.1 Page Structure

Every page follows:

1. shared header;
2. page hero or top content;
3. main content sections;
4. optional primary CTA band;
5. shared footer.

The footer visually anchors the site consistently.

## 6.2 Shared Container

Major content aligns to one shared responsive container.

The container defines:
- max width;
- inline page padding;
- alignment.

Full-width backgrounds may extend outside the container, but content remains
aligned unless Figma explicitly uses a full-bleed composition.

## 6.3 Section Rhythm

Use:
- larger spacing between major sections;
- medium spacing between section title and content;
- smaller spacing inside content groups.

Avoid arbitrary page-to-page section gaps.

## 6.4 Content Measures

Use narrower measures for:
- hero copy;
- section descriptions;
- centered explanatory text.

Use wider measures for:
- comparison tables;
- multi-column pricing;
- integration diagrams;
- wide feature grids.

---

# 7. Responsive Rules

## 7.1 Supported Layout Ranges

The system supports:

- 320–374: compact mobile;
- 375–479: standard mobile;
- 480–767: large mobile / small tablet;
- 768–1023: tablet;
- 1024–1439: desktop / laptop;
- 1440+: wide desktop.

These are validation ranges. Exact implementation thresholds must be
centralized as layout tokens.

## 7.2 Mobile Rules

On narrow screens:
- page inline padding reduces but remains consistent;
- desktop navigation becomes an intentional mobile navigation pattern;
- multi-column grids reduce columns according to usable width;
- paired form fields become one column when needed;
- CTA groups may stack;
- large tables use their documented narrow-screen strategy;
- oversized footer branding scales without overflow;
- hero headings reduce through the typography system;
- tap targets remain usable;
- no text is clipped.

## 7.3 Tablet Rules

Tablet is not merely scaled desktop.

Validate:
- navigation fit;
- pricing card count/width;
- comparison readability;
- form field grouping;
- feature card wrapping;
- CTA grouping.

## 7.4 Desktop/Laptop Rule

**1024px and above is desktop/laptop for QuickOMS unless Figma explicitly
defines a different responsive state.**

At 1024–1439px:
- preserve desktop information architecture;
- preserve desktop topology when usable;
- reduce gaps and padding before changing structure;
- resize cards and visual panels before stacking them;
- allow natural wrapping;
- keep typography within approved bounds.

Do not introduce an arbitrary tablet layout at 1100px, 1150px, 1200px, or
another intermediate width.

A structural/topology change is allowed only when:
1. Figma shows the responsive state;
2. the desktop layout becomes genuinely unusable; or
3. a documented component-specific constraint requires it.

## 7.5 Section-Specific Breakpoints

Component-specific breakpoints are allowed only when the component has a
real content constraint.

Each exception must:
- be scoped to that component;
- have a documented reason;
- not redefine the global breakpoint model.

The existing header has a documented navigation collapse exception around
1180px because its logo, seven navigation links, and CTA otherwise collide.
This does not mean other sections should become tablet at 1180px.

## 7.6 Intermediate Width Rule

Every component must survive widths between breakpoints.

Check:
- no collision before the next breakpoint;
- no orphaned button;
- no nav overflow;
- no accidental single-card row;
- no unexpected page scrolling;
- no broken table columns;
- no accidental topology switch.

---

# 8. Shared Components

## 8.1 Header

Composition:
- logo/brand;
- primary navigation;
- active item;
- primary CTA.

Responsive behavior:
- desktop navigation must not silently overflow;
- collapse at the documented navigation threshold;
- preserve primary destinations;
- maintain accessible menu state;
- manage focus and Escape correctly.

## 8.2 Buttons

Required hierarchy:
- primary;
- secondary;
- contextual inverse/outline where approved.

Keep:
- height family;
- horizontal padding family;
- radius;
- label weight;
- icon size;
- icon gap;
- focus treatment.

## 8.3 Cards

Cards share:
- border language;
- radius language;
- shadow/elevation;
- padding family;
- content-driven height.

Do not create excessive fixed-height cards.

## 8.4 Tabs

Tabs must have:
- clear active state;
- accessible semantics;
- synchronized selected/content state;
- intentional narrow-screen behavior.

## 8.5 Accordions

FAQ accordions:
- use semantic buttons;
- expand naturally;
- preserve reading order;
- expose state accessibly;
- respect reduced motion.

## 8.6 Forms

Forms:
- use real labels;
- preserve field semantics;
- allow validation/error expansion;
- never depend on fixed height;
- remain usable at zoom and narrow widths.

---

# 9. Page-Specific Design Rules

## 9.1 Home Page

The approved Home/Home 2 visual hierarchy includes patterns such as:
- hero;
- workflow;
- industry cards;
- problem/solution;
- core features;
- plans;
- integrations;
- Why Quick OMS;
- pricing;
- FAQ;
- CTA;
- footer.

The current approved implementation notes may supersede older provisional
states where a later Figma pass resolved them.

### Why Quick OMS

At 1024px+ preserve the desktop split composition when usable:
- left copy;
- right blue comparison panel;
- three white comparison cards;
- connector/indicator treatment.

Do not let the panel become unnecessarily tall because cards are forced
to tablet dimensions.

### The Difference

Preserve the approved desktop comparison topology at 1024px+ unless Figma
explicitly shows a tablet state.

### Core Features

Use the currently approved Figma state. Do not resurrect older provisional
tab/panel behavior that has been superseded by a later Figma correction.

### Workflow

Repeated workflow cards must:
- use consistent height/padding;
- expand naturally for text;
- preserve connector relationships;
- reduce columns intentionally at narrow widths.

### Plans for Your Business

At 1024px+ preserve the desktop split structure when content remains usable:
- plan introduction on the left;
- plan switcher in the approved location;
- feature tiles on the right.

Reduce internal spacing/card dimensions before switching to a tablet stack.

### Integrations

The integrations section is a complex connected visual.

At 1024px+:
- preserve desktop topology;
- keep left and right integration nodes around the central hub;
- preserve the bottom custom-software relationship;
- resize nodes/gaps before stacking;
- keep connector lines aligned with anchors;
- prevent connectors from affecting document width.

Do not use the tablet centered-hub stack simply because the viewport is 1024px.

### CTA Band

Large blue CTA panels should remain visually proportional.

At narrower desktop widths:
- reduce internal padding;
- control heading measure;
- control description measure;
- reduce gaps;
- avoid excessive vertical height.

Do not use fixed height that creates large empty space.

### Footer

The large `QUICKOMS` wordmark is decorative and must align to the approved
footer container/line treatment without causing overflow.

---

# 10. Data-Dense Responsive Patterns

## 10.1 Comparison Tables

Choose one approved narrow-screen behavior:
- horizontal scrolling inside a dedicated container;
- transformed comparison cards;
- progressive grouped comparison.

Regardless:
- preserve associations;
- preserve highlighted recommendation;
- keep text readable;
- avoid page-level overflow.

## 10.2 Pricing Cards

At each range:
- cards retain useful width;
- CTAs remain aligned;
- feature lists remain visible;
- emphasis remains visible.

## 10.3 Forms

Paired fields use two columns only when each remains usable.

## 10.4 CTA Groups

Two actions:
- remain inline when readable and tappable;
- wrap/stack intentionally when needed;
- primary action remains visually dominant.

---

# 11. Interaction Rules

## 11.1 Hover

Hover is feedback, not required functionality.

## 11.2 Focus

Every interactive element has visible focus using the shared focus token.

## 11.3 Active and Selected

Active states should use more than a subtle color shift when clarity
requires it:
- underline;
- background;
- border;
- weight;
- icon/state change.

## 11.4 Motion and Prototype Fidelity

Motion is part of the design system when it communicates state, hierarchy,
continuity, feedback, or a Figma-defined interaction.

When approved prototype behavior exists:
- reproduce trigger;
- source/destination state;
- timing;
- easing;
- direction;
- perceived continuity.

When playback is unavailable, inspect available prototype metadata and state
frames and document assumptions.

### Smart Animate

Treat Smart Animate as visual intent, not literal production code.

Reproduce the visible result with appropriate web techniques.

### Component Motion

The same component family must use the same interaction language.

### Performance

Prefer transform and opacity when visually equivalent.

Animations must not:
- cause page overflow;
- create layout jumps;
- leave invalid states;
- block interaction unnecessarily.

### Reduced Motion

Respect `prefers-reduced-motion` while preserving function and final state.

---

# 12. Accessibility Design Rules

Target WCAG 2.2 AA minimum.

Required:
- text contrast;
- non-text contrast;
- visible focus;
- practical touch size;
- no color-only state;
- labels;
- readable zoomed text;
- no fixed text containers that clip;
- keyboard interaction;
- meaningful icon alternatives;
- accessible table relationships;
- reduced-motion support.

Do not approve a visual solution that depends on inaccessible tiny text.

---

# 13. Content Rules

Design for:
- longer navigation labels;
- longer headings;
- two-line card titles;
- errors;
- localization;
- variable prices;
- quote-based values;
- empty optional fields;
- unavailable integrations;
- future FAQ items.

Do not tune dimensions so tightly that realistic content breaks components.

---

# 14. Asset Rules

Use approved original assets.

For each image define:
- purpose;
- aspect ratio;
- crop behavior;
- responsive sizing;
- alt/decorative status.

Decorative grid backgrounds and oversized footer branding are visual
treatments, not essential content.

---

# 15. Consistency Checks

Before approval verify:

### Alignment
- header, hero, sections, CTA, and footer use the correct shared container.

### Typography
- same semantic role uses the same typography token unless a documented
  variant applies.

### Spacing
- repeated relationships use repeated spacing tokens.

### Buttons
- same variant means same visual and interaction behavior.

### Cards
- same family means same border/radius/elevation logic.

### Surfaces
- navy, blue gradient, light canvas, and accent roles remain stable.

### Responsive
- no page overflow;
- no clipped text;
- no overlap;
- no inaccessible tiny controls;
- no accidental tablet composition at 1024px+;
- no unexplained topology changes.

### Accessibility
- focus visible;
- keyboard paths work;
- labels/states are clear.

---

# 16. Figma MCP Handoff Checklist

When Figma links are supplied, inspect and map:
- file/page/frame identifiers;
- variables and collections;
- color styles;
- typography styles;
- spacing values;
- component definitions;
- component variants;
- auto-layout behavior;
- constraints;
- grid settings;
- assets;
- desktop/tablet/mobile frames;
- hidden/conditional layers;
- prototype interactions where they affect behavior.

For each extracted value:
1. classify it as primitive, semantic, component, layout, or page-specific;
2. reuse an existing token where possible;
3. add a token only when the role is genuinely new;
4. avoid copying raw values into many components;
5. record responsive behavior separately from appearance.

---

# 17. Final Design Acceptance Criteria

The QuickOMS website is accepted only when:
- all reference pages share one coherent design system;
- Figma values are mapped to reusable variables;
- components are reused consistently;
- responsive behavior is intentional at mobile, tablet, desktop, and
  intermediate widths;
- 1024px behaves as desktop/laptop unless Figma explicitly says otherwise;
- navigation remains usable;
- forms remain usable/accessibile;
- pricing/comparison remains readable;
- CTA hierarchy remains consistent;
- footer remains stable and overflow-free;
- typography wraps naturally;
- no screenshot-specific layout hacks are required;
- the visual system can support future pages.

---

# 18. Existing Project Implementation Notes

These notes preserve the implementation decisions already recorded during
the Home, Pricing, Compare, FAQ, and Contact work.

## 18.1 Home Page Implementation Notes

Confirmed project conventions include:
- `color.text.accent` normalized to the approved warm accent;
- `color.text.muted` uses the shared muted role;
- card/list borders use distinct documented shades where Figma confirms
  different roles;
- primary actions use the approved brand gradient;
- comparison negative/positive surfaces use distinct semantic roles;
- the header uses the approved dark structural surface.

The Home 2 hierarchy includes:
1. Hero
2. Order Workflow
3. Industry
4. Problem / Solution
5. Core Features
6. Flexible Plans
7. Integrations
8. Why Quick OMS
9. Pricing
10. FAQ
11. CTA Band
12. Footer

Later Figma correction passes supersede earlier provisional states where
documented.

## 18.2 Home Correction Pass

The approved Core Features state was corrected after later Figma inspection.
Do not restore the older provisional four-way tab implementation when the
newer approved state exists.

The Workflow section position and supporting copy were also corrected to the
approved Figma order.

## 18.3 Small Mobile Notes

At approximately 320–375px:
- page gutter is intentionally compact;
- headings wrap naturally;
- non-semantic `<br>` elements may be suppressed where documented;
- cards become single-column where required;
- CTA buttons become touch-friendly;
- horizontal tracks are allowed only when intentionally designed;
- decorative mockups may reduce secondary demo content;
- minimum readable text is preferred over screenshot scaling.

## 18.4 Pricing Notes

Pricing uses:
- Lite;
- Premium;
- Enterprise.

Premium is visually emphasized where approved.

Common Questions may contain provisional answer content when Figma designs
only the collapsed state. Such content must be clearly marked in project
notes and replaced when real Figma content exists.

## 18.5 Compare Notes

The Compare page uses a dedicated vendor comparison pattern where its visual
grammar differs from Pricing's matrix.

A documented copy correction for the comparison heading must not be silently
reverted if a later Figma pull still contains the known copy-paste artifact.

## 18.6 FAQ Notes

FAQ category navigation reuses the established tab family where the visual
system is confirmed equivalent.

FAQ answers that are not designed in Figma are provisional and must not be
represented as Figma-confirmed copy.

## 18.7 Contact Notes

Contact uses:
- enquiry form;
- process panel;
- contact details panel.

Known implementation decisions include:
- real input/select semantics;
- explicit required fields;
- accessible validation;
- responsive stacking;
- `min-width: 0` on grid children where required to prevent grid overflow;
- real image elements for local decorative assets where CSS mask/background
  loading is unreliable in the project's file-based verification setup.

---

# 19. Responsive QA Contract

For every new page or major change, compare Figma/local output at:

- 1440px;
- 1280px;
- 1200px;
- 1152px;
- 1100px;
- 1024px;
- 960px;
- 900px;
- 768px;
- 767px;
- 480px;
- 375px;
- 320px.

At 1024px explicitly ask:

> Is this supposed to be the desktop composition?

If Figma does not show a tablet composition, the answer is **yes**.

---

# 20. Regression Protection Contract

When fixing one section:
- inspect shared selectors first;
- scope the fix;
- verify the same component on other pages;
- compare 1024 and 1440 after the fix;
- compare at least one mobile width;
- remove obsolete CSS;
- do not leave contradictory breakpoint rules.

A fix is not complete if it only makes one screenshot look correct.

---

# 21. Known Responsive Failure Modes to Prevent

Never repeat these patterns:

1. Treating 1024px laptop as tablet.
2. Switching a complex desktop diagram to a tablet stack at 1024px without
   Figma evidence.
3. Making blue CTA/visual panels excessively tall because of oversized
   fixed padding.
4. Allowing headings to gain an unintended extra line because the content
   measure is too narrow.
5. Giving repeated cards excessive fixed height.
6. Allowing right-side card whitespace to grow unnecessarily.
7. Hiding essential navigation because a viewport is narrow.
8. Creating multiple selected icon states when selection does not change
   content.
9. Using global CSS changes to fix one section.
10. Using arbitrary 1100/1150/1200px breakpoints simply because a layout is
    inconvenient.
11. Fixing one breakpoint while causing a regression at another.
12. Shrinking typography below a readable size to preserve a screenshot
    composition.

---

# 22. Production Principle

The objective is not:

> "Make every screenshot fit."

The objective is:

> "Build a reusable QuickOMS design system that behaves like the approved
> Figma design across real viewport sizes."

When Figma provides a responsive state, follow it.

When Figma does not provide one, preserve the approved information
architecture and topology, then adapt progressively and safely.
