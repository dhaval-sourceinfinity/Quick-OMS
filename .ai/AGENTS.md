# AGENTS.md

# QuickOMS Website Implementation Contract

## 1. Purpose

This document defines the rules for any agent or developer implementing the
QuickOMS marketing website from approved Figma MCP data and supplied visual
reference snapshots.

The goal is not to reproduce one screenshot at one viewport. The goal is to
build a coherent, reusable, responsive website that preserves the same visual
system, information hierarchy, interaction model, and component behavior
across all supported pages and device sizes.

Primary reference order:

1. Approved Figma MCP data and linked design nodes.
2. Page-specific design specifications in `DESIGN.md`.
3. Supplied reference snapshots.
4. Existing approved project conventions.

If sources conflict, do not silently mix them. Treat Figma as the source of
truth for exact approved design values once available. Use snapshots to
validate composition, hierarchy, and visual intent.

---

## 2. Non-Negotiable Implementation Rules

- Build from reusable primitives and components, not page-specific duplicated markup.
- Use semantic HTML first. Add ARIA only where native semantics are insufficient.
- Keep content, structure, styling rules, and interaction behavior separable.
- Do not hard-code a desktop screenshot layout.
- Do not use absolute positioning for normal document flow, responsive section layout, cards, tables, forms, or footer content.
- Do not use arbitrary one-off values when an existing design token or component rule applies.
- Do not introduce a second visual language on a later page.
- Do not use device-specific hacks to match a single screenshot.
- Do not create duplicate mobile and desktop markup unless interaction semantics genuinely require separate controls.
- Preserve the same component identity across pages.
- Do not infer missing Figma values as permanent tokens. Mark them provisional until verified.
- Do not change copy, labels, plan names, navigation names, comparison terminology, or CTA wording unless explicitly requested or a clear factual/copy error is documented.
- Do not use image text where semantic text is required.
- Do not rely on hover-only interactions for important functionality.
- Do not hide essential information solely because the viewport is narrow. Reflow, group, scroll intentionally, or provide an equivalent accessible presentation.
- Do not add decorative visual effects not present in the approved design system.
- Do not optimize for one browser by breaking standards-compliant behavior elsewhere.

---

## 3. Source-of-Truth Workflow

For every page or Figma link:

1. Identify the Figma file, page, frame, section, component, and variant being implemented.
2. Extract or verify:
   - viewport/frame dimensions;
   - page grid and content container;
   - typography styles;
   - color values;
   - spacing values;
   - radii;
   - borders;
   - shadows;
   - assets and icons;
   - component variants;
   - desktop, tablet, and mobile states if available;
   - prototype interactions and motion where available.
3. Map extracted values to existing tokens before creating new tokens.
4. Record any new reusable value in `DESIGN.md` before using it broadly.
5. Build the page from existing primitives.
6. Compare implementation against the reference at matching viewport sizes.
7. Test intermediate widths, not only design breakpoints.
8. Test keyboard, touch, zoom, reduced-motion, and overflow behavior.
9. Resolve root causes. Do not patch symptoms with unrelated local overrides.

When a Figma value is unavailable:
- use the nearest established token;
- do not create a random local value;
- document the assumption;
- keep the assumption easy to replace when Figma data arrives.

---

## 4. Architecture Rules

### 4.1 Layering

Use this conceptual hierarchy:

1. **Foundations**
   - design tokens;
   - typography;
   - layout rules;
   - accessibility defaults.
2. **Primitives**
   - container;
   - stack;
   - cluster/inline group;
   - grid;
   - section;
   - surface.
3. **UI components**
   - header;
   - navigation;
   - button;
   - card;
   - badge;
   - tab;
   - accordion;
   - input/select/textarea;
   - pricing card;
   - comparison table;
   - feature item;
   - CTA band;
   - footer.
4. **Patterns**
   - hero;
   - feature grid;
   - workflow strip;
   - integration diagram;
   - pricing matrix;
   - FAQ layout;
   - contact form layout.
