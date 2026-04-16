import { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LucidColors from '../theme/lucidColors';
import LucidFonts from '../theme/lucidFonts';
import { ChatHeader } from '../components';

const HEADER_CONTENT_HEIGHT = 60;
const INPUT_BAR_CONTENT_HEIGHT = 68;

type ChatViewProps = {
  chatPartnerName?: string;
  profilePicture?: ImageSourcePropType;
  onBack?: () => void;
};

export default function ChatView({
  chatPartnerName = 'Chat',
  profilePicture,
  onBack,
}: ChatViewProps) {
  const insets = useSafeAreaInsets();
  const HEADER_HEIGHT = insets.top + HEADER_CONTENT_HEIGHT;
  const INPUT_BAR_HEIGHT = insets.bottom + INPUT_BAR_CONTENT_HEIGHT;

  const [message, setMessage] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Messages area — padded so content isn't hidden under overlays */}
      <View
        style={[
          styles.messagesArea,
          {
            paddingTop: HEADER_HEIGHT,
            paddingBottom: keyboardVisible ? INPUT_BAR_CONTENT_HEIGHT + 8 : INPUT_BAR_HEIGHT,
          },
        ]}
      >
        {/* Placeholder empty-state */}
        <View style={styles.emptyMessages}>
          <Text style={styles.emptyText}>No messages yet</Text>
          <Text style={styles.emptySubtext}>Send a message to start the conversation</Text>
        </View>
      </View>

      {/* ── Glass Chat Header ──────────────────────────────────────────────── */}
      <ChatHeader
        profilePicture={profilePicture ?? require('../../assets/profile.jpeg')}
        chatPartnerName={chatPartnerName}
        onlineStatus="online"
        onBack={onBack ?? (() => {})}
        topInset={insets.top}
      />

      {/* ── Glass Input Bar ───────────────────────────────────────────────── */}
      <BlurView
        intensity={50}
        tint="dark"
        style={[
          styles.inputBar,
          {
            height: INPUT_BAR_HEIGHT,
            paddingBottom: keyboardVisible ? 8 : insets.bottom + 8,
            backgroundColor: 'rgba(37, 34, 63, 0.65)',
          },
        ]}
      >
        <View style={styles.inputBarInner}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={LucidColors.onSurfaceVariant}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={2000}
          />
          <TouchableOpacity onPress={handleSend} activeOpacity={0.85} disabled={!message.trim()}>
            <LinearGradient
              colors={
                message.trim()
                  ? [LucidColors.primary, LucidColors.primaryDim]
                  : [LucidColors.surfaceContainerHigh, LucidColors.surfaceContainerHigh]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sendButton}
            >
              <Ionicons name="send" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LucidColors.surface,
  },
  messagesArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyMessages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
  inputBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'flex-end',
  },
  inputBarInner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: LucidColors.surfaceContainerHighest,
    borderRadius: 9999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurface,
    maxHeight: 120,
    minHeight: 44,
    borderWidth: 1,
    borderColor: 'rgba(72, 69, 92, 0.15)',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: LucidColors.primaryDim,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
