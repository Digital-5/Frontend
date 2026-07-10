// WARNING: On web platform, expo-secure-store falls back to unencrypted localStorage.
// Do not store private keys when running on web without additional encryption.
import * as SecureStore from 'expo-secure-store';


// Function to save a value securely in Expo SecureStore using Androids Keystore system and iOS Keychain system
// requireAuthentication ensures keys are only accessible with biometric/PIN (intentional for private key protection)
export async function saveValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value, { requireAuthentication: true });
}

// Function to get a value securely in Expo SecureStore using Androids Keystore system and iOS Keychain system
export async function getValue(key: string) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

//Function to delete a value securely in Expo SecureStore using Androids Keystore system and iOS Keychain system
export async function deleteValue(key: string) {
  await SecureStore.deleteItemAsync(key);
}