5. **Pages**
   - compose approved patterns;
   - contain minimal page-only styling;
   - never redefine global component behavior.

### 4.2 Reuse Rule

If a visual pattern appears twice or is likely to appear on another page,
treat it as a reusable component or pattern.

If a value appears repeatedly, treat it as a candidate token.

If a one-off implementation starts accumulating exceptions, stop and fix the
abstraction instead of adding more exceptions.

---

## 5. Naming and Consistency Rules

Use names based on purpose, not appearance.

Good categories:
- `surface-primary`
- `surface-inverse`
- `text-primary`
- `text-muted`
- `action-primary`
- `action-secondary`
- `border-subtle`
- `section-hero`
- `card-pricing`
- `card-feature`
- `cta-primary`

Avoid names tied to temporary appearance or screenshots:
- `blue-2`
- `home-button`
- `desktop-gap`
- `faq-fix`
- `mobile-card-3`

Component variants must be explicit and finite.

Page classes must not override shared components unless the page truly
defines a documented variant.

---

## 6. Responsive Engineering Rules

### 6.1 Mobile Is a Real Layout

Mobile is not a compressed desktop screenshot.

At narrow widths, reassess:
- navigation;
- reading order;
- grid column count;
- table behavior;
- form field grouping;
- CTA placement;
- tap target size;
- text wrapping;
- section density;
- horizontal overflow.

The correct question is not "how can the desktop layout fit?" It is
"what is the same information architecture in the available space?"

### 6.2 Breakpoint Strategy

Required validation ranges:

- 320–374: compact mobile;
- 375–479: standard mobile;
- 480–767: large mobile / small tablet;
- 768–1023: tablet;
- 1024–1439: desktop / laptop;
- 1440+: wide desktop.

These are validation ranges, not permission to add arbitrary breakpoints.

### 6.3 Laptop/Desktop Rule — Important

For QuickOMS, **1024px and above is desktop/laptop behavior unless Figma
explicitly defines a different responsive composition**.

Do not automatically switch a section to a tablet composition at 1100px,
1150px, 1200px, or another intermediate width.

At 1024–1439px, prefer progressive compression:
- reduce gaps;
- reduce container padding;
- reduce card dimensions;
- reduce internal spacing;
- allow natural text wrapping;
- use approved fluid typography.

Do not change the structural topology merely because the viewport is narrower.

A topology change is allowed only when:
1. Figma explicitly shows it;
2. the desktop composition becomes genuinely unusable; or
3. a documented component-specific constraint requires it.

### 6.4 Section-Specific Responsive Behavior

Responsive behavior is allowed to differ by component when content
constraints require it.

However, a component-specific breakpoint must:
- have a concrete reason;
- be scoped to that component;
- be documented;
- not redefine the global meaning of a breakpoint.

Example: the shared header may collapse at 1180px if its logo, seven
navigation links, and CTA cannot remain usable. That does not mean every
other section should become tablet at 1180px.

### 6.5 Responsive Compression Rule

Before changing topology, try in this order:

1. fluid width;
2. reduced gap;
3. reduced container padding;
4. controlled typography reduction;
5. natural text wrapping;
6. card resizing;
7. controlled internal spacing;
8. only then a structural breakpoint if required.

Never use a breakpoint simply because it makes CSS easier.

### 6.6 Text Wrapping Rule

Typography must match Figma's intended hierarchy and approximate line count
at the corresponding viewport.

When Figma clearly shows a heading on two or three lines:
- preserve the intended content measure;
- use the correct font family/weight/size;
- do not add arbitrary `<br>` tags solely to force a screenshot;
- do not allow an incorrect container width to create extra lines;
- do not shrink text excessively just to keep one line.

If a line break is a deliberate Figma design decision, it may be encoded
explicitly. Otherwise prefer natural wrapping.

### 6.7 Card and Component Height Rule

