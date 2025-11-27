import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';
import ChatOverview from './ChatOverview';
import LoginView from './LoginView';
import SignupView from './SignupView';
import ExampleModalView from './ExampleModalView';
import ChatView from './ChatView';

type ViewName = 'menu' | 'chat' | 'login' | 'signup' | 'modal' | 'chatview';

interface MenuItem {
  id: ViewName;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'chat', label: 'Chat Overview' },
  { id: 'login', label: 'Login View' },
  { id: 'signup', label: 'Signup View' },
  { id: 'modal', label: 'Modal View' },
  { id: 'chatview', label: 'Chat View' },
];

export default function DebugViewSelector() {
  const [currentView, setCurrentView] = useState<ViewName>('menu');

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return <ChatOverview />;
      case 'login':
        return <LoginView />;
      case 'signup':
        return <SignupView />;
      case 'modal':
        return <ExampleModalView />;
      case 'chatview':
        return <ChatView />;
      default:
        return (
          <View style={styles.menuContainer}>
            <Text style={styles.title}>Debug Menu</Text>
            <Text style={styles.subtitle}>Select a view to debug</Text>
            
            <View style={styles.buttonContainer}>
              {MENU_ITEMS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.button}
                  onPress={() => setCurrentView(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {currentView !== 'menu' && (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentView('menu')}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>← Back to Menu</Text>
        </TouchableOpacity>
      )}
      {renderView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: '#999999',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: '#ffffff',
  },
});
