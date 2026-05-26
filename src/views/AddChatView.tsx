import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LucidColors from '../theme/lucidColors';
import LucidFonts from '../theme/lucidFonts';
import { useConversations } from '../hooks/useConversation';

type AddChatViewProps = {
  onClose: () => void;
  onChatCreated: (chatId: string, name: string) => void;  // ← neu

};

export default function AddChatView({ onClose, onChatCreated }: AddChatViewProps) {
  const insets = useSafeAreaInsets();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const { createConversation } = useConversations();

    const handleCreate = () => {
      if (!name.trim()) return;
      const chatId = createConversation(name.trim(), username.trim());
      onChatCreated(chatId, name.trim());
      onClose();
    };
    return (
      <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>New Chat</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
            <Ionicons name="close" size={24} color={LucidColors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Username Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Username (@handle)"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={LucidColors.onSurfaceVariant}
            autoCapitalize="none"
          />
        </View>

        {/* Name Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Display Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={LucidColors.onSurfaceVariant}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[styles.createButton, !name.trim() && styles.createButtonDisabled]}
          onPress={handleCreate}
          activeOpacity={0.8}
          disabled={!name.trim()}
        >
          <Text style={styles.createButtonText}>Start Chat</Text>
        </TouchableOpacity>
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
    createButton: {
      marginHorizontal: 20,
      marginTop: 8,
      backgroundColor: LucidColors.primary,
      borderRadius: 9999,
      paddingVertical: 16,
      alignItems: 'center',
    },
    createButtonDisabled: {
      opacity: 0.4,
    },
    createButtonText: {
      fontSize: 15,
      fontFamily: LucidFonts.manropeBold,
      color: '#fff',
    },
  });
