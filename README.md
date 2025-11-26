# D5 Frontend

Ein modernes **React Native** Projekt mit **Expo** für iOS, Android und Web.

---

## � Voraussetzungen

Bevor du startest, stelle sicher, dass **Node.js** auf deinem System installiert ist:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** (wird automatisch mit Node.js installiert)

Prüfe deine Installation:

```bash
node --version   # Sollte v18.x.x oder höher anzeigen
npm --version    # Sollte eine Version anzeigen
```

> **Hinweis:** Ohne Node.js funktionieren `npm install` und andere Commands nicht!

---

## �🚀 Quick Start

### Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm start
```

Nach dem Start kannst du wählen:
- **`w`** → Web im Browser öffnen (`http://localhost:8081`)
- **`a`** → Android Emulator/Gerät
- **`i`** → iOS Simulator (nur macOS)

### Verfügbare Commands

```bash
npm start          # Expo Dev Server starten
npm run web        # Direkt im Browser öffnen
npm run android    # Android App starten
npm run ios        # iOS App starten (nur macOS)

npm run lint       # Code mit ESLint prüfen
npm run typecheck  # TypeScript Typen prüfen
npm test           # Jest Tests ausführen
```

---

## 📁 Projekt Struktur

```
d5-frontend/
├── App.tsx                 # Main Entry Point (Font Loading, Splash Screen)
├── index.ts                # Expo Root Registration
│
├── src/
│   ├── views/              # UI Screens (LoginView, SignupView, etc.)
│   │   ├── LoginView.tsx
│   │   └── index.ts        # Export aller Views
│   │
│   └── theme/              # Design System
│       ├── colors.ts       # Farb-Palette
│       └── fonts.ts        # Font-Familie Mapping
│
├── assets/                 # Bilder, Icons, Splash Screens
├── __tests__/              # Jest Tests
│
└── Config Files
    ├── tsconfig.json       # TypeScript Config
    ├── eslint.config.mjs   # ESLint Rules
    ├── jest.config.js      # Jest Test Config
    ├── babel.config.js     # Babel Transform Config
    └── app.json            # Expo Configuration
```

---

## 🎨 Design System

### Farben verwenden

```typescript
import Colors from '../theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.textOnLight,
  },
  button: {
    backgroundColor: Colors.primary,
  },
});
```

**Verfügbare Farben:**
- `Colors.primary` — Rebecca Purple (#5139A7)
- `Colors.background` — Ink Black (#0E0A1E)
- `Colors.textHeadline` — Baby Blue Ice (#A3BCF9)
- `Colors.buttonText` — Ghost White (#ECF1FE)
- und mehr...

### Fonts verwenden

```typescript
import Fonts from '../theme/fonts';

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.bold,     // Roboto Bold
    fontSize: 24,
  },
  body: {
    fontFamily: Fonts.regular,  // Roboto Regular
    fontSize: 16,
  },
});
```

**Verfügbare Font Weights:**
- `Fonts.thin` → Roboto 100
- `Fonts.light` → Roboto 300
- `Fonts.regular` → Roboto 400
- `Fonts.medium` → Roboto 500
- `Fonts.bold` → Roboto 700
- `Fonts.black` → Roboto 900

---

## 🛠️ Neuen Screen erstellen

### 1. View Component erstellen

Erstelle eine neue Datei in `src/views/`:

```typescript
// src/views/ProfileView.tsx
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

type ProfileViewProps = {
  username: string;
  onLogout?: () => void;
};

export default function ProfileView({ username, onLogout }: ProfileViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      {/* Weitere UI Komponenten */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textHeadline,
  },
});
```

### 2. View exportieren

Füge den Export in `src/views/index.ts` hinzu:

```typescript
export { default as LoginView } from './LoginView';
export { default as ProfileView } from './ProfileView';  // NEU
```

### 3. View in App einbinden

```typescript
// App.tsx
import { ProfileView } from './src/views';

export default function App() {
  // ...font loading code...
  
  return (
    <>
      <ProfileView username="Max" onLogout={() => console.log('Logout')} />
      <StatusBar style="auto" />
    </>
  );
}
```

---

## ✅ Best Practices

### DO ✅
- **Theme verwenden:** Immer `Colors` und `Fonts` aus `src/theme/` importieren
- **TypeScript Types:** Props mit `type` oder `interface` definieren
- **Controlled Inputs:** `useState` für TextInput `value` und `onChangeText`
- **KeyboardAvoidingView:** Bei Formularen für besseres Mobile UX
- **Prop Callbacks:** Business Logic außerhalb der View über Props übergeben

### DON'T ❌
- **Keine Hardcoded Colors:** Nicht `color: '#5139A7'`, sondern `color: Colors.primary`
- **Keine Inline Styles:** Nutze `StyleSheet.create()`
- **Keine Business Logic in Views:** API Calls, Navigation Logic gehören nach außen
- **Keine globalen Variablen:** Nutze Props und State Management
- **Keine console.logs vergessen:** Entferne Debug Logs vor dem Commit

---

## 🧪 Testing

```bash
# Alle Tests ausführen
npm test

# Tests im Watch Mode
npm test -- --watch

# Coverage Report
npm test -- --coverage
```

Tests liegen in `__tests__/` und nutzen Jest + React Native Testing Library.

---

## 🔍 Code Quality

### Vor jedem Commit

```bash
# ESLint prüfen
npm run lint

# TypeScript Typen prüfen
npm run typecheck

# Tests ausführen
npm test
```

### ESLint Regeln

- Unused Variables mit `_` Prefix sind erlaubt (z.B. `_credentials`)
- React Hooks Rules sind aktiv
- TypeScript Strict Mode

---

## 🐛 Troubleshooting

### Metro Bundler Fehler

```bash
# Cache löschen und neu starten
npx expo start --clear
```

### Port 8081 bereits belegt

```powershell
# Windows (PowerShell)
taskkill /F /IM node.exe

# macOS/Linux
killall node
```

### TypeScript Fehler "Cannot find module"

```bash
# node_modules neu installieren
rm -rf node_modules package-lock.json
npm install
```

### Fonts laden nicht

Stelle sicher, dass `App.tsx` die Fonts mit `useFonts` lädt und `SplashScreen.hideAsync()` erst nach dem Laden aufruft.

---

## 📦 Dependencies

### Production
- **expo** ~54.0.25
- **react** 18.2.0
- **react-native** 0.74.5
- **@expo-google-fonts/roboto** — Roboto Font Familie

### Development
- **typescript** ~5.9.2
- **eslint** ^9.39.1
- **jest** ^29.7.0
- **babel-preset-expo** ~12.0.0

---

## 🤝 Contributing

1. **Branch erstellen:** `git checkout -b feature/dein-feature`
2. **Entwickeln:** Code schreiben, testen, committen
3. **Lint + Typecheck:** `npm run lint && npm run typecheck`
4. **Push:** `git push origin feature/dein-feature`
5. **Pull Request:** Auf GitHub PR erstellen

---

## 📄 License

Private Project — Digital-5 Team

---

## 💡 Support

Bei Fragen oder Problemen:
- Checke zuerst die **Troubleshooting** Sektion
- Schaue in die **DEVELOPER_GUIDE.md** für tiefergehende Infos
- Frag im Team Channel

**Happy Coding! 🚀**
