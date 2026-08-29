## 11.4 Motion and Prototype Fidelity

Motion is part of the design system when it communicates state, hierarchy,
continuity, feedback, or a Figma-defined interaction.

When approved Figma prototype behavior exists, the implementation must
reproduce the observed interaction intent rather than inventing a generic
transition.

For each reusable motion pattern, define where applicable:

- trigger;
- source state;
- destination state;
- duration;
- delay;
- easing;
- animated properties;
- interruption behavior;
- reverse behavior;
- reduced-motion behavior.

Motion should be:

- intentional;
- functional;
- consistent;
- non-blocking;
- performant;
- interruptible where users can rapidly change state.

Use shared motion tokens for recurring timing and easing values.

Do not introduce random page-specific animation values when an existing
motion token or approved Figma behavior applies.

### Prototype Verification

When the available Figma integration supports prototype playback, inspect
the interaction in playback before implementation.

When playback is unavailable, inspect all available:

- prototype interactions;
- component variants;
- state frames;
- interaction metadata;
- source/destination connections.

Do not state that playback was verified unless it was actually observed.

### Figma Smart Animate

Smart Animate must be interpreted as the intended visual transition.

Do not attempt to reproduce Figma internals literally.

Instead reproduce the visible result using appropriate production
animation techniques while preserving:

- trigger;
- state transition;
- timing;
- easing;
- direction;
- perceived continuity.

### Component Motion

Reusable components must have consistent interaction behavior.

Examples:

- the same button variant uses the same hover/press transition;
- the same tab family uses the same selection transition;
- the same accordion family uses the same expand/collapse behavior;
- the same overlay family uses the same entry/exit behavior.

Do not create a different animation language for each page.

### Performance

Prefer transform and opacity when they accurately reproduce the approved
motion.

Avoid unnecessary animation of expensive layout properties.

Animations must not:

- cause page-level overflow;
- create visible layout jumps;
- leave elements stuck between states;
- block user interaction unnecessarily;
- continue after the component is no longer relevant.

### Reduced Motion

All non-essential motion must have a reduced-motion behavior.

The reduced-motion version must preserve:

- functionality;
- state clarity;
- interaction feedback;
- final visual state.