import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import * as StoreKeys from './StoreKeys';
import { generateKeys } from './Keys';

export default function StoreKey() {
  const [keyName, setKeyName] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [loadKeyName, setLoadKeyName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Secure Key Storage</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Key speichern:</Text>
        <TextInput
          style={styles.textInput}
          value={keyName}
          onChangeText={setKeyName}
          placeholder="Key-Name (z.B. 'IdentityPrivate')"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.textInput}
          value={keyValue}
          onChangeText={setKeyValue}
          placeholder="Key-Wert eingeben..."
          placeholderTextColor="#999"
          multiline
        />
        <Button title="Key speichern" onPress={() => StoreKeys.saveValue(keyName, keyValue)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Key laden:</Text>
        <TextInput
          style={styles.textInput}
          value={loadKeyName}
          onChangeText={setLoadKeyName}
          placeholder="Key-Name zum Laden eingeben..."
          placeholderTextColor="#999"
        />
        <Button title="Key laden" onPress={() => StoreKeys.getValue(loadKeyName)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Keys generieren:</Text>
        <Button
          title="Alle Keys generieren"
          onPress={async () => {
            try {
              await generateKeys();
              console.log('✅ Alle Keys erfolgreich generiert!');
              alert('Alle Keys erfolgreich generiert!');
            } catch (error) {
              console.error('❌ Fehler beim Generieren der Keys:', error);
              alert('Fehler: ' + error);
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  textInput: {
    minHeight: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#1b5e20',
    fontFamily: 'monospace',
  },
});