Cards should be content-driven unless Figma explicitly defines a fixed
height.

Do not:
- add excessive fixed height;
- hide overflow;
- stretch cards because another card is taller;
- leave large unused vertical space;
- allow one wrapped description to make every card unnecessarily tall.

For repeated card families, use consistent padding and minimum dimensions,
then allow content to expand naturally.

### 6.8 Overflow and Clipping Rule

No page-level horizontal overflow is allowed.

Check for:
- clipped headings;
- clipped buttons;
- clipped card text;
- overflowing diagrams;
- fixed-width children;
- grid items with `min-width:auto`;
- absolute decorative elements affecting document width.

An explicitly designed internal scroll region is acceptable when documented.

### 6.9 Complex Diagram Rule

For connected illustrations such as the Integrations section:

- preserve the approved desktop topology at 1024px+ unless Figma shows another state;
- do not collapse a desktop connected diagram into a centered tablet stack merely because the viewport is 1024px;
- preserve connection relationships, anchors, and visual hierarchy;
- resize nodes and gaps before changing topology;
- if topology must change, use a documented responsive variant;
- connector lines must never create page overflow;
- decorative connectors must not become interactive controls.

### 6.10 Dashboard Preview Rule

The hero dashboard mockup is a decorative visual unless explicitly stated
otherwise.

At 1024px+ keep the desktop sidebar/composition when the approved design
requires it.

For tablet/mobile, use the documented compact representation rather than
simply shrinking all internal text to unreadable sizes.

A decorative mockup may omit secondary demo content at very small widths
when that is explicitly documented; real page content must not be hidden
this way.

### 6.11 Navigation and Multi-Selection Rule

For icon navigation inside a decorative dashboard/mockup:
- do not make multiple unrelated icons appear simultaneously selected;
- if selection does not change content, use one clearly active item or
  make the visual rail non-interactive;
- do not create misleading interaction affordances.

For real navigation:
- only the current destination is active;
- active state must be visually obvious;
- clicking another destination updates the active state and/or navigates.

### 6.12 Scoped Responsive CSS Rule

When fixing a responsive problem:
- scope selectors to the affected component/section;
- do not modify generic selectors unless the behavior is truly global;
- inspect cascade and specificity before adding `!important`;
- remove obsolete overrides when the root cause is fixed;
- verify all other pages using the same component.

Avoid global fixes such as changing every `h2`, `.card`, `.container`, or
`.section` to solve one section.

---

## 7. Typography Rules

Typography is a system, not individual font-size guesses.

Define and use semantic roles:
- display;
- page title;
- section title;
- card title;
- body;
- small body;
- label;
- navigation;
- button;
- eyebrow/meta;
- legal/footer text.

Each role must define or inherit:
- font family;
- weight;
- size;
- line-height;
- letter spacing where required;
- responsive behavior.

Rules:
- do not use fixed heights around text;
- prefer natural wrapping;
- headings must remain readable at narrow widths;
- use consistent hierarchy;
- do not skip heading levels for visual convenience;
- labels and body text must preserve readable contrast and line height;
- truncation is allowed only where explicitly supported and the full value
  remains accessible.

---

## 8. Spacing Rules

All spacing must come from a defined spacing scale.

Use spacing by relationship:
- text-to-text;
- label-to-control;
- item-to-item;
- card internal padding;
- card-to-card gap;
- section internal spacing;
- section-to-section spacing.

Do not use visually similar but numerically unrelated gaps across pages.

Section spacing may have responsive variants, but those variants must be
shared and documented.

---

## 9. Surface and Visual Rules

The site uses:
- dark navy structural surfaces;
- blue gradient hero and CTA surfaces;
- light neutral content surfaces;
- restrained borders;
- soft elevated cards;
- subtle grid-line decoration inside approved blue surfaces;
- strong light text on dark surfaces;
- restrained warm accent for eyebrows and emphasis;
- one clearly dominant primary action per context.

