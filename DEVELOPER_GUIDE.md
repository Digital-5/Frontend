# Developer Guide

> **📖 Schnellstart:** Siehe [README.md](README.md) für Installation und Basics!

Dieser Guide ergänzt die README mit tiefergehenden Entwicklungs-Patterns und Architektur-Entscheidungen.

---

## 🏗️ Architektur-Prinzipien

### View-Komponenten (Presentational Components)

**Ziel:** Views sind reine UI-Komponenten ohne Business Logic.

```typescript
// ✅ GOOD: View nimmt Daten via Props, gibt Actions via Callbacks zurück
type LoginViewProps = {
  onSubmit?: (_credentials: { email: string; password: string }) => void;
  errorMessage?: string;
  isLoading?: boolean;
};

export default function LoginView({ onSubmit, errorMessage, isLoading }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    onSubmit?.({ email, password });
  };
  
  return (/* UI */)
}
```

```typescript
// ❌ BAD: View macht direkt API Calls
export default function LoginView() {
  const handleLogin = async () => {
    const response = await fetch('/api/login', { /* ... */ }); // ❌ Nicht hier!
  };
}
```

### Separation of Concerns

| Layer | Verantwortung | Beispiel |
|-------|--------------|----------|
| **Views** | UI Rendering, lokaler State (Form Inputs) | `LoginView.tsx` |
| **Business Logic** | API Calls, Daten-Transformation, Routing | *Noch nicht implementiert* |
| **Theme** | Design Tokens (Colors, Fonts, Spacing) | `src/theme/colors.ts` |

---

## 🎨 Design System Guidelines

### Farb-Nutzung

```typescript
// Primäre Farben
Colors.primary          // Haupt-Akzentfarbe (Buttons, Links)
Colors.background       // Screen Hintergrund
Colors.textHeadline     // Überschriften
Colors.textOnLight      // Text auf hellem Hintergrund
Colors.textOnDark       // Text auf dunklem Hintergrund

// UI Elemente
Colors.button           // Button Hintergrund
Colors.buttonText       // Button Text
Colors.inputBackground  // Input Felder
Colors.border           // Rahmen
Colors.link             // Hyperlinks
Colors.textPlaceholder  // Placeholder Text
```

### Spacing System

```typescript
// Empfohlene Abstände (nutze diese für Konsistenz)
const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Beispiel
const styles = StyleSheet.create({
  container: {
    padding: 24,        // SPACING.lg
    marginBottom: 16,   // SPACING.md
  },
});
```

### Border Radius

```typescript
// Standard Border Radius für Konsistenz
const RADIUS = {
  small: 4,
  medium: 8,   // ← Standard für Buttons/Inputs
  large: 16,
  full: 9999,  // Für runde Elemente
};
```

---

## 📝 Code Conventions

### Naming Conventions

```typescript
// ✅ Views: PascalCase + "View" Suffix
LoginView.tsx
ProfileView.tsx
SettingsView.tsx

// ✅ Props Types: PascalCase + "Props" Suffix
type LoginViewProps = { /* ... */ }

// ✅ Callbacks: "on" Prefix
onSubmit, onPress, onChange, onLogout

// ✅ Boolean Props: "is" oder "has" Prefix
isLoading, hasError, isVisible
```

### TypeScript Best Practices

```typescript
// ✅ Nutze Type statt Interface für Props
type MyViewProps = {
  title: string;
  count?: number;  // Optional mit ?
};

// ✅ Callback Parameter mit _ prefixen wenn ungenutzt (ESLint)
type OnSubmit = (_data: FormData) => void;

// ✅ Explicit Return Types für komplexe Funktionen
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

---

## 🧩 Komponenten-Patterns

### KeyboardAvoidingView Pattern

Für Formulare auf Mobile:

```typescript
import { KeyboardAvoidingView, Platform } from 'react-native';

<KeyboardAvoidingView
  style={styles.container}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
  {/* Form Content */}
</KeyboardAvoidingView>
```

### Controlled Input Pattern

```typescript
const [value, setValue] = useState('');

