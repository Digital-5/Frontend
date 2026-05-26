import * as SecureStore from 'expo-secure-store';


// Function to save a value securely in Expo SecureStore using Androids Keystore system and iOS Keychain system
export async function saveValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
  console.log("Saved key:", key, "with value:", value);
}

// Function to get a value securely in Expo SecureStore using Androids Keystore system and iOS Keychain system
export async function getValue(key:string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  console.log("Loaded key:", key, "with value:", result);
  return result;

}

const DB_KEY_STORE = 'realm_db_encryption_key';

export async function getOrCreateDatabaseKey(): Promise<ArrayBuffer> {
  let base64Key = await getValue(DB_KEY_STORE);
  if (!base64Key) {
    const bytes = new Uint8Array(64);
    crypto.getRandomValues(bytes);
    base64Key = btoa(String.fromCharCode(...bytes));
    await saveValue(DB_KEY_STORE, base64Key);
  }
  const binary = atob(base64Key);
  const buffer = new Uint8Array(64);
  for (let i = 0; i < 64; i++) buffer[i] = binary.charCodeAt(i);
  return buffer.buffer;
}

//Function to delete a value securely in Expo SecureStore using Androids Keystore system and iOS Keychain system
export async function deleteValue(key:string) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("Key deleted:", key);
  } catch (error) {
    console.log("Key not found or error:", key, error);
  }
}


