import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Modal } from '../components';
import LucidColors from '../theme/lucidColors';
import LucidFonts from '../theme/lucidFonts';

type SignupViewProps = {
  onSubmit?: (_credentials: { username: string }) => void;
};

export default function SignupView({ onSubmit }: SignupViewProps) {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [getHelpBtn, setGetHelpBtn] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleSignup = () => {
    console.log('Signup attempt with:', { username });
    onSubmit?.({ username });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.inner, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}>
        {/* Logo */}
        <Image
          source={require('../../assets/D5_icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title area */}
        <View style={styles.titleArea}>
          <Text style={styles.eyebrow}>Get started</Text>
          <Text style={styles.title}>Sign Up</Text>
        </View>

        {/* Username input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor={LucidColors.onSurfaceVariant}
          />
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowInfoModal(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="information-circle-outline" size={22} color={LucidColors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Request access button */}
        <TouchableOpacity
          onPress={handleSignup}
          activeOpacity={0.85}
          disabled={username === ''}
        >
          <LinearGradient
            colors={
              username !== ''
                ? [LucidColors.primary, LucidColors.primaryDim]
                : [LucidColors.surfaceContainerHigh, LucidColors.surfaceContainerHigh]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Request Access</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Need help */}
        <TouchableOpacity
          style={styles.helpLink}
          onPress={() => setGetHelpBtn(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.helpText}>Need help?</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={getHelpBtn}
        title="Need Help?"
        message="For assistance, please contact support at support@example.com"
        onClose={() => setGetHelpBtn(false)}
        confirmText="Got it"
      />

      <Modal
        visible={showInfoModal}
        title="Information"
        message="You can't sign up on your own. Enter a desired username and request access. An administrator has to activate your account."
        onClose={() => setShowInfoModal(false)}
        confirmText="Got it"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LucidColors.surface,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
    gap: 20,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 8,
  },
  titleArea: {
    gap: 4,
  },
  eyebrow: {
    fontSize: 14,
    fontFamily: LucidFonts.interMedium,
    color: LucidColors.onSurfaceVariant,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 40,
    fontFamily: LucidFonts.manropeExtraBold,
    color: LucidColors.onSurface,
    letterSpacing: -1,
  },
  inputRow: {
    position: 'relative',
  },
  input: {
    backgroundColor: LucidColors.surfaceContainerHigh,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingRight: 52,
    fontSize: 15,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurface,
    borderWidth: 1,
    borderColor: 'rgba(72, 69, 92, 0.15)',
  },
  infoButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -11,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: LucidColors.primaryDim,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: LucidFonts.interSemiBold,
    color: '#fff',
    letterSpacing: 0.2,
  },
  helpLink: {
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.primary,
  },
});
