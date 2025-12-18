import * as SecureStore from 'expo-secure-store';

// Function to save a value securely in Expo SecureStore using Androids Keystore system and iOS Keychain system
export async function saveValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
  console.log("Saved key:", key, "with value:", value);
}

// Function to get a value securely in Expo SecureStore using Androids Keystore system and iOS Keychain system
export async function getValue(key:string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("Loaded key:", key, "with value:", result);
  } else {
    console.log('No values stored under that key.');
  }
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


