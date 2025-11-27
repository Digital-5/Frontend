import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';
import { ChatHeader } from '../components';

type ChatViewProps = {
    onSubmit?: (_credentials: { username: string }) => void;
};

export default function ChatView({ onSubmit: _onSubmit }: ChatViewProps) {
    const [username, setUsername] = useState('');

    const handleGoBack = () => {
        console.log('Go back button pressed');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ChatHeader
                chatPartnerName="Jonas Mom"
                onlineStatus="online"
                onBack={handleGoBack}
            />

            <View style={styles.formContainer}>
                <Text style={styles.title}>Chat View</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor={Colors.textPlaceholder}
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.ChatColorUnread,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    marginBottom: 40,
    textAlign: 'center',
    color: Colors.textHeadline,
  },
   inputContainer: {
    position: 'relative',  // Parent muss relative sein
  },
  input: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: Colors.border, // Hellerer Farbton für deaktivierten Zustand
  },
  buttonText: {
    color: Colors.buttonText,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: Colors.link,
    fontSize: 14,
    fontFamily: Fonts.regular,
  },
});
