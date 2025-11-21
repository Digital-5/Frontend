# Developer Guide

This project is an Expo/React Native app that also runs on the web via React Native Web. The goal of this guide is to help the team add new UI screens without friction while keeping app logic separated from presentation.

## Quick start
- Install dependencies: `npm install`
- Start the web dev server: `npm run web` (or `npm start` and choose web)
- Lint/typecheck before pushing: `npm run lint` and `npm run typecheck`
- Run tests when you add logic-heavy code: `npm test`

## Project layout
- `index.ts` — registers the Expo root component.
- `App.tsx` — loads fonts, controls splash screen visibility, renders the active view.
- `src/views/` — UI screens/pages (e.g., `LoginView`). Each file exports a React component for a single screen. Add an entry to `src/views/index.ts` when you add a new one.
- `src/theme/` — shared design tokens (`colors.ts`, `fonts.ts`). Always pull styling values from here instead of hardcoding them.
- `assets/` — icons, splash, and other static assets.

## Adding a new view
1) Create a file in `src/views/` (e.g., `SignupView.tsx`) and export a component. Keep it focused on layout and local UI state (form fields, toggles, etc.).  
2) Accept callbacks via props for actions that belong to business logic (submitting a form, navigating elsewhere). This keeps the view reusable.  
3) Style with the design tokens from `src/theme/` and use `StyleSheet.create` for consistency.  
4) If the view needs keyboard-safe layout, wrap content with `KeyboardAvoidingView` like the login view.  
5) Export it from `src/views/index.ts` so it is easy to import elsewhere.  
6) Wire it into `App.tsx` (or your navigation layer if added later). For now, `App.tsx` directly renders the current view.

## UI conventions
- **Naming:** suffix screen components with `View` and keep file names in PascalCase.
- **Spacing/layout:** prefer flexbox over absolute positioning; keep consistent padding (e.g., 16–24) and corner radii that match existing components.
- **Color/fonts:** import from `src/theme/colors` and `src/theme/fonts`. Avoid inline hex codes or font names.
- **Inputs:** use controlled `TextInput` fields, set `placeholderTextColor` from the theme, and choose the right keyboard type (`email-address`, `numeric`, etc.).
- **Status bar:** `App.tsx` controls the status bar; individual views should not manage it.
- **Accessibility:** set `accessibilityLabel`/`accessibilityRole` on touchable elements when you add interactive UI.

## Working with fonts
- `App.tsx` loads the Roboto family via `useFonts`. Wait for `fontsLoaded` before rendering views.
- When adding a new font weight/style, add its import in `App.tsx` and a matching entry in `src/theme/fonts.ts`.

## When to move logic out of a view
- Networking, storage, or authentication calls should live outside the view. Pass callbacks into the view that invoke those behaviors.
- Derived state that can be computed from props should be computed upstream and passed down to keep the view simple.

## Debugging tips
- If the bundle fails on type syntax in dependencies, ensure `babel.config.js` still uses `babel-preset-expo`.
- For visual issues, temporarily add a colored border via the theme palette to see layout boxes, then remove it.
- Use `console.log` sparingly; remove noisy logs once you understand the issue.

## Definition of done for UI changes
- New screens live in `src/views/` with consistent styling and naming.
- Imports are relative to `src/views`/`src/theme` (no duplicate theme definitions).
- `npm run lint` and `npm run typecheck` complete without errors.
- Screens render correctly on both web and native targets in development mode.
