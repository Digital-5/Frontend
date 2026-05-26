import { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from '@realm/react';
import { getRealmConfig } from './src/service/RealmDatabase';
import { getOrCreateDatabaseKey } from './src/service/StoreKeys';
import LucidColors from './src/theme/lucidColors';
import LucidFonts from './src/theme/lucidFonts';

import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
  useFonts,
} from '@expo-google-fonts/roboto';
import {
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import ChatOverview from './src/views/ChatOverview';
import ChatView from './src/views/ChatView';
import LoginView from './src/views/LoginView';
import SignupView from './src/views/SignupView';
import ExampleModalView from './src/views/ExampleModalView';
import StoreKey from './src/service/SecureStoreTest';

SplashScreen.preventAutoHideAsync();

type AppView = 'overview' | 'chat' | 'login' | 'signup' | 'storeKey' | 'modal';

const DEBUG_MENU_ITEMS: { label: string; view: AppView }[] = [
  { label: 'Login View', view: 'login' },
  { label: 'Signup View', view: 'signup' },
  { label: 'Store Key Test', view: 'storeKey' },
  { label: 'Modal View', view: 'modal' },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [realmConfig, setRealmConfig] = useState<Realm.Configuration | null>(null);
  const [view, setView] = useState<AppView>('overview');
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [activeChatName, setActiveChatName] = useState<string>('');
  const [showDebugModal, setShowDebugModal] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    getOrCreateDatabaseKey().then(key => setRealmConfig(getRealmConfig(key)));
  }, []);

  useEffect(() => {
    if (fontsLoaded) onLayoutRootView();
  }, [fontsLoaded, onLayoutRootView]);

  if (!fontsLoaded || !realmConfig) return null;

  const isDebugView = view !== 'overview' && view !== 'chat';

  const renderView = () => {
    switch (view) {
      case 'chat':
        return (
          <ChatView
            chatId={activeChatId}
            chatPartnerName={activeChatName}
            onBack={() => setView('overview')}
          />
        );
      case 'login': return <LoginView />;
      case 'signup': return <SignupView />;
      case 'storeKey': return <StoreKey />;
      case 'modal': return <ExampleModalView />;
      default:
        return (
          <ChatOverview
            onChatPress={(chatId, name) => {
              setActiveChatId(chatId);
              setActiveChatName(name);
              setView('chat');
            }}
            onDebugPress={() => setShowDebugModal(true)}
          />
        );
    }
  };

  return (
    <RealmProvider {...realmConfig}>
      <SafeAreaProvider>
        {renderView()}

        {/* Back button for debug views */}
        {isDebugView && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setView('overview')}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}

        {/* Debug dropdown modal */}
        <Modal visible={showDebugModal} transparent animationType="fade">
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setShowDebugModal(false)}
          >
            <View style={styles.debugMenu}>
              {DEBUG_MENU_ITEMS.map(item => (
                <TouchableOpacity
                  key={item.view}
                  style={styles.debugMenuItem}
                  onPress={() => { setShowDebugModal(false); setView(item.view); }}
                  activeOpacity={0.75}
                >
                  <Text style={styles.debugMenuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaProvider>
    </RealmProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  debugMenu: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: LucidColors.surfaceContainerHighest,
    borderRadius: 12,
    paddingVertical: 4,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  debugMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  debugMenuText: {
    fontSize: 14,
    fontFamily: LucidFonts.interMedium,
    color: LucidColors.onSurface,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});
