import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';
import { Icon } from '../components';

type ChatHeaderProps = {
    chatPartnerName: string;
    onlineStatus: 'online' | 'offline';
    onBack: () => void;
}

export default function ChatHeader({
  chatPartnerName,
  onlineStatus,
  onBack,
}: ChatHeaderProps){

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Icon name="back" size={24} color={Colors.textOnDark} />
      </TouchableOpacity>

      <View style={styles.chatInfo}>
        <Text style={styles.name}>{chatPartnerName}</Text>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: onlineStatus === 'online' ? '#4CAF50' : '#9E9E9E' },
            ]}
          />
          <Text style={styles.statusText}>{onlineStatus}</Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={() => console.log('More options')} style={styles.moreButton}>
        <Icon name="more-options" size={24} color={Colors.textOnDark} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.ChatColorRead,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    // Für iOS Safe Area
    paddingTop: Platform.OS === 'ios' ? 50 : 12,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontFamily: Fonts.medium,
    color: Colors.textOnDark,
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.textOnDark,
  },
  moreButton: {
    padding: 8,
  },
});