Do not create page-specific versions of the same navy/blue without a token.

Decorative grid lines are background treatment, not layout structure.

---

## 10. Header and Navigation Rules

The header is a shared site component.

It must define:
- logo behavior;
- desktop navigation;
- active-page treatment;
- primary CTA;
- mobile navigation behavior;
- keyboard behavior;
- focus behavior;
- overlay/background behavior if the header changes state.

Responsive rules:
- desktop navigation must not silently overflow;
- at the documented navigation threshold, switch to an intentional compact
  control;
- mobile navigation must expose the same primary destinations unless
  intentionally documented otherwise;
- the menu trigger needs an accessible name and state;
- opening/closing must manage focus appropriately;
- Escape closes an open overlay/menu where applicable;
- background scrolling must be handled intentionally.

The current QuickOMS implementation has a documented header exception:
the navigation may collapse around **1180px** because the logo, seven nav
links, and CTA otherwise become crowded. This is a header-only exception,
not a global tablet breakpoint.

---

## 11. Button and CTA Rules

Use a finite button system:
- primary;
- secondary;
- inverse/outline where required;
- text/link style where required.

Each variant defines:
- default;
- hover;
- focus-visible;
- active;
- disabled;
- loading if asynchronous;
- responsive sizing.

Buttons must remain usable and must not depend on icons alone.

---

## 12. Forms

Form requirements:
- every input has a programmatic label;
- placeholders are not labels;
- required/optional state is explicit;
- input type matches expected data;
- autocomplete is used where appropriate;
- validation errors are tied to the relevant field;
- validation does not rely on color alone;
- controls support keyboard and touch;
- focus order follows logical order;
- field groups collapse predictably;
- duplicate submission is prevented where appropriate;
- async submission communicates progress/result.

Do not use fixed form heights that break when errors appear.

---

## 13. Tabs and Accordions

### Tabs

Use a true tab pattern only when the interaction is semantically a tab.

Requirements:
- one active tab is clear;
- keyboard behavior is correct;
- active state is not color-only;
- selected control and displayed content remain synchronized;
- all tab choices remain accessible at narrow widths.

If tabs cannot fit, use wrapping, horizontal scrolling, or another
documented accessible pattern. Never clip labels.

### Accordions

FAQ items use semantic interactive controls.

Requirements:
- clear expanded/collapsed state;
- keyboard operation;
- visible focus;
- answer remains in reading order;
- icon state is consistent;
- motion respects reduced motion.

---

## 14. Tables and Comparison Data

Pricing and competitor comparison require deliberate responsive behavior.

Rules:
- desktop uses the full comparison structure;
- relationships remain understandable at every size;
- highlighted columns retain meaning;
- checkmarks, blanks, limits, and labels are accessible;
- critical information is not reduced to unexplained icons;
- narrow layouts use a deliberate strategy:
  - horizontal scroll with preserved headers;
  - card/row transformation; or
  - another approved accessible representation.

Do not scale tables until text becomes unreadable.

If horizontal scrolling is used:
- the scroll area is discoverable;
- page-level horizontal scrolling does not occur;
- keyboard users can reach the content;
- sticky headers/columns do not obscure data.

---

## 15. Pricing Rules

Pricing cards and add-on cards are shared data presentation patterns.

Each plan card supports:
- name;
- summary;
- price model;
- CTA;
- feature list;
- optional emphasis;
- unavailable/quote-based pricing;
- responsive equalization without clipping.

Do not equalize card heights by hiding overflow.

---

## 16. Image and Asset Rules

- Use approved original assets from Figma or the project asset library.
- Preserve aspect ratio.
- Define responsive image behavior per component.
- Reserve intended media dimensions to reduce layout shift.
- Use meaningful alternative text for informative images.
- Use empty alternative text only for truly decorative images.
- Do not duplicate a visual asset when one shared source can serve multiple pages.
- Icons must come from one approved icon system/source.
- Decorative warehouse and integration visuals in snapshots are not mandatory
  if Figma supplies structured assets.