<TextInput
  value={value}
  onChangeText={setValue}
  placeholder="Enter text"
  placeholderTextColor={Colors.textPlaceholder}
  autoCapitalize="none"  // Für Email
  keyboardType="email-address"  // Passende Tastatur
/>
```

### TouchableOpacity vs Button

```typescript
// ✅ Nutze TouchableOpacity für Custom Styling
<TouchableOpacity style={styles.button} onPress={handlePress}>
  <Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>

// ❌ Button ist schwer zu stylen
<Button title="Submit" onPress={handlePress} />
```

---

## 🔄 State Management

### Wann `useState` nutzen?

```typescript
// ✅ Für UI-lokalen State (Form Inputs, Toggles, etc.)
const [email, setEmail] = useState('');
const [isVisible, setIsVisible] = useState(false);

// ❌ Nicht für: API Daten, User Session, App-weiter State
// → Diese gehören in einen externen State Manager (später)
```

---

## 🎯 Definition of Done

Bevor du einen PR öffnest, checke:

- [ ] Code folgt Naming Conventions (`*View.tsx`, `*Props`, etc.)
- [ ] Keine hardcoded Colors/Fonts (nur aus `src/theme/`)
- [ ] TypeScript Types für alle Props definiert
- [ ] `npm run lint` läuft ohne Fehler
- [ ] `npm run typecheck` läuft ohne Fehler
- [ ] `npm test` läuft durch
- [ ] View funktioniert auf Web (Test mit `npm run web`)
- [ ] Keine `console.log` Statements vergessen
- [ ] Business Logic ist außerhalb der View (via Props)

---

## 🚨 Häufige Fehler

### 1. Font Loading Race Condition

```typescript
// ❌ BAD: View rendert bevor Fonts geladen sind
export default function App() {
  const [fontsLoaded] = useFonts({ /* ... */ });
  return <LoginView />;  // Fonts noch nicht da!
}

// ✅ GOOD: Warte auf Fonts
export default function App() {
  const [fontsLoaded] = useFonts({ /* ... */ });
  
  if (!fontsLoaded) {
    return null;  // Oder Loading Spinner
  }
  
  return <LoginView />;
}
```

### 2. Fehlende Platform Check

```typescript
// ❌ BAD: iOS-spezifisches Feature ohne Check
<SomeComponent behavior="padding" />

// ✅ GOOD: Platform Check
<SomeComponent behavior={Platform.OS === 'ios' ? 'padding' : 'height'} />
```

### 3. Uncontrolled Inputs

```typescript
// ❌ BAD: Uncontrolled (schwer zu testen)
<TextInput defaultValue="test" />

// ✅ GOOD: Controlled mit useState
const [value, setValue] = useState('test');
<TextInput value={value} onChangeText={setValue} />
```

---

## 🔍 Debugging Workflows

### Metro Bundler Probleme

```bash
# 1. Cache löschen
npx expo start --clear

# 2. node_modules neu installieren
rm -rf node_modules package-lock.json
npm install

# 3. Watchman Cache löschen (macOS)
watchman watch-del-all
```

### TypeScript Errors

```bash
# TypeScript Compiler isoliert ausführen
npx tsc --noEmit

# Mit verbose output
npx tsc --noEmit --listFiles
```

### Layout Debugging

```typescript
// Temporär border hinzufügen um Layout zu sehen
const styles = StyleSheet.create({
  debugBox: {
    borderWidth: 2,
    borderColor: 'red',  // Oder Colors.primary für Theme-Farbe
  },
});
```

---

## 🚀 Nächste Schritte

Dieses Projekt ist noch in früher Entwicklung. Geplant:

- [ ] **Navigation:** React Navigation oder Expo Router
- [ ] **State Management:** Context API oder Zustand
- [ ] **API Integration:** Axios + React Query
- [ ] **Authentication:** JWT Token Management
- [ ] **Testing:** E2E Tests mit Detox
- [ ] **CI/CD:** Automatische Builds und Deployments

---

**Bei Fragen:** Schau zuerst in die [README.md](README.md) oder frag im Team! 🤝
