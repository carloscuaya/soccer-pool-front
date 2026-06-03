# Design System Strategy: The Open-Air Arena

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Open-Air Arena."** Unlike standard sports applications that feel cluttered and data-heavy, this system prioritizes the breathability of an outdoor stadium. We are moving away from rigid, boxed-in grids toward an editorial experience that mimics the expansive feeling of a lush pitch under a clear sky.

The aesthetic is defined by **Atmospheric Depth**. By utilizing wide-open spacing, intentional asymmetry, and a departure from traditional borders, we create a high-end digital environment that feels energetic yet sophisticated. We use high-contrast typography scales—pairing the geometric, athletic energy of Lexend with the refined clarity of Manrope—to guide the user through complex data with the ease of a veteran referee.

## 2. Colors & Tonal Architecture
The palette transition from the deep `primary` (#0d631b) to the airy `secondary_fixed` (#baeaff) creates a natural hierarchy of "Earth and Sky."

*   **The "No-Line" Rule:** To maintain a premium, modern feel, **1px solid borders are strictly prohibited** for sectioning. Structural boundaries must be defined through background color shifts. For example, a `surface_container_low` (#f3f4f5) section should sit directly on a `surface` (#f8f9fa) background. The change in tone provides the boundary, keeping the layout "borderless" and expansive.
*   **Surface Hierarchy & Nesting:** Treat the UI as layers of a landscape. 
    *   **Base:** `surface` (#f8f9fa).
    *   **Sectioning:** `surface_container` (#edeeef) for large content blocks.
    *   **Focus Elements:** `surface_container_lowest` (#ffffff) for cards and primary interaction points to make them "pop" against the slightly darker ground.
*   **The Glass & Gradient Rule:** For floating headers or navigation overlays, use **Glassmorphism**. Apply a semi-transparent `surface_container_lowest` with a `backdrop-blur` of 12px-20px. 
*   **Signature Textures:** Incorporate a subtle linear gradient on primary CTAs—transitioning from `primary` (#0d631b) to `primary_container` (#2e7d32)—to mimic the directional grain of a freshly mown pitch.

## 3. Typography: The Athletic Editorial
Our typography is the "Voice of the Game." We use a dual-font strategy to balance raw athletic energy with professional reporting.

*   **The "Roar" (Display & Headline):** Use **Lexend**. Its wide apertures and geometric construction feel modern and fast. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero scores or big announcements.
*   **The "Stats" (Title & Body):** Use **Manrope**. It is a workhorse font that provides high legibility for player names, match minutes, and technical descriptions. 
*   **Hierarchy Note:** Always maintain a high contrast between headline and body sizes. If a headline is `headline-lg`, the supporting copy should skip a level to `body-md` to create a sophisticated, editorial "white space" feel.

## 4. Elevation & Depth
In this system, depth is achieved through **Tonal Layering** rather than structural scaffolding.

*   **The Layering Principle:** Avoid "Drop Shadows" as a default. Instead, place a `surface_container_lowest` card on a `surface_container_low` background. This creates a "Natural Lift" that feels integrated into the environment.
*   **Cloud Shadows:** When a true floating effect is required (e.g., Modals or FABs), shadows must be "Cloud-like": extra-diffused with a blur radius of at least `32px` and an opacity of `4% to 8%`. The shadow color should be a tinted version of `on_secondary_fixed_variant` (#004d62) to mimic the soft, blue-tinted shadows found outdoors.
*   **The Ghost Border Fallback:** If a border is required for accessibility in input fields, use the `outline_variant` (#bfcaba) at **20% opacity**. Never use a 100% opaque border.
*   **Tactile Textures:** Headers should occasionally feature a "Grass Texture" overlay—a high-resolution, low-opacity (5%) noise or pattern mask—to give the digital surface a physical, outdoorsy soul.

## 5. Components

### Buttons
*   **Primary:** Use the `primary` (#0d631b) fill with `on_primary` (#ffffff) text. Shape: `rounded-full` (9999px) to mimic the curve of a soccer ball.
*   **Secondary:** Use `secondary_container` (#9ae1ff) with `on_secondary_container` (#09657f). These are for "Sky-level" actions (e.g., filtering, sharing).
*   **States:** On hover, primary buttons should transition to `primary_container` (#2e7d32) with a soft "Cloud Shadow."

### Cards & Lists
*   **No Dividers:** Lists must never use horizontal line dividers. Use `spacing-4` (1.4rem) to separate items.
*   **Nesting:** Place `body-md` info inside a `surface_container_highest` (#e1e3e4) small badge rather than drawing a box around it.

### Inputs
*   **Fields:** Use `surface_container_low` (#f3f4f5) as the fill color. The active state is signaled by a 2px `primary` (#0d631b) bottom-border only, maintaining the "open" feel.

### Specialized Components
*   **Match-Day Scoreboards:** Use `display-md` (Lexend) for scores. The background should be a `surface_container_lowest` glass card with a subtle 5% "Grass" texture in the corner to ground the component.

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Align high-level headlines to the left while keeping action buttons floated to the right to create a dynamic, "moving" layout.
*   **Use the Spacing Scale:** Stick strictly to the `spacing-6` (2rem) and `spacing-8` (2.75rem) for outer margins to ensure the "Open-Air" feel.
*   **Layer with Intent:** Ensure that every "Surface" shift serves a functional purpose of grouping or emphasizing content.

### Don't:
*   **Don't use 1px Borders:** Never use `#000000` or `#bfcaba` at 100% opacity to box in content. It kills the "Airy" personality.
*   **Don't use Pure Grey Shadows:** Avoid the "dirty" look of default CSS shadows. Always tint shadows with a hint of our `secondary` blue.
*   **Don't Crowd the Pitch:** Avoid small margins. If a screen feels "busy," increase the vertical spacing using `spacing-10` (3.5rem) to let the design breathe.