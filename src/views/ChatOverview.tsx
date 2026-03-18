import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import Colors from '../theme/colors';
import { Style } from '../theme/style';
import AddChatView from './AddChatView'; 
import { Icon } from '../components';


interface Chat {
  uuid: number;
  username: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: any;
  unreadCount: number;
  isOnline: boolean;
}

// Mock-Daten für die Chat-Liste
const MOCK_CHATS: Chat[] = [
  {
    uuid: 1,
    username: 'UNC',
    name: 'Uncle Liri',
    lastMessage: 'JONAS IST DER BESTE',
    timestamp: '10:30',
    avatar: require('../../assets/profile.jpeg'),
    unreadCount: 3,
    isOnline: true,
  },
  {
    uuid: 2,
    username: 'Erwin',
    name: 'Coding Goat',
    lastMessage: 'Liridon du alter Sack',
    timestamp: '09:15',
    avatar: require('../../assets/D5_icon.png'),
    unreadCount: 0,
    isOnline: false,
  },
];

type ChatOverviewProps = {
  onChatPress?: (_chat: Chat) => void;
};

export default function ChatOverview({ onChatPress }: ChatOverviewProps) {
  const [chats] = useState<Chat[]>(MOCK_CHATS);
  const [searchText, setSearchText] = useState('');
  const [showAddChat, setShowAddChat] = useState(false); // Füge diese Zeile hinzu


  // Filter Chats nach Suchtext
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Sortiere Chats: ungelesene zuerst
  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
    if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
    return 0;
  });

  //Action Handler

  const handleChatPress = (chat: Chat) => {
    console.log('Chat geöffnet:', chat.name);
    onChatPress?.(chat);
  };
  const handleProfilePress = () => {
    console.log('Profil-Menü geöffnet');
    // Hier kannst du zur Profil-Seite navigieren
  };

  const handleNewChat = () => {
    setShowAddChat(true);
    console.log('Neuen Chat erstellen');
    // Navigation zu neuer Chat-Seite
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={[
        Style.chatItem,
        item.unreadCount > 0 && Style.chatItemUnread,
      ]}
      onPress={() => handleChatPress(item)}
      activeOpacity={0.7}
    >
      <View style={Style.avatarContainer}>
        <Image source={item.avatar} style={Style.avatar} />
        {item.isOnline && <View style={Style.onlineIndicator} />}
      </View>

      <View style={Style.chatContent}>
        <View style={Style.chatHeader}>
          <Text
            style={[
              Style.chatName,
              item.unreadCount > 0 && Style.chatNameUnread,
            ]}
          >
            {item.name}
          </Text>

        </View>
        <Text
          style={[
            Style.lastMessage,
            item.unreadCount > 0 && Style.lastMessageUnread,
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>


    {/* Rechte Seite: Timestamp und Badge */}
    <View style={Style.rightContainer}>
      <Text
        style={[
          Style.timestamp,
          item.unreadCount > 0 && Style.timestampUnread,
        ]}
      >
        {item.timestamp}
      </Text>
      {item.unreadCount > 0 && (
        <View style={Style.unreadBadge}>
          <Text style={Style.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </View>
    </TouchableOpacity>
  );
  return (
    <View style={Style.container}>
      {/* Header */}
      <View style={Style.header}>
        <Text style={Style.headerTitle}>Chats</Text>
        <TouchableOpacity 
          style={Style.headerProfilePicture}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
        <Image 
            source={require('../../assets/profile.jpeg')} 
            style={Style.profileImage}
          />
      </TouchableOpacity>
      </View>

      {/* Suchleiste */}
      <View style={Style.searchContainer}>
        <Icon name="search" size={20} color={Colors.textPlaceholder} />
        
        <TextInput
          style={Style.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={Colors.textPlaceholder}
        />
      </View>

      {/* Chat-Liste */}
      {sortedChats.length > 0 ? (
        <FlatList
          data={sortedChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={Style.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={Style.emptyContainer}>
          <Text style={Style.emptyText}>There are no Chats</Text>
          <Text style={Style.emptySubtext}>
            {searchText
              ? 'Try a different search term'
              : 'Start a new conversation'}
          </Text>
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={Style.fab}
        onPress={handleNewChat}
        activeOpacity={0.8}
      >
        <Icon name="chat-plus-outline" size={28} color={Colors.white}/>
      </TouchableOpacity>

      {/* Modal für AddChatView */}
      <Modal
        visible={showAddChat}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddChat(false)}
      >
        <AddChatView onClose={() => setShowAddChat(false)} />
      </Modal>
    </View>
  );
}

