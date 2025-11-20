# 🚀 Digital-5 Frontend

Willkommen beim Digital-5 Frontend-Projekt! Diese React Native App wird mit Expo, TypeScript und React Navigation entwickelt.

## 📋 Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Installation](#installation)
- [Projekt starten](#projekt-starten)
- [Projektstruktur](#projektstruktur)
- [Development Workflow](#development-workflow)
- [Code Guidelines](#code-guidelines)
- [Troubleshooting](#troubleshooting)
- [Weitere Ressourcen](#weitere-ressourcen)

---

## 🔧 Voraussetzungen

Bevor du startest, stelle sicher, dass du Folgendes installiert hast:

### Erforderlich:
- **Node.js** (v18 oder höher) - [Download](https://nodejs.org/)
- **npm** (kommt mit Node.js) oder **yarn**
- **Git** - [Download](https://git-scm.com/)

### Optional (für mobile Entwicklung):
- **Expo Go App** auf deinem Smartphone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- **Xcode** (nur macOS) - für iOS Simulator
- **Android Studio** - für Android Emulator

### Installation überprüfen:
```bash
node --version    # sollte v18+ anzeigen
npm --version     # sollte 9+ anzeigen
git --version     # sollte installiert sein
```

---

## 📥 Installation

### 1. Repository klonen

```bash
git clone https://github.com/Digital-5/Frontend.git
cd Frontend
```

### 2. Dependencies installieren

```bash
npm install
```

Dieser Schritt installiert alle benötigten Packages (dauert ca. 1-2 Minuten).

### 3. Environment Variables (optional)

Kopiere die Beispiel-Datei und passe sie an:

```bash
# Windows
copy .env.example .env

# macOS/Linux
cp .env.example .env
```

Bearbeite `.env` und füge deine API URLs hinzu:
```bash
EXPO_PUBLIC_API_URL=https://api.example.com
```

---

## 🚀 Projekt starten

### Development Server starten

```bash
npm start
```

Nach dem Start siehst du einen QR-Code im Terminal und verschiedene Optionen:

```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

### Auf verschiedenen Plattformen testen:

#### 📱 Auf deinem Smartphone (empfohlen für Einsteiger):

1. Installiere **Expo Go** auf deinem Handy
2. Scanne den QR-Code aus dem Terminal
3. Die App wird automatisch geladen

#### 💻 iOS Simulator (nur macOS):

```bash
npm run ios
```

Startet automatisch den iOS Simulator.

#### 🤖 Android Emulator:

```bash
npm run android
```

Stelle sicher, dass Android Studio installiert ist und ein Emulator läuft.

#### 🌐 Im Browser:

```bash
npm run web
```

Öffnet die App im Browser (eingeschränkte Funktionalität).

---

## 📁 Projektstruktur

```
d5-frontend/
│
├── App.tsx                         # 🎯 Haupteinstiegspunkt - Font Loading
│
├── src/
│   ├── screens/                   # 📱 App Screens
│   │   ├── LoginScreen.tsx       # Login Screen mit Validierung
│   │   ├── HomeScreen.tsx        # Home Dashboard
│   │   ├── ProfileScreen.tsx     # User Profile
│   │   └── index.ts              # Screen Exports
│   │
│   ├── components/                # 🧩 Wiederverwendbare UI Components
│   │   ├── CustomButton.tsx      # Button mit Varianten
│   │   ├── CustomInput.tsx       # Input mit Validierung
│   │   └── index.ts              # Component Exports
│   │
│   ├── navigation/                # 🗺️ Navigation Setup
│   │   └── AppNavigator.tsx      # React Navigation Config
│   │
│   ├── theme/                     # 🎨 Design System
│   │   ├── colors.ts             # Farbpalette
│   │   └── fonts.ts              # Roboto Fonts
│   │
│   ├── services/                  # 🔌 API Services
│   │   └── authService.ts        # Authentication API
│   │
│   ├── hooks/                     # 🪝 Custom React Hooks
│   │   └── useForm.ts            # Form State Hook
│   │
│   ├── utils/                     # 🛠️ Utility Functions
│   │   └── helpers.ts            # Helper Functions
│   │
│   └── types/                     # 📝 TypeScript Types
│       └── navigation.ts         # Navigation Types
│
├── assets/                        # 🖼️ Static Assets
│   └── fonts/                    # Custom Fonts
│
├── __tests__/                     # 🧪 Test Files
│
└── Configuration Files
    ├── package.json              # Dependencies
    ├── tsconfig.json             # TypeScript Config
    ├── jest.config.js            # Testing Config
    ├── eslint.config.mjs         # Linting Config
    └── babel.config.js           # Babel Config
```

### 🎯 Wichtige Dateien im Überblick:

- **`App.tsx`** - Haupteinstiegspunkt, lädt Fonts und initialisiert Navigation
- **`src/screens/`** - Hier kommen alle neuen Screens rein
- **`src/components/`** - Wiederverwendbare UI-Komponenten
- **`src/theme/`** - Farben und Fonts für konsistentes Design
- **`src/navigation/`** - Navigation zwischen Screens

---

## 💻 Development Workflow

### 1️⃣ Neuen Branch erstellen

```bash
# Hole die neuesten Änderungen
git checkout main
git pull

# Erstelle einen neuen Feature-Branch
git checkout -b feature/dein-feature-name
```

### 2️⃣ Entwickeln

```bash
# Starte den Dev-Server
npm start
```

Die App lädt automatisch neu, wenn du Dateien änderst (Hot Reload).

### 3️⃣ Code testen

```bash
# TypeScript Type-Check
npm run typecheck

# Code Linting
npm run lint

# Unit Tests
npm test
```

### 4️⃣ Committen und Pushen

```bash
# Änderungen stagen
git add .

# Commit mit aussagekräftiger Message
git commit -m "feat: add login validation"

# Push zum Remote Repository
git push origin feature/dein-feature-name
```

### 5️⃣ Pull Request erstellen

Gehe zu GitHub und erstelle einen Pull Request von deinem Branch nach `main`.

---

## 📝 Code Guidelines

### Import-Reihenfolge:

```typescript
// 1. React & React Native
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Third-Party Libraries
import { useNavigation } from '@react-navigation/native';

// 3. Eigene Components
import { CustomButton } from '../components';

// 4. Theme
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

// 5. Types
import { RootStackParamList } from '../types/navigation';
```

### Component Template:

```typescript
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export default function MyComponent({ title, onPress }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textOnLight,
  },
});
```

### Design System verwenden:

```typescript
// ✅ RICHTIG - Theme verwenden
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

backgroundColor: Colors.primary
fontFamily: Fonts.bold

// ❌ FALSCH - Hardcoded Values
backgroundColor: '#5139A7'
fontFamily: 'Roboto-Bold'
```

### Commit Messages:

Verwende folgendes Format:

- `feat:` Neues Feature
- `fix:` Bug Fix
- `docs:` Dokumentation
- `style:` Formatierung, keine Code-Änderungen
- `refactor:` Code Refactoring
- `test:` Tests hinzufügen/ändern
- `chore:` Build-Prozess, Dependencies

Beispiele:
```bash
git commit -m "feat: add password reset screen"
git commit -m "fix: login button not working on Android"
git commit -m "docs: update README with new setup steps"
```

---

## 🛠️ Troubleshooting

### Problem: "Module not found" Fehler

```bash
# Lösung 1: Node modules neu installieren
rm -rf node_modules
npm install

# Lösung 2: Cache löschen
npm start -- --clear
```

### Problem: Fonts werden nicht geladen

```bash
# Cache löschen und neu starten
npx expo start --clear
```

### Problem: TypeScript Fehler

```bash
# Type-Check ausführen
npm run typecheck

# Falls Fehler, prüfe tsconfig.json
```

### Problem: "Port already in use"

```bash
# Beende den laufenden Prozess
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8081 | xargs kill
```

### Problem: iOS Build schlägt fehl (macOS)

```bash
# Pods neu installieren
cd ios
pod install
cd ..
npm run ios
```

### Problem: Android Emulator startet nicht

1. Öffne Android Studio
2. AVD Manager → Create Virtual Device
3. Wähle ein Device und starte es
4. Führe `npm run android` erneut aus

---

## 🧪 Testing & Quality Checks

```bash
# Type-Check (TypeScript)
npm run typecheck

# Code Linting (ESLint)
npm run lint

# Unit Tests (Jest)
npm test

# Tests mit Coverage
npm test -- --coverage

# Alle Checks auf einmal
npm run typecheck && npm run lint && npm test
```

---

## 🎨 Design System

### Farben verwenden:

```typescript
import Colors from '../theme/colors';

// Hauptfarben
Colors.primary          // #5139A7 - Rebecca Purple
Colors.babyBlueIce      // #A3BCF9 - Baby Blue Ice

// Text
Colors.textOnLight      // Für helle Hintergründe
Colors.textOnDark       // Für dunkle Hintergründe

// UI
Colors.button           // Button Background
Colors.buttonText       // Button Text
Colors.link             // Links
```

### Fonts verwenden:

```typescript
import Fonts from '../theme/fonts';

fontFamily: Fonts.regular  // 400
fontFamily: Fonts.medium   // 500
fontFamily: Fonts.bold     // 700
```

---

## 📚 Weitere Ressourcen

### Dokumentation:
- **DEVELOPER_GUIDE.md** - Ausführliche Entwickler-Dokumentation
- **PROJECT_OVERVIEW.md** - Projekt-Übersicht

### Externe Links:
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)

### Hilfe benötigt?

1. Prüfe die **Troubleshooting** Sektion oben
2. Siehe **DEVELOPER_GUIDE.md**
3. Frage im Team-Channel
4. Erstelle ein GitHub Issue

---

## 🤝 Team & Contribution

### Code Review Prozess:

1. Erstelle einen Feature-Branch
2. Entwickle dein Feature
3. Teste lokal (typecheck, lint, test)
4. Erstelle einen Pull Request
5. Warte auf Review
6. Merge nach Approval

### Best Practices:

✅ **DO:**
- Verwende das Design System (Colors, Fonts)
- Schreibe TypeScript Types
- Teste deine Änderungen
- Schreibe aussagekräftige Commit Messages
- Halte Components klein und wiederverwendbar

❌ **DON'T:**
- Hardcode Farben oder Fonts
- Pushe direkt auf `main`
- Committe `node_modules/` oder `.env`
- Ignoriere TypeScript/ESLint Fehler

---

## 📞 Kontakt

Bei Fragen wende dich an:
- **Team Lead**: [Name]
- **Team Channel**: [Link]
- **GitHub Issues**: [Link zum Repo]

---

## ⭐ Quick Commands Cheat Sheet

```bash
# Installation
npm install                    # Installiere Dependencies

# Development
npm start                      # Starte Dev-Server
npm run ios                    # iOS Simulator
npm run android                # Android Emulator
npm run web                    # Browser

# Quality Checks
npm run typecheck             # TypeScript Check
npm run lint                  # ESLint Check
npm test                      # Run Tests

# Git Workflow
git checkout -b feature/name  # Neuer Branch
git add .                     # Stage changes
git commit -m "message"       # Commit
git push origin feature/name  # Push

# Troubleshooting
npm start -- --clear          # Cache löschen
rm -rf node_modules && npm install  # Neuinstallation
```

---

**Willkommen im Team! Viel Erfolg beim Entwickeln! 🚀**

Bei Fragen oder Problemen zögere nicht, das Team zu fragen!
