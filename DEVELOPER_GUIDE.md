# Developer Guide - Digital-5 Frontend# Digital-5 Frontend



## 🎯 ProjektstrukturReact Native app mit Expo, TypeScript, und React Navigation.



```## 🚀 Quick Start

d5-frontend/

├── App.tsx                    # Haupteinstiegspunkt - lädt Fonts und zeigt Screens```bash

├── src/# Dependencies installieren

│   ├── screens/              # Hier kommen alle App-Screens reinnpm install

│   │   └── LoginScreen.tsx  # Login Screen (Beispiel)

│   ├── components/           # Wiederverwendbare UI-Components# Development Server starten

│   └── theme/               # Design System (Farben, Fonts)npm start

│       ├── colors.ts        # Farbpalette

│       └── fonts.ts         # Schriftarten# iOS Simulator

```npm run ios



## 🚀 Quick Start# Android Emulator

npm run android

```bash

# Dependencies installieren# Web Browser

npm installnpm run web

```

# App starten

npm start## 📁 Projektstruktur



# Dann:```

# - Scan QR code mit Expo Go Appd5-frontend/

# - Oder drücke 'w' für Web├── App.tsx                         # Haupteinstiegspunkt - Font Loading & Navigation Setup

# - Oder drücke 'i' für iOS Simulator├── src/

# - Oder drücke 'a' für Android Emulator│   ├── screens/                   # App Screens/Views

```│   │   ├── LoginScreen.tsx       # Login mit Validierung

│   │   ├── HomeScreen.tsx        # Home Dashboard

## 🎨 Design System verwenden│   │   ├── ProfileScreen.tsx     # User Profile

│   │   └── index.ts              # Screen Exports

### Farben│   │

│   ├── components/                # Wiederverwendbare UI Components

```typescript│   │   ├── CustomButton.tsx      # Button Component mit Varianten

import Colors from '../theme/colors';│   │   ├── CustomInput.tsx       # Input Component mit Label & Error

│   │   └── index.ts              # Component Exports

// Beispiele:│   │

backgroundColor: Colors.primary      // #5139A7│   ├── navigation/                # Navigation Configuration

backgroundColor: Colors.background   // #A3BCF955│   │   └── AppNavigator.tsx      # Stack Navigator Setup

color: Colors.textOnLight           // Text auf hellen Hintergründen│   │

```│   ├── theme/                     # Design System

│   │   ├── colors.ts             # Farbpalette

### Fonts│   │   └── fonts.ts              # Font Definitions

│   │

```typescript│   ├── services/                  # API Services

import Fonts from '../theme/fonts';│   │   └── authService.ts        # Authentication API

│   │

// Beispiele:│   ├── hooks/                     # Custom React Hooks

fontFamily: Fonts.regular   // Roboto Regular│   │   └── useForm.ts            # Form State Management Hook

fontFamily: Fonts.medium    // Roboto Medium│   │

fontFamily: Fonts.bold      // Roboto Bold│   ├── utils/                     # Utility Functions

```│   │   └── helpers.ts            # Common Helper Functions

│   │

## 📱 Neuen Screen erstellen│   └── types/                     # TypeScript Type Definitions

│       └── navigation.ts         # Navigation Types

1. **Erstelle eine neue Datei** in `src/screens/`:│

├── assets/                        # Static Assets

```typescript│   ├── fonts/                    # Custom Fonts

// src/screens/HomeScreen.tsx│   └── images/                   # Images & Icons

import { View, Text, StyleSheet } from 'react-native';│

import Colors from '../theme/colors';├── __tests__/                     # Test Files

import Fonts from '../theme/fonts';│   └── App.test.tsx

│

export default function HomeScreen() {└── Configuration Files

  return (    ├── package.json              # Dependencies & Scripts

    <View style={styles.container}>    ├── tsconfig.json             # TypeScript Config

      <Text style={styles.title}>Home Screen</Text>    ├── jest.config.js            # Jest Testing Config

    </View>    ├── eslint.config.mjs         # ESLint Config

  );    └── babel.config.js           # Babel Config

}```



const styles = StyleSheet.create({## 🎨 Design System

  container: {

    flex: 1,### Farben

    backgroundColor: Colors.background,

    padding: 20,Die App verwendet ein vordefiniertes Farbschema (siehe `src/theme/colors.ts`):

  },

  title: {```typescript

    fontSize: 24,import Colors from './src/theme/colors';

    fontFamily: Fonts.bold,

    color: Colors.textOnLight,// Hauptfarben

  },Colors.primary          // #5139A7 - Rebecca Purple

});Colors.babyBlueIce      // #A3BCF9 - Baby Blue Ice

