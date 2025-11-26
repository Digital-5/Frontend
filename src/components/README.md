# Components Documentation

## Modal Component

Eine wiederverwendbare Modal-Komponente für Dialoge, Bestätigungen und Benachrichtigungen.

---

### 📦 Import

```typescript
import { Modal } from '../components';
```

---

### 🎯 Grundlegende Verwendung

```typescript
import { useState } from 'react';
import { Modal } from '../components';

export default function MyView() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setModalVisible(true)}>
        Open Modal
      </Button>

      <Modal
        visible={modalVisible}
        message="This is a simple modal message"
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
```

---

### 📋 Props

| Prop | Typ | Required | Default | Beschreibung |
|------|-----|----------|---------|--------------|
| `visible` | `boolean` | ✅ | - | Steuert Sichtbarkeit des Modals |
| `message` | `string` | ✅ | - | Haupt-Text des Modals |
| `onClose` | `() => void` | ✅ | - | Callback beim Schließen |
| `title` | `string` | ❌ | - | Optional: Überschrift des Modals |
| `confirmText` | `string` | ❌ | `"OK"` | Text für Bestätigungs-Button |
| `cancelText` | `string` | ❌ | - | Optional: Text für Abbrechen-Button |
| `onConfirm` | `() => void` | ❌ | - | Optional: Callback bei Bestätigung |
| `type` | `'info' \| 'success' \| 'error' \| 'warning'` | ❌ | `'info'` | Visueller Stil des Modals |

---

### 🎨 Modal Types

#### Info Modal (Standard)
```typescript
<Modal
  visible={showInfo}
  title="Information"
  message="This is an informational message."
  type="info"
  onClose={() => setShowInfo(false)}
/>
```

#### Success Modal
```typescript
<Modal
  visible={showSuccess}
  title="Success!"
  message="Your action was completed successfully."
  type="success"
  onClose={() => setShowSuccess(false)}
  confirmText="Great!"
/>
```

#### Error Modal
```typescript
<Modal
  visible={showError}
  title="Error"
  message="Something went wrong. Please try again."
  type="error"
  onClose={() => setShowError(false)}
  confirmText="Retry"
/>
```

#### Warning Modal
```typescript
<Modal
  visible={showWarning}
  title="Warning"
  message="This action cannot be undone."
  type="warning"
  onClose={() => setShowWarning(false)}
  confirmText="Continue"
/>
```

---

### 💡 Häufige Use Cases

#### 1. **Info-Modal mit Icon-Button**

```typescript
const [showInfo, setShowInfo] = useState(false);

// Info-Button neben Input
<TouchableOpacity onPress={() => setShowInfo(true)}>
  <Text>ℹ️</Text>
</TouchableOpacity>

// Modal
<Modal
  visible={showInfo}
  title="Help"
  message="Enter your username to request access."
  type="info"
  onClose={() => setShowInfo(false)}
/>
```

#### 2. **Bestätigungs-Dialog (Confirm)**

```typescript
const [showConfirm, setShowConfirm] = useState(false);

const handleDelete = () => {
  setShowConfirm(true);
};

const confirmDelete = () => {
  // Delete logic here
  console.log('Item deleted');
};

<Modal
  visible={showConfirm}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  type="warning"
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={confirmDelete}
  onClose={() => setShowConfirm(false)}
/>
```

#### 3. **Success nach Formular-Submit**

```typescript
const [showSuccess, setShowSuccess] = useState(false);

const handleSubmit = async () => {
  try {
    await submitForm();
    setShowSuccess(true);
  } catch (error) {
    // Handle error
  }
};

<Modal
  visible={showSuccess}
  title="Account Created!"
  message="Your account has been created successfully."
  type="success"
  confirmText="Get Started"
  onConfirm={() => {
    // Navigate to next screen
  }}
  onClose={() => setShowSuccess(false)}
/>
```

#### 4. **Error Handling**

```typescript
const [errorMsg, setErrorMsg] = useState('');
const [showError, setShowError] = useState(false);

const handleAction = async () => {
  try {
    await someApiCall();
  } catch (error) {
    setErrorMsg(error.message);
    setShowError(true);
  }
};

<Modal
  visible={showError}
  title="Error"
  message={errorMsg}
  type="error"
  confirmText="Try Again"
  onClose={() => setShowError(false)}
/>
```

---

### 🔄 Mehrere Modals gleichzeitig

Du kannst mehrere Modals in einer Komponente haben - sie zeigen sich nur wenn ihr `visible`-State `true` ist:

```typescript
const [showHelp, setShowHelp] = useState(false);
const [showInfo, setShowInfo] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);

return (
  <>
    {/* Your UI */}
    
    {/* Help Modal */}
    <Modal
      visible={showHelp}
      title="Need Help?"
      message="Contact support at support@example.com"
      onClose={() => setShowHelp(false)}
    />
    
    {/* Info Modal */}
    <Modal
      visible={showInfo}
      title="Information"
      message="Username must be at least 3 characters."
      type="info"
      onClose={() => setShowInfo(false)}
    />
    
    {/* Success Modal */}
    <Modal
      visible={showSuccess}
      title="Success!"
      message="Your request has been submitted."
      type="success"
      onClose={() => setShowSuccess(false)}
    />
  </>
);
```

---

### ⚠️ Best Practices

#### ✅ DO
- Verwende aussagekräftige Titel und Messages
- Wähle den passenden `type` für den Kontext
- Setze `visible` immer zurück auf `false` nach Schließen
- Nutze `onConfirm` für wichtige Actions (z.B. Löschen)

```typescript
// ✅ GOOD
<Modal
  visible={showDelete}
  title="Delete Account"
  message="This will permanently delete your account and all data."
  type="warning"
  confirmText="Delete"
  cancelText="Cancel"
  onConfirm={handleDelete}
  onClose={() => setShowDelete(false)}
/>
```

#### ❌ DON'T
- Keine zu langen Messages (besser in mehrere Sätze aufteilen)
- Nicht zu viele Modals gleichzeitig öffnen
- State nicht vergessen zurückzusetzen

```typescript
// ❌ BAD
<Modal
  visible={true}  // Hardcoded - Modal schließt nie!
  message="This is a very very very long message that should be split into multiple shorter sentences for better readability and user experience."
  onClose={() => {}}  // Leerer Callback - State wird nicht aktualisiert
/>
```

---

### 🎨 Styling

Das Modal nutzt automatisch die Theme-Farben aus `src/theme/colors.ts`:

- **Background:** `Colors.inputBackground`
- **Text:** `Colors.textOnLight` und `Colors.textHeadline`
- **Primary Button:** `Colors.primary`
- **Cancel Button:** `Colors.border`

Die Icon-Farben basieren auf dem `type`:
- `info` → Primary Color
- `success` → Grün (#4CAF50)
- `error` → Rot (#F44336)
- `warning` → Orange (#FF9800)

---

### 📱 Platform Support

Das Modal funktioniert auf allen Plattformen:
- ✅ iOS
- ✅ Android
- ✅ Web

Es nutzt plattform-spezifische Schatten für ein natives Look & Feel.

---

### 🚀 Erweiterung

Falls du zusätzliche Features brauchst (z.B. Custom Content, Inputs im Modal), erstelle eine neue Komponente basierend auf `Modal.tsx` oder passe die bestehende an.

**Beispiel:** `ConfirmModal.tsx`, `InputModal.tsx`, `AlertModal.tsx`

---

**Fragen oder Probleme?** Schau in die `DEVELOPER_GUIDE.md` oder frag im Team! 🤝
