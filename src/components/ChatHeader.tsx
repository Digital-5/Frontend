import { View, Text, TouchableOpacity, StyleSheet, Platform, ImageSourcePropType, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import LucidColors from '../theme/lucidColors';
import LucidFonts from '../theme/lucidFonts';

type ChatHeaderProps = {
  profilePicture: ImageSourcePropType;
  chatPartnerName: string;
  onlineStatus: 'online' | 'offline';
  onBack: () => void;
  onProfilePress?: () => void;
  topInset?: number;
};

const HEADER_CONTENT_HEIGHT = 60;

export default function ChatHeader({
  profilePicture,
  chatPartnerName,
  onlineStatus,
  onBack,
  topInset = 0,
}: ChatHeaderProps) {
  return (
    <BlurView
      intensity={50}
      tint="dark"
      style={[
        styles.container,
        {
          height: topInset + HEADER_CONTENT_HEIGHT,
          paddingTop: topInset,
          backgroundColor: 'rgba(37, 34, 63, 0.65)',
        },
      ]}
    >
      <View style={styles.inner}>
        {/* Back button */}
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={26} color={LucidColors.onSurface} />
        </TouchableOpacity>

        {/* Avatar + name + status */}
        <TouchableOpacity style={styles.profileArea} activeOpacity={0.8}>
          {onlineStatus === 'online' ? (
            <View style={styles.onlineHalo}>
              <Image source={profilePicture} style={styles.avatar} />
            </View>
          ) : (
            <Image source={profilePicture} style={styles.avatarOffline} />
          )}
          <View style={styles.chatInfo}>
            <Text style={styles.name} numberOfLines={1}>{chatPartnerName}</Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      onlineStatus === 'online'
                        ? LucidColors.tertiary
                        : LucidColors.outlineVariant,
                  },
                ]}
              />
              <Text style={styles.statusText}>{onlineStatus}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* More options */}
        <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
          <Ionicons name="ellipsis-vertical" size={22} color={LucidColors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  profileArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 4,
  },
  onlineHalo: {
    padding: 2,
    borderRadius: 9999,
    backgroundColor: LucidColors.tertiary,
    flexShrink: 0,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: LucidColors.surfaceDim,
  },
  avatarOffline: {
    width: 40,
    height: 40,
    borderRadius: 20,
    flexShrink: 0,
  },
  chatInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 18,
    fontFamily: LucidFonts.manropeSemiBold,
    color: LucidColors.onSurface,
    letterSpacing: -0.2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurfaceVariant,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
