import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  StyleSheet,
  // ScrollView,  // TODO: Wird wieder benötigt wenn Status-Funktion aktiviert wird
  ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LucidColors from '../theme/lucidColors';
import LucidFonts from '../theme/lucidFonts';
import { Icon } from '../components';
import AddChatView from './AddChatView';

interface Chat {
  uuid: number;
  username: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: ImageSourcePropType;
  unreadCount: number;
  isOnline: boolean;
}

// TODO: Status-Funktion — kann später reaktiviert werden
// interface Story {
//   id: string;
//   name: string;
//   avatar: ImageSourcePropType;
//   isActive: boolean;
// }

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

// TODO: Status-Funktion — Beispieldaten für spätere Verwendung
// const MOCK_STORIES: Story[] = [
//   { id: '1', name: 'LIRI', avatar: require('../../assets/profile.jpeg'), isActive: true },
//   { id: '2', name: 'JONAS', avatar: require('../../assets/D5_icon.png'), isActive: true },
// ];

const HEADER_CONTENT_HEIGHT = 64;
const BOTTOM_NAV_CONTENT_HEIGHT = 72;

type ChatOverviewProps = {
  onChatPress?: (_chat: Chat) => void;
};

export default function ChatOverview({ onChatPress }: ChatOverviewProps) {
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = insets.top + HEADER_CONTENT_HEIGHT;
  const BOTTOM_NAV_HEIGHT = insets.bottom + BOTTOM_NAV_CONTENT_HEIGHT;

  const [chats] = useState<Chat[]>(MOCK_CHATS);
  const [searchText, setSearchText] = useState('');
  const [showAddChat, setShowAddChat] = useState(false);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
    if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
    return 0;
  });

  const handleChatPress = (chat: Chat) => {
    onChatPress?.(chat);
  };

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={LucidColors.outline} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages, people..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={LucidColors.onSurfaceVariant}
        />
      </View>

      {/* TODO: Status-Funktion — kann später reaktiviert werden
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContent}
        style={styles.storiesRow}
      >
        <View style={styles.storyItem}>
          <View style={styles.myStatusCircle}>
            <Ionicons name="add" size={26} color={LucidColors.primary} />
          </View>
          <Text style={styles.storyLabel}>MY STATUS</Text>
        </View>

        {MOCK_STORIES.map((story) => (
          <TouchableOpacity key={story.id} style={styles.storyItem} activeOpacity={0.8}>
            <LinearGradient
              colors={[LucidColors.primary, LucidColors.tertiary]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.storyRing}
            >
              <View style={styles.storyAvatarBorder}>
                <Image source={story.avatar} style={styles.storyAvatar} />
              </View>
            </LinearGradient>
            <Text style={styles.storyLabel}>{story.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      */}
    </View>
  );

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={[styles.chatItem, item.unreadCount > 0 && styles.chatItemUnread]}
      onPress={() => handleChatPress(item)}
      activeOpacity={0.7}
    >
      {/* Avatar with optional online halo */}
      <View style={styles.avatarContainer}>
        {item.isOnline ? (
          <View style={styles.onlineHalo}>
            <Image source={item.avatar} style={styles.avatar} />
          </View>
        ) : (
          <Image source={item.avatar} style={styles.avatarNoHalo} />
        )}
      </View>

      {/* Chat info */}
      <View style={styles.chatContent}>
        <View style={styles.chatMeta}>
          <Text style={styles.chatName} numberOfLines={1}>{item.name}</Text>
          <Text
            style={[
              styles.timestamp,
              item.unreadCount > 0 && styles.timestampUnread,
            ]}
          >
            {item.timestamp}
          </Text>
        </View>
        <View style={styles.chatPreview}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <LinearGradient
              colors={[LucidColors.primary, LucidColors.primaryDim]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.unreadBadge}
            >
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </LinearGradient>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No chats yet</Text>
      <Text style={styles.emptySubtext}>
        {searchText ? 'Try a different search term' : 'Start a new conversation'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Chat list — full screen, padded to sit between header and bottom nav */}
      <FlatList
        data={sortedChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => String(item.uuid)}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT + 12,
          paddingBottom: BOTTOM_NAV_HEIGHT + 16,
        }}
        showsVerticalScrollIndicator={false}
      />

      {/* ── Glassmorphism Header ──────────────────────────────────────────── */}
      <BlurView
        intensity={50}
        tint="dark"
        style={[
          styles.header,
          {
            height: HEADER_HEIGHT,
            paddingTop: insets.top,
            backgroundColor: 'rgba(37, 34, 63, 0.65)',
          },
        ]}
      >
        <View style={styles.headerInner}>
          <View style={styles.headerLeft}>
            <View style={styles.headerAvatarWrapper}>
              <Image
                source={require('../../assets/profile.jpeg')}
                style={styles.headerAvatar}
              />
              <View style={styles.headerAvatarOnline} />
            </View>
            <Text style={styles.headerTitle}>Chats</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
              <Ionicons name="search" size={22} color={LucidColors.onSurfaceVariant} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
              <Ionicons name="ellipsis-vertical" size={22} color={LucidColors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>

      {/* ── FAB ──────────────────────────────────────────────────────────── */}
      <TouchableOpacity
        style={[styles.fabWrapper, { bottom: BOTTOM_NAV_HEIGHT + 16 }]}
        onPress={() => setShowAddChat(true)}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={[LucidColors.primary, LucidColors.primaryDim]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fab}
        >
          <Icon name="chat-plus-outline" size={26} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* ── Glassmorphism Bottom Navigation ──────────────────────────────── */}
      <BlurView
        intensity={50}
        tint="dark"
        style={[
          styles.bottomNav,
          {
            height: BOTTOM_NAV_HEIGHT,
            paddingBottom: insets.bottom,
            backgroundColor: 'rgba(37, 34, 63, 0.65)',
          },
        ]}
      >
        <View style={styles.bottomNavInner}>
          {/* Chats — active */}
          <LinearGradient
            colors={[LucidColors.primary, LucidColors.primaryDim]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.navTabActive}
          >
            <Ionicons name="chatbubble" size={22} color="#fff" />
          </LinearGradient>

          {/* Contacts */}
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
            <Ionicons name="people-outline" size={24} color={LucidColors.onSurfaceVariant} />
          </TouchableOpacity>

          {/* Calls */}
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
            <Ionicons name="call-outline" size={24} color={LucidColors.onSurfaceVariant} />
          </TouchableOpacity>

          {/* Settings */}
          <TouchableOpacity style={styles.navTab} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={24} color={LucidColors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
      </BlurView>

      {/* ── Add Chat Modal ────────────────────────────────────────────────── */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LucidColors.surface,
  },

  // ── List header (search + stories) ───────────────────────────────────────
  listHeader: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },

  // ── Search bar ────────────────────────────────────────────────────────────
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LucidColors.surfaceContainerLowest,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(72, 69, 92, 0.15)',   // outlineVariant @ 15%
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurface,
  },

  // TODO: Status-Funktion — Styles können später reaktiviert werden
  // storiesRow: {
  //   marginBottom: 12,
  // },
  // storiesContent: {
  //   gap: 16,
  //   paddingRight: 8,
  // },
  // storyItem: {
  //   alignItems: 'center',
  //   gap: 6,
  //   width: 64,
  // },
  // myStatusCircle: {
  //   width: 64,
  //   height: 64,
  //   borderRadius: 32,
  //   borderWidth: 2,
  //   borderStyle: 'dashed',
  //   borderColor: LucidColors.outlineVariant,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // storyRing: {
  //   padding: 2,
  //   borderRadius: 9999,
  // },
  // storyAvatarBorder: {
  //   padding: 2,
  //   borderRadius: 9999,
  //   backgroundColor: LucidColors.surfaceDim,
  // },
  // storyAvatar: {
  //   width: 56,
  //   height: 56,
  //   borderRadius: 28,
  // },
  // storyLabel: {
  //   fontSize: 10,
  //   fontFamily: LucidFonts.interSemiBold,
  //   color: LucidColors.onSurface,
  //   textTransform: 'uppercase',
  //   letterSpacing: 0.5,
  //   textAlign: 'center',
  // },

  // ── Chat items ────────────────────────────────────────────────────────────
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
  },
  chatItemUnread: {
    backgroundColor: LucidColors.surfaceContainerLow,
  },
  avatarContainer: {
    flexShrink: 0,
  },
  onlineHalo: {
    padding: 2,
    borderRadius: 9999,
    backgroundColor: LucidColors.tertiary,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: LucidColors.surfaceDim,
  },
  avatarNoHalo: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  chatContent: {
    flex: 1,
    gap: 4,
  },
  chatMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  chatName: {
    fontSize: 16,
    fontFamily: LucidFonts.manropeBold,
    color: LucidColors.onSurface,
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    fontSize: 11,
    fontFamily: LucidFonts.interMedium,
    color: LucidColors.onSurfaceVariant,
    flexShrink: 0,
  },
  timestampUnread: {
    color: LucidColors.primaryFixedDim,
  },
  chatPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurfaceVariant,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    flexShrink: 0,
  },
  unreadText: {
    fontSize: 11,
    fontFamily: LucidFonts.interBold,
    color: '#fff',
  },

  // ── Empty state ───────────────────────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: LucidFonts.manropeBold,
    color: LucidColors.onSurface,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurfaceVariant,
    textAlign: 'center',
  },

  // ── Header ────────────────────────────────────────────────────────────────
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerAvatarWrapper: {
    position: 'relative',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: LucidColors.primary,
  },
  headerAvatarOnline: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: LucidColors.tertiary,
    borderWidth: 2,
    borderColor: LucidColors.surfaceDim,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: LucidFonts.manropeSemiBold,
    color: LucidColors.onSurface,
    letterSpacing: -0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── FAB ───────────────────────────────────────────────────────────────────
  fabWrapper: {
    position: 'absolute',
    right: 20,
    zIndex: 20,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: LucidColors.primaryDim,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },

  // ── Bottom navigation ─────────────────────────────────────────────────────
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bottomNavInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
  },
  navTabActive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
