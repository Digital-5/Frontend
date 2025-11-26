import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';
import { Ionicons } from '@expo/vector-icons';


interface Chat {
  id: string;
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
    id: 'UNC',
    name: 'Uncle Liri',
    lastMessage: 'Liridon hat nen kleinen Schwanz',
    timestamp: '10:30',
    avatar: require('../../assets/profile.jpeg'),
    unreadCount: 3,
    isOnline: true,
  },
  {
    id: 'Erwin',
    name: 'Coding Goat',
    lastMessage: 'Liridon du alter Sack',
    timestamp: '09:15',
    avatar: require('../../assets/profile.jpeg'),
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
    console.log('Chat geöffnet:', chat.id);
    onChatPress?.(chat);
  };
  const handleProfilePress = () => {
    console.log('Profil-Menü geöffnet');
    // Hier kannst du zur Profil-Seite navigieren
  };

  const handleNewChat = () => {
    console.log('Neuer Chat erstellen');
    // Navigation zu neuer Chat-Seite
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={[
        styles.chatItem,
        item.unreadCount > 0 && styles.chatItemUnread,
      ]}
      onPress={() => handleChatPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text
            style={[
              styles.chatName,
              item.unreadCount > 0 && styles.chatNameUnread,
            ]}
          >
            {item.name}
          </Text>

        </View>
        <Text
          style={[
            styles.lastMessage,
            item.unreadCount > 0 && styles.lastMessageUnread,
          ]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>


    {/* Rechte Seite: Timestamp und Badge */}
    <View style={styles.rightContainer}>
      <Text
        style={[
          styles.timestamp,
          item.unreadCount > 0 && styles.timestampUnread,
        ]}
      >
        {item.timestamp}
      </Text>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity 
          style={styles.headerProfilePicture}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
        <Image 
            source={require('../../assets/profile.jpeg')} 
            style={styles.profileImage}
          />
      </TouchableOpacity>
      </View>

      {/* Suchleiste */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#666666"
        />
      </View>

      {/* Chat-Liste */}
      {sortedChats.length > 0 ? (
        <FlatList
          data={sortedChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>There are no Chats</Text>
          <Text style={styles.emptySubtext}>
            {searchText
              ? 'Try a different search term'
              : 'Start a new conversation'}
          </Text>
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleNewChat}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  topBar: {
    height: 8,
    backgroundColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: Colors.backgroundDark,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: '#ffffff',
  },
  headerBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  headerBadgeText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.backgroundDark,
  },
  searchInput: {
    backgroundColor: Colors.backgroundDark,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: '#4a4a4a',
    color: '#ffffff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: Colors.ChatColorRead,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  chatItemUnread: {
    backgroundColor: Colors.ChatColorUnread,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#4a4a4a',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CD964',
    borderWidth: 2,
    borderColor: '#2a2a2a',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: '#ffffff',
  },
  chatNameUnread: {
    fontFamily: Fonts.bold,
    color: Colors.primaryLight,
  },
  timestamp: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: '#999999',
  },
  timestampUnread: {
    fontFamily: Fonts.medium,
    color: Colors.primaryLight,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#aaaaaa',
  },
  lastMessageUnread: {
    fontFamily: Fonts.medium,
    color: '#ffffff',
  },
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    minHeight: 50,
  },
  unreadBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    marginTop: 4,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Fonts.bold,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: '#ffffff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: '#999999',
    textAlign: 'center',
  },
  headerProfilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
    fab: {
    position: 'absolute',
    right: 40,
    bottom: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Android Shadow
    shadowColor: '#000', // iOS Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily: Fonts.regular,
    fontWeight: '300',
  },
});
