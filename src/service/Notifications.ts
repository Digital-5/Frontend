import * as Notifications from 'expo-notifications';

export async function requestUserPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  
  if (status === 'granted') {
    //Get Expo Push Token for Push Notifications
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push Token:', token);
    //send token to server or store it securely
    return token;
  } 

  /*
  Token kann nun an den Server gesendet und dort gespeichert werden, um Push-Benachrichtigungen zu ermöglichen.
  Token sollte noch verschlüsselt werden, bevor er an den Server gesendet wird.
  */
}

