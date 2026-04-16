import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LucidColors from '../theme/lucidColors';
import LucidFonts from '../theme/lucidFonts';

type AddChatViewProps = {
  onClose: () => void;
};

interface User {
  id: string;
  avatar: ImageSourcePropType;
}

const MOCK_USERS: User[] = [
  { id: 'UNC', avatar: require('../../assets/profile.jpeg') },
  { id: 'Erwin', avatar: require('../../assets/profile.jpeg') },
];

export default function AddChatView({ onClose }: AddChatViewProps) {
  const insets = useSafeAreaInsets();
  const [users] = useState<User[]>(MOCK_USERS);
  const [searchText, setSearchText] = useState('');

  const filteredUsers = users.filter((user) =>
    user.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCreateNewChat = (user: User) => {
    console.log('Neuer Chat wird hinzugefügt', user.id);
    onClose();
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => handleCreateNewChat(item)}
      activeOpacity={0.7}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.userName}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>New Chat</Text>
        <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
          <Ionicons name="close" size={24} color={LucidColors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={LucidColors.outline} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for users..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={LucidColors.onSurfaceVariant}
        />
      </View>

      {/* User list */}
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No users found</Text>
          <Text style={styles.emptySubtext}>Try a different search term</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LucidColors.surfaceContainerLow,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: LucidFonts.manropeBold,
    color: LucidColors.onSurface,
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: LucidColors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LucidColors.surfaceContainerLowest,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(72, 69, 92, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 16,
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
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 14,
    borderRadius: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  userName: {
    fontSize: 16,
    fontFamily: LucidFonts.manropeSemiBold,
    color: LucidColors.onSurface,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: LucidFonts.manropeBold,
    color: LucidColors.onSurface,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurfaceVariant,
    textAlign: 'center',
  },
});
