import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import LucidColors from '../theme/lucidColors';
import LucidFonts from '../theme/lucidFonts';

type LoginViewProps = {
  onSubmit?: (_credentials: { email: string; password: string }) => void;
};

export default function LoginView({ onSubmit }: LoginViewProps) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempt with:', { email, password });
    onSubmit?.({ email, password });
  };

  const canSubmit = email.trim().length > 0 && password.length > 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.inner, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}>
        {/* Title area */}
        <View style={styles.titleArea}>
          <Text style={styles.eyebrow}>Welcome back</Text>
          <Text style={styles.title}>Login</Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor={LucidColors.onSurfaceVariant}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={LucidColors.onSurfaceVariant}
          />
        </View>

        {/* Primary button */}
        <TouchableOpacity onPress={handleLogin} activeOpacity={0.85} disabled={!canSubmit}>
          <LinearGradient
            colors={
              canSubmit
                ? [LucidColors.primary, LucidColors.primaryDim]
                : [LucidColors.surfaceContainerHigh, LucidColors.surfaceContainerHigh]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Forgot password */}
        <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
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
    gap: 24,
  },
  titleArea: {
    gap: 6,
    marginBottom: 8,
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
  inputGroup: {
    gap: 12,
  },
  input: {
    backgroundColor: LucidColors.surfaceContainerHigh,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 15,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurface,
    borderWidth: 1,
    borderColor: 'rgba(72, 69, 92, 0.15)',
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
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.primary,
  },
});