---

## 17. Footer Rules

The footer is a shared global component.

It includes, where approved:
- brand block;
- contact details;
- grouped navigation;
- legal text;
- oversized decorative brand wordmark;
- supporting product tagline.

Responsive rules:
- columns may stack/regroup;
- reading order remains logical;
- oversized decorative text never causes horizontal overflow;
- contact links remain interactive and accessible;
- footer alignment uses the shared container system.

---

## 18. Accessibility Baseline

Target WCAG 2.2 AA unless product requirements specify a stricter target.

Required:
- semantic landmarks;
- logical heading order;
- keyboard access;
- visible focus;
- adequate text/control contrast;
- no color-only state;
- meaningful form labels/errors;
- accessible names for icon-only controls;
- correct interactive semantics;
- reduced-motion support;
- zoom/reflow support;
- touch targets suitable for touch devices;
- no keyboard traps except intentionally managed modal focus traps;
- no unexpected focus movement;
- correct language metadata;
- accessible table relationships;
- accessible menu/tab/accordion states.

Test at browser zoom and text scaling. A layout that only works at 100%
is not responsive.

---

## 19. Performance Rules

- Prefer simple layout primitives over excessive nesting.
- Avoid unnecessary client-side rendering for static content.
- Load only assets needed by the page.
- Reserve media dimensions to reduce layout shift.
- Prefer transform/opacity for animation when equivalent.
- Respect reduced motion.
- Avoid large decorative assets on mobile when they do not materially
  contribute.
- Do not load duplicate font files or icon libraries.
- Treat header, hero, and primary CTA as high-visibility rendering areas.

Performance optimization must not remove required accessibility or content.

---

## 20. Browser and Device Validation

Validate at minimum:
- current Chromium-based browser;
- current Safari where supported;
- current Firefox where supported;
- iOS Safari;
- Android Chrome.

Test:
- portrait and landscape where relevant;
- mouse;
- keyboard;
- touch;
- high zoom;
- reduced motion;
- long content;
- empty optional content;
- validation errors;
- slow-loading images;
- narrow and wide intermediate widths.

---

## 21. Visual QA Procedure

For each page:

1. Match the reference viewport.
2. Compare header height and alignment.
3. Compare hero hierarchy and content width.
4. Compare section rhythm.
5. Compare card proportions and internal spacing.
6. Compare typography hierarchy.
7. Compare border/radius/shadow consistency.
8. Compare CTA prominence.
9. Compare footer structure.
10. Repeat at mobile, tablet, 1024px laptop, and intermediate widths.
11. Check:
    - horizontal overflow;
    - clipped text;
    - overlapping content;
    - unexpected line breaks;
    - uneven repeated components;
    - inconsistent token use;
    - inaccessible controls;
    - accidental topology changes.

Fix systemic issues before local visual differences.

---

## 22. Definition of Done

A page is complete only when:
- approved Figma structure is implemented;
- values map to documented tokens or documented exceptions;
- desktop and mobile are intentional layouts;
- 1024–1439px preserves desktop/laptop topology unless Figma says otherwise;
- intermediate widths are stable;
- shared components use common implementations;
- no page-level horizontal overflow exists;
- forms and interactive controls are accessible;
- keyboard behavior is tested;
- visible focus is present;
- comparison data remains usable on narrow screens;
- decorative elements do not block content;
- text is not clipped;
- no screenshot-specific hacks remain;
- visual QA is completed against approved references.

---

## 23. Agent Decision Rules

When uncertain:
- prefer reuse over duplication;
- prefer semantic structure over visual imitation;
- prefer a documented token over a local value;
- prefer fluid layout over fixed screenshot dimensions;
- prefer content safety over perfect one-width alignment;
- prefer fixing the component system over patching one page;
- preserve desktop topology at 1024px+ unless Figma explicitly shows otherwise;
- use section-specific breakpoints only when a real content constraint requires them;
- verify Figma before inventing a responsive variant.

