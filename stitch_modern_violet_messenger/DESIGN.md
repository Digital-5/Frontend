# Design System Document: The Lucid Narrative

## 1. Overview & Creative North Star
**Creative North Star: The Electric Luminary**

This design system is not a utility; it is a premium digital environment. Moving away from the "flat grid" fatigue of contemporary messengers, this system adopts the **Electric Luminary** philosophy—a blend of high-end editorial layouts and deep, atmospheric layering. 

We break the "template" look through **intentional asymmetry** and **tonal depth**. Rather than placing elements on a single plane, we treat the UI as a series of floating glass lites and velvet surfaces. The interface should feel like a high-end physical object: heavy, polished, and responsive to light. We prioritize breathing room over information density to ensure every conversation feels significant.

---

## 2. Colors: Tonal Architecture
The palette is rooted in the interplay between `vibrant purple` and `deep blue`, set against a void of `surface-dim`.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders for sectioning are strictly prohibited. The "Chats" list and header transitions must be defined solely through background color shifts.
- Use `surface-container-low` (#131027) for the main body and `surface-bright` (#2b2848) or glassmorphism for headers.
- Boundaries are felt, not seen. Transitions between a user’s message and the background should rely on the `primary-dim` to `surface` contrast.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets. 
- **Base Layer:** `surface` (#0e0c20).
- **Secondary Sectioning:** `surface-container-low` (#131027).
- **Interactive Elevated Elements:** `surface-container-high` (#1f1c37).

### The "Glass & Gradient" Rule
To achieve a signature look, headers and footers (like the message input bar) must utilize **Glassmorphism**:
- **Background:** `surface-variant` (#25223f) at 60% opacity.
- **Effect:** 20px - 40px Backdrop Blur.
- **Soulful Gradients:** For primary CTAs (like the "Send" button), use a linear gradient from `primary` (#b6a0ff) to `primary-dim` (#7e51ff) at a 135-degree angle.

---

## 3. Typography: Editorial Authority
We use a dual-font approach to balance personality with readability.

- **Display & Headlines (Manrope):** These are your "Editorial" voices. Use `display-lg` (3.5rem) for splash screens and `headline-sm` (1.5rem) for screen titles like "Chats". The high x-height of Manrope provides a modern, authoritative feel.
- **Interface & Body (Inter):** Inter is our workhorse. Use `body-md` (0.875rem) for message text to ensure maximum legibility at small scales. 
- **The Hierarchy Rule:** Use `title-lg` (Inter, 1.375rem) for contact names in headers to create a clear "anchor" for the user's eye, contrasting against the `label-sm` (0.6875rem) used for timestamps and metadata.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too "dirty" for this aesthetic. We use light and tone to elevate.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a "recessed" or "pressed" look that feels more premium than a simple drop shadow.
- **Ambient Shadows:** For floating elements (Modals/Popovers), use a shadow color of `#000000` at 12% opacity with a `48px` blur and `16px` Y-offset. It should feel like a soft glow of darkness, not a hard edge.
- **The "Ghost Border" Fallback:** If accessibility demands a container edge, use the `outline-variant` (#48455c) at **15% opacity**. It should be a whisper of a line, barely perceptible.

---

## 5. Components: The Signature Kit

### Chat Bubbles (The Core Component)
- **Sender (User):** Gradient of `primary` to `primary-dim`. `Rounded-lg` (2rem) on three corners, with a `sm` (0.5rem) radius on the bottom-right.
- **Recipient:** `surface-container-highest` (#25223f). `Rounded-lg` on three corners, `sm` radius on the bottom-left.
- **Spacing:** No dividers between messages. Use 4px vertical spacing for grouped messages and 16px for speaker shifts.

### Buttons & Interaction
- **Primary FAB (New Chat):** Use `secondary-container` (#0058ca) with an icon in `on-secondary-container`. Shape: `Rounded-full`.
- **Message Input:** A `surface-container-highest` pill. Use `Rounded-full` (9999px) for the container. The "Send" button should be a floating circle nested within the right padding.

### High-Quality Avatars
- **Style:** Always `Rounded-full`. 
- **The Glow:** For "Online" states, do not just use a green dot. Use a 2px outer stroke of `tertiary` (#81ecff) around the avatar to create a "halo" effect.

### Sleek Search Bars
- **Styling:** `surface-container-lowest` (#000000) with a 10% `outline-variant` ghost border. 
- **Typography:** `body-md` Inter with `on-surface-variant` (#aca8c3) for placeholder text.

---

## 6. Do's and Don'ts

### Do:
- **Do** use `tertiary` (#81ecff) sparingly for "high-energy" accents like unread counters or active toggle states.
- **Do** embrace white space. If a screen feels crowded, increase the padding to `xl` (3rem) at the top of the layout.
- **Do** use `backdrop-blur` on the message input bar to allow the chat history to softly bleed through as the user scrolls.

### Don't:
- **Don't** use pure white (#FFFFFF) for text. Use `on-surface` (#e7e2ff) to maintain the dark-theme's sophisticated mood and reduce eye strain.
- **Don't** use standard 1px dividers to separate chat threads. Use a background shift from `surface` to `surface-container-low` on hover/selection instead.
- **Don't** use hard-edged rectangles. Everything in this system should feel "huggable"—stick strictly to the `Roundedness Scale` (Default: 1rem).