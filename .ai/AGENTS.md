## 3A. Figma Prototype and Animation Verification

Figma is not only a source for static appearance. When a supplied Figma
file contains prototype behavior, interactions, animated transitions,
component states, or motion, that behavior is part of the implementation
contract unless explicitly marked decorative or out of scope.

### Prototype-First Rule

Before implementing an interactive Figma section:

1. Inspect the target page/frame and all relevant components and variants.
2. Inspect prototype interactions and connections available through the
   Figma integration.
3. When prototype playback/Play mode is supported by the available tool,
   run and exercise the relevant prototype flow before implementation.
4. Observe the interaction as a user would:
   - click/tap;
   - hover;
   - press;
   - focus;
   - change tabs;
   - open/close menus;
   - expand/collapse accordions;
   - trigger overlays;
   - navigate between connected states.
5. Record the observed behavior before writing implementation code.

Do not implement only the final visual state when the approved Figma
prototype defines a transition between states.

### Playback Capability Rule

Do not assume that every Figma MCP or integration can play the Figma
prototype.

If prototype playback is available:
- inspect the actual flow;
- observe the source and destination states;
- observe the visible motion;
- use the observed interaction as the primary motion reference.

If prototype playback is unavailable:
- inspect all available prototype metadata;
- inspect component variants and state frames;
- inspect interaction connections, triggers, actions, and destinations
  where exposed;
- compare source and destination screenshots/frames where necessary.

Never claim that an animation was verified in Play mode unless the
prototype was actually played.

If timing, easing, or an intermediate motion state cannot be verified,
mark that value as an implementation assumption rather than presenting
it as a confirmed Figma value.

### Interaction Extraction Checklist

For every meaningful interaction, determine:

- trigger:
  - click/tap;
  - hover;
  - mouse enter/leave;
  - press;
  - focus;
  - keyboard action;
  - page load;
  - scroll;
  - delayed/automatic trigger where explicitly designed;

- source state;
- destination state;
- whether the interaction changes content, navigation, selection, or
  presentation only;
- transition type;
- duration;
- delay;
- easing/curve;
- direction or movement path;
- opacity changes;
- scale changes;
- transform/position changes;
- size changes;
- color/background changes;
- border/shadow changes;
- overlay behavior;
- whether the transition is reversible;
- whether repeated rapid interaction must interrupt or restart motion;
- desktop versus touch behavior.

Treat Smart Animate as a description of visual intent, not as production
code. Reproduce the observed motion using appropriate web technology.

### Fidelity Rule

The production implementation should reproduce the user's visible
experience as closely as practical.

Match, where available:

- trigger behavior;
- interaction sequence;
- source and destination state;
- timing;
- delay;
- easing;
- perceived speed;
- movement direction;
- fade/opacity behavior;
- scale behavior;
- state synchronization.

Do not replace a designed transition with an unrelated generic animation
such as a random fade, slide, bounce, or spring.

Do not add decorative motion that is not present in the approved design
or required for functional feedback.

### State Completeness Rule

For every interactive component, inspect and implement all relevant
states available in Figma:

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

Do not infer that the first visible Figma state is the only state.

### Hover and Press Rules

When Figma defines hover or pressed behavior:

- reproduce the visual state;
- reproduce the transition into and out of the state;
- keep the effect consistent across the same component family;
- do not make hover the only way to access functionality;
- provide equivalent functional behavior for keyboard and touch users.

Hover effects may use changes such as:

- background;
- border;
- shadow;
- opacity;
- transform;
- icon position;
- underline;
- scale;

only when those effects are present in, or clearly required to reproduce,
the approved interaction behavior.

Avoid excessive hover movement that causes layout shift.

### Tabs and State-Switching Rules

When Figma shows animated tab or segmented-control switching:

- use one source of truth for active state;
- keep the selected control and displayed content synchronized;
- reproduce the intended outgoing/incoming transition;
- handle rapid repeated switching without broken or overlapping states;
- preserve keyboard accessibility;
- do not reset unrelated page state;
- ensure the final state is correct even when an animation is interrupted.

Do not fake a tab interaction by animating static content while leaving
the underlying selected state incorrect.

### Menus, Accordions, and Overlays

When opening or closing motion is designed:

- reproduce both opening and closing behavior;
- avoid removing content before its exit transition completes when that
  would visibly break the motion;
- ensure final DOM and accessibility state remain correct;
- update aria-expanded and related state immediately according to the
  interaction model;
- support Escape and focus management where required;
- prevent overlapping animations from leaving the UI in an invalid state.

### Implementation Technology Rule

Choose the simplest technology that accurately reproduces the required
motion.

Prefer:

1. CSS transitions for simple state changes;
2. CSS keyframes for self-contained repeated or entrance/exit motion;
3. the project's existing animation solution for coordinated or
   interruptible state transitions;
4. a motion library only when the interaction genuinely requires it.

Do not introduce a new animation library for simple hover, opacity,
color, transform, or tab-indicator transitions.

Prefer animating:

- transform;
- opacity;

over expensive layout or paint-heavy properties when visually equivalent.

### Responsive Motion Rule

Do not assume desktop motion should behave identically on every device.

Check whether:

- hover exists on the target input device;
- the interaction changes on touch;
- the motion still makes sense on narrow layouts;
- moving elements have a different responsive position;
- overlays or panels require different motion direction;
- reduced space makes the original animation distracting or unclear.

The responsive layout may change, but the interaction intent should
remain consistent.

### Reduced-Motion Rule

Respect prefers-reduced-motion.

When reduced motion is requested:

- remove non-essential decorative movement;
- reduce large translations and scaling;
- avoid repeated looping motion unless essential;
- preserve the final state and functional feedback;
- do not make the interface harder to understand.

Reduced motion must not disable the actual interaction itself.
It changes the transition, not the user's ability to use the feature.

### Animation QA Rule

A page is not complete until interactive behavior has been checked in
addition to static visual QA.

For each meaningful interaction:

1. Verify the initial state.
2. Trigger the interaction.
3. Verify the motion starts correctly.
4. Verify intermediate behavior where visible.
5. Verify the final state.
6. Reverse the interaction where applicable.
7. Repeat rapidly where users can reasonably do so.
8. Test mouse.
9. Test keyboard.
10. Test touch where relevant.
11. Test reduced-motion behavior.
12. Confirm no clipping, overlap, layout shift, stuck state, or incorrect
    accessibility state occurs.

If Figma prototype playback was available, compare the implemented
interaction against the observed prototype, not only against static
screenshots.