Do not ask for confirmation for ordinary implementation decisions already
covered by this contract. Ask only when the missing decision changes product
behavior, content, information architecture, or the approved visual system.

---

# 3A. Figma Prototype and Animation Verification

Figma is not only a source for static appearance. When a supplied Figma file
contains prototype behavior, interactions, animated transitions, component
states, or motion, that behavior is part of the implementation contract
unless explicitly marked decorative or out of scope.

### Prototype-First Rule

Before implementing an interactive Figma section:

1. Inspect the target page/frame and relevant components and variants.
2. Inspect prototype interactions and connections.
3. When prototype playback is supported, run the relevant flow before
   implementation.
4. Observe click/tap, hover, focus, tabs, menus, accordions, overlays, and
   navigation.
5. Record the observed behavior before writing implementation code.

Do not implement only the final visual state when the approved prototype
defines a transition between states.

### Playback Capability Rule

Do not claim Play mode verification unless the prototype was actually played.

If playback is unavailable:
- inspect prototype metadata;
- inspect variants and state frames;
- inspect source/destination connections;
- compare source and destination states where necessary.

If timing/easing/intermediate states cannot be verified, mark them as
implementation assumptions.

### Interaction Extraction Checklist

For every meaningful interaction determine:
- trigger;
- source state;
- destination state;
- whether content, navigation, selection, or presentation changes;
- transition type;
- duration;
- delay;
- easing;
- direction/path;
- opacity;
- scale;
- transform/position;
- size;
- color/background;
- border/shadow;
- overlay behavior;
- reversibility;
- rapid-repeat behavior;
- desktop versus touch behavior.

Treat Smart Animate as visual intent, not production code.

### Fidelity Rule

Match, where available:
- trigger behavior;
- interaction sequence;
- source/destination state;
- timing;
- delay;
- easing;
- perceived speed;
- movement direction;
- opacity;
- scale;
- state synchronization.

Do not replace a designed transition with an unrelated generic fade, slide,
bounce, or spring.

### State Completeness Rule

Inspect and implement all relevant states:
- default;
- hover;
- focus-visible;
- active/pressed;
- selected;
- open/expanded;
- closed/collapsed;
- disabled where applicable;
- loading where applicable;
- success/error where applicable;
- all documented component variants.

### Hover and Press Rules

When Figma defines hover/pressed behavior, reproduce the visual state and
transition while providing equivalent keyboard/touch behavior.

Avoid excessive hover movement that causes layout shift.

### Tabs and State-Switching Rules

For animated tabs or segmented controls:
- use one source of truth for active state;
- keep selected control and displayed content synchronized;
- reproduce outgoing/incoming transition;
- handle rapid switching safely;
- preserve keyboard accessibility;
- do not reset unrelated state;
- ensure the final state remains correct if animation is interrupted.

### Menus, Accordions, and Overlays

Reproduce both opening and closing behavior.

Ensure:
- DOM/accessibility state is correct;
- `aria-expanded` and related state are synchronized;
- Escape works where required;
- focus management is correct;
- overlapping animations cannot leave invalid state.

### Implementation Technology Rule

Prefer:
1. CSS transitions;
2. CSS keyframes;
3. the existing project animation solution;
4. a motion library only when genuinely required.

Do not add a new animation library for simple hover, opacity, color,
transform, or tab-indicator transitions.

### Responsive Motion Rule

Check whether hover exists, whether touch changes the interaction, whether
motion remains clear on narrow layouts, and whether overlays need a different
direction.

### Reduced-Motion Rule

Respect `prefers-reduced-motion`.

Remove or reduce non-essential movement while preserving functionality,
state clarity, interaction feedback, and final state.

### Animation QA Rule

