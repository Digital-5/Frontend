import { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import ChatOverview from './ChatOverview';
import LoginView from './LoginView';
import SignupView from './SignupView';
import ExampleModalView from './ExampleModalView';
import { Style } from '../theme/style'
import ChatView from './ChatView';
import StoreKey from '../service/SecureStoreTest';

type ViewName = 'menu' | 'chat' | 'login' | 'signup' | 'modal' | 'chatview' | 'storeKey';

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
  { id: 'storeKey', label: 'Store Key' },
];

export default function DebugViewSelector() {
  const [currentView, setCurrentView] = useState<ViewName>('menu');
  const [selectedChat, setSelectedChat] = useState<{ name: string; avatar: any } | null>(null);

  const renderView = () => {
    switch (currentView) {
      case 'chat':
        return (
          <ChatOverview
            onChatPress={(chat) => {
              setSelectedChat({ name: chat.name, avatar: chat.avatar });
              setCurrentView('chatview');
            }}
          />
        );
      case 'login':
        return <LoginView />;
      case 'signup':
        return <SignupView />;
      case 'modal':
        return <ExampleModalView />;
      case 'chatview':
        return (
          <ChatView
            chatPartnerName={selectedChat?.name ?? 'Chat'}
            profilePicture={selectedChat?.avatar ?? require('../../assets/profile.jpeg')}
            onBack={() => setCurrentView('chat')}
          />
        );
      case 'storeKey':
        return <StoreKey />;
      default:
        return (
          <View style={Style.menuContainer}>
            <Text style={Style.title}>Debug Menu</Text>
            <Text style={Style.subtitle}>Select a view to debug</Text>
            
            <View style={Style.buttonContainer}>
              {MENU_ITEMS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={Style.button}
                  onPress={() => setCurrentView(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={Style.buttonText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
    }
  };

  return (
    <View style={Style.container}>
      {currentView !== 'menu' && currentView !== 'chatview' && (
        <TouchableOpacity
          style={Style.backButton}
          onPress={() => setCurrentView('menu')}
          activeOpacity={0.8}

        >
          <Text style={Style.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
      {renderView()}
    </View>
  );
}
