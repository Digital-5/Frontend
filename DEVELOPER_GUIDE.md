# Digital-5 Frontend

React Native app mit Expo, TypeScript, und React Navigation.

## 🚀 Quick Start

```bash
# Dependencies installieren
npm install

# Development Server starten
npm start

# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

## 📁 Projektstruktur

```
d5-frontend/
├── App.tsx                         # Haupteinstiegspunkt - Font Loading & Navigation Setup
├── src/
│   ├── screens/                   # App Screens/Views
│   │   ├── LoginScreen.tsx       # Login mit Validierung
│   │   ├── HomeScreen.tsx        # Home Dashboard
│   │   ├── ProfileScreen.tsx     # User Profile
│   │   └── index.ts              # Screen Exports
│   │
│   ├── components/                # Wiederverwendbare UI Components
│   │   ├── CustomButton.tsx      # Button Component mit Varianten
│   │   ├── CustomInput.tsx       # Input Component mit Label & Error
│   │   └── index.ts              # Component Exports
│   │
│   ├── navigation/                # Navigation Configuration
│   │   └── AppNavigator.tsx      # Stack Navigator Setup
│   │
│   ├── theme/                     # Design System
│   │   ├── colors.ts             # Farbpalette
│   │   └── fonts.ts              # Font Definitions
│   │
│   ├── services/                  # API Services
│   │   └── authService.ts        # Authentication API
│   │
│   ├── hooks/                     # Custom React Hooks
│   │   └── useForm.ts            # Form State Management Hook
│   │
│   ├── utils/                     # Utility Functions
│   │   └── helpers.ts            # Common Helper Functions
│   │
│   └── types/                     # TypeScript Type Definitions
│       └── navigation.ts         # Navigation Types
│
├── assets/                        # Static Assets
│   ├── fonts/                    # Custom Fonts
│   └── images/                   # Images & Icons
│
├── __tests__/                     # Test Files
│   └── App.test.tsx
│
└── Configuration Files
    ├── package.json              # Dependencies & Scripts
    ├── tsconfig.json             # TypeScript Config
    ├── jest.config.js            # Jest Testing Config
    ├── eslint.config.mjs         # ESLint Config
    └── babel.config.js           # Babel Config
```

## 🎨 Design System

### Farben

Die App verwendet ein vordefiniertes Farbschema (siehe `src/theme/colors.ts`):

```typescript
import Colors from './src/theme/colors';

// Hauptfarben
Colors.primary          // #5139A7 - Rebecca Purple
Colors.babyBlueIce      // #A3BCF9 - Baby Blue Ice
Colors.inkBlack         // #0E0A1E - Ink Black
Colors.ghostWhite       // #ECF1FE - Ghost White

// Text
Colors.textOnLight      // Text auf hellen Hintergründen
Colors.textOnDark       // Text auf dunklen Hintergründen
Colors.textPlaceholder  // Placeholder Text

// UI Elements
Colors.button           // Button Background
Colors.buttonText       // Button Text
Colors.link             // Links & Hyperlinks
Colors.border           // Borders
```

### Schriftarten

Roboto Font Family ist vollständig integriert:

```typescript
import Fonts from './src/theme/fonts';

Fonts.thin              // Roboto Thin (100)
Fonts.light             // Roboto Light (300)
Fonts.regular           // Roboto Regular (400)
Fonts.medium            // Roboto Medium (500)
Fonts.bold              // Roboto Bold (700)
Fonts.black             // Roboto Black (900)
// + alle Italic-Varianten
```

## 🧩 Components

### CustomButton

```typescript
import { CustomButton } from './src/components';

<CustomButton 
  title="Click Me" 
  onPress={() => console.log('Pressed')}
  variant="primary"      // 'primary' | 'secondary' | 'outline'
  loading={false}
  disabled={false}
/>
```

### CustomInput

```typescript
import { CustomInput } from './src/components';

<CustomInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
/>
```

## 🗺️ Navigation

React Navigation ist konfiguriert mit Type-Safety:

```typescript
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function MyComponent() {
  const navigation = useNavigation<NavigationProp>();
  
  // Navigate to screen
  navigation.navigate('Home');
  navigation.navigate('Profile');
}
```

### Screens hinzufügen

1. Erstelle Screen-Datei in `src/screens/`
2. Exportiere in `src/screens/index.ts`
3. Füge Screen-Type in `src/types/navigation.ts` hinzu
4. Registriere Screen in `src/navigation/AppNavigator.tsx`

## 🔧 Development Guidelines

### Neue Component erstellen

```typescript
// src/components/MyComponent.tsx
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

interface MyComponentProps {
  title: string;
  // ... weitere Props
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontFamily: Fonts.bold,
    color: Colors.textOnLight,
  },
});
```

Dann in `src/components/index.ts` exportieren:
```typescript
export { default as MyComponent } from './MyComponent';
```

### Neuen Screen erstellen

```typescript
// src/screens/MyScreen.tsx
import { StyleSheet, View, Text } from 'react-native';
import { CustomButton } from '../components';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

export default function MyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Screen</Text>
      <CustomButton title="Action" onPress={() => {}} />
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
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textOnLight,
  },
});
```

### API Service erstellen

```typescript
// src/services/myService.ts
const API_URL = 'https://api.example.com';

export const myService = {
  fetchData: async () => {
    const response = await fetch(`${API_URL}/data`);
    return response.json();
  },
};
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Lint code
npm run lint

# Type check
npm run typecheck
```

## 📝 Code Style

- **TypeScript** für alle Dateien verwenden
- **Functional Components** mit Hooks
- **Naming Conventions:**
  - Components: PascalCase (`MyComponent.tsx`)
  - Files: camelCase (`authService.ts`)
  - Constants: UPPER_SNAKE_CASE
- **Imports organisieren:** React → React Native → Third Party → Local
- **Styles:** StyleSheet am Ende der Datei

## 🚦 Git Workflow

```bash
# Neuer Branch für Feature
git checkout -b feature/my-feature

# Changes committen
git add .
git commit -m "feat: add my feature"

# Push und PR erstellen
git push origin feature/my-feature
```

### Commit Message Format

- `feat:` neue Features
- `fix:` Bug Fixes
- `docs:` Dokumentation
- `style:` Code-Formatierung
- `refactor:` Code Refactoring
- `test:` Tests hinzufügen/ändern
- `chore:` Build-Prozess, Dependencies

## 🔐 Environment Variables

Erstelle eine `.env` Datei:

```bash
EXPO_PUBLIC_API_URL=https://api.example.com
```

Verwendung:
```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```

## 📦 Key Dependencies

- **expo**: ^54.0.25 - React Native Framework
- **react-navigation**: Navigation Library
- **@expo-google-fonts/roboto**: Roboto Fonts
- **typescript**: Type Safety
- **jest**: Testing Framework
- **eslint**: Code Linting

## 🆘 Troubleshooting

### Fonts werden nicht geladen
```bash
npx expo start --clear
```

### TypeScript Fehler
```bash
npm run typecheck
```

### Module nicht gefunden
```bash
rm -rf node_modules
npm install
```

### iOS Build Probleme
```bash
cd ios && pod install && cd ..
npm run ios
```

## 👥 Team

Dieses Projekt wurde für das Digital-5 Team erstellt.

Bei Fragen zur Architektur oder Implementierung, siehe diese README oder frage im Team-Channel.

## 📚 Weitere Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)