For each meaningful interaction:
1. verify initial state;
2. trigger;
3. verify motion starts;
4. verify intermediate behavior where visible;
5. verify final state;
6. reverse where applicable;
7. repeat rapidly where reasonable;
8. test mouse;
9. test keyboard;
10. test touch where relevant;
11. test reduced motion;
12. confirm no clipping, overlap, layout shift, stuck state, or incorrect
    accessibility state.

---

# 3B. Responsive Breakpoint and Figma Layout Rules

This section is the project-level guardrail for the responsive issues found
during implementation.

### Laptop/Desktop Composition

**1024px is a desktop/laptop breakpoint for QuickOMS.**

At 1024–1439px:
- preserve desktop information architecture;
- preserve desktop topology where usable;
- compress dimensions rather than switching to tablet structure;
- do not automatically stack desktop diagrams;
- do not replace desktop cards with tablet cards;
- do not hide desktop content without an approved reason.

### Figma Wins

If Figma contains an explicit 1024px, laptop, tablet, or mobile frame,
follow that frame.

If Figma does not define a separate state:
- preserve the existing desktop composition at 1024px+;
- adapt fluidly;
- introduce topology changes only when necessary and documented.

### Section Examples

For the current QuickOMS patterns:
- **Why Quick OMS**: preserve the desktop split composition at 1024px+.
- **The Difference**: preserve the desktop comparison structure when usable.
- **Core Features**: preserve approved desktop feature composition at 1024px+.
- **Plans for Your Business**: preserve the desktop split layout at 1024px+
  when content remains usable.
- **Integrations**: preserve the connected desktop diagram at 1024px+;
  do not use the tablet centered-stack topology merely because width is 1024.
- **CTA/blue panels**: reduce dimensions/gaps before creating excessive
  vertical height.

These are responsive implementation guardrails, not replacements for an
explicit Figma responsive state.

### Responsive QA Matrix

Every new or substantially changed page must be checked at:
- 1440;
- 1280;
- 1200;
- 1152;
- 1100;
- 1024;
- 960;
- 900;
- 768;
- 767;
- 480;
- 375;
- 320.

At 1024 specifically verify:
- desktop header/composition;
- desktop section topology;
- card/grid structure;
- typography;
- section spacing;
- no accidental tablet composition;
- no excessive vertical whitespace;
- no overflow.

### Regression Protection

A fix is incomplete if it improves one viewport while breaking another.

After every responsive change:
- check the affected component at 1024, 1440, and mobile;
- inspect nearby sections;
- verify shared components;
- remove obsolete overrides;
- do not trade one breakpoint defect for another.

---

# 3C. Figma-to-Code Visual Fidelity Rules

When implementing a new page, use Figma as the visual contract.

Compare:
- section order;
- section height;
- content width;
- horizontal alignment;
- vertical rhythm;
- heading line count;
- typography scale;
- card dimensions;
- card spacing;
- image/visual scale;
- border radius;
- borders;
- shadows;
- background treatment;
- CTA dimensions;
- navigation behavior;
- responsive topology.

If local implementation differs from Figma, determine whether the difference
is intentional responsive behavior or an implementation defect.

Do not normalize a defect because it looks acceptable at one viewport.

### Regression Protection

When fixing one section:
- inspect nearby sections before changing shared styles;
- prefer scoped changes;
- verify desktop and responsive states;
- do not use `!important` unless the cascade genuinely requires it and the
  reason is documented;
- verify no shared component regresses.

---

# 4. Project-Specific Implementation Notes

The current project records implementation decisions and verified exceptions
in the relevant design notes. Agents must read those notes before modifying
existing patterns.

Important existing conventions include:
- the shared header navigation has a documented ~1180px collapse exception;
- the hero dashboard preview has a documented compact tablet/mobile behavior;
- the decorative dashboard mockup is not the real application;
- real page content and decorative mockup content must be treated differently;
- Figma copy errors that have been deliberately corrected are not to be
  silently reverted;
- provisional Figma states must remain clearly documented;
- verified Figma assets should be reused rather than redrawn.