```Colors.inkBlack         // #0E0A1E - Ink Black

Colors.ghostWhite       // #ECF1FE - Ghost White

2. **Importiere den Screen** in `App.tsx`

// Text

## 🧩 Wiederverwendbare ComponentsColors.textOnLight      // Text auf hellen Hintergründen

Colors.textOnDark       // Text auf dunklen Hintergründen

Erstelle Components in `src/components/`:Colors.textPlaceholder  // Placeholder Text



```typescript// UI Elements

// src/components/MyButton.tsxColors.button           // Button Background

import { TouchableOpacity, Text, StyleSheet } from 'react-native';Colors.buttonText       // Button Text

import Colors from '../theme/colors';Colors.link             // Links & Hyperlinks

import Fonts from '../theme/fonts';Colors.border           // Borders

```

export default function MyButton({ title, onPress }) {

  return (### Schriftarten

    <TouchableOpacity style={styles.button} onPress={onPress}>

      <Text style={styles.text}>{title}</Text>Roboto Font Family ist vollständig integriert:

    </TouchableOpacity>

  );```typescript

}import Fonts from './src/theme/fonts';



const styles = StyleSheet.Create({Fonts.thin              // Roboto Thin (100)

  button: {Fonts.light             // Roboto Light (300)

    backgroundColor: Colors.primary,Fonts.regular           // Roboto Regular (400)

    padding: 15,Fonts.medium            // Roboto Medium (500)

    borderRadius: 8,Fonts.bold              // Roboto Bold (700)

  },Fonts.black             // Roboto Black (900)

  text: {// + alle Italic-Varianten

    color: Colors.buttonText,```

    fontFamily: Fonts.medium,

    textAlign: 'center',## 🧩 Components

  },

});### CustomButton

```

```typescript

## 💡 Best Practicesimport { CustomButton } from './src/components';



### DO ✅<CustomButton 

- Verwende **immer** Colors und Fonts aus `src/theme/`  title="Click Me" 

- Halte Components **klein und wiederverwendbar**  onPress={() => console.log('Pressed')}

- Nutze **TypeScript** für Type-Safety  variant="primary"      // 'primary' | 'secondary' | 'outline'

- Schreibe **aussagekräftige Variable**- und Function-Namen  loading={false}

  disabled={false}

### DON'T ❌  />

- Keine hardcoded Farben (`'#5139A7'` ❌)```

- Keine hardcoded Fonts (`'Roboto-Bold'` ❌)

- Keine Monster-Components mit 500+ Zeilen### CustomInput

- Keine `any` Types in TypeScript

```typescript

## 🎓 Nächste Schritteimport { CustomInput } from './src/components';



1. **Erkunde den LoginScreen** in `src/screens/LoginScreen.tsx`<CustomInput

2. **Erstelle deinen eigenen Screen** (z.B. HomeScreen, ProfileScreen)  label="Email"

3. **Baue wiederverwendbare Components** (z.B. Button, Input, Card)  placeholder="Enter your email"

4. **Lerne React Navigation** für mehrere Screens (später)  value={email}

  onChangeText={setEmail}

## 📚 Hilfreiche Ressourcen  error={emailError}

  keyboardType="email-address"

- [React Native Docs](https://reactnative.dev/)/>

- [Expo Docs](https://docs.expo.dev/)```

- [TypeScript](https://www.typescriptlang.org/)

## 🗺️ Navigation

## 🆘 Probleme?

React Navigation ist konfiguriert mit Type-Safety:

```bash

# Cache löschen```typescript

npx expo start --clearimport { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

# Dependencies neu installierenimport { RootStackParamList } from '../types/navigation';

rm -rf node_modules

npm installtype NavigationProp = NativeStackNavigationProp<RootStackParamList>;

```

function MyComponent() {

---  const navigation = useNavigation<NavigationProp>();

  

**Viel Erfolg beim Entwickeln! 🚀**  // Navigate to screen

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
