import { useState, useEffect } from "react";
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, ImageSourcePropType} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';
import {ChatHeader, Icon} from '../components';

type ChatViewProps = {
    chatPartnerName?: string;
    profilePicture?: ImageSourcePropType;
    onBack?: () => void;
};

export default function ChatView({ chatPartnerName = 'Chat', profilePicture, onBack }: ChatViewProps) {
    const [username, setUsername] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => { show.remove(); hide.remove(); };
    }, []);

    const handleGoBack = () => {
        if (onBack) onBack();
        else console.log('Go back button pressed');
    };

    const handleSend = () => {
        if (username.trim()) {
            console.log('Message sent:', username);
            setUsername('');
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset={0}
        >
            <ChatHeader
                profilePicture={profilePicture ?? require('../../assets/profile.jpeg')}
                chatPartnerName={chatPartnerName}
                onlineStatus="online"
                onBack={handleGoBack}
            />

            <View style={styles.messagesContainer}>
                {/* Hier würden die Chat-Nachrichten angezeigt werden */}
            </View>

            <View style={[styles.inputWrapper, { paddingBottom: keyboardVisible ? 8 : insets.bottom > 0 ? insets.bottom : 10 }]}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor={Colors.textPlaceholder}
                    value={username}
                    onChangeText={setUsername}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}><Icon name="send" size={28} color={Colors.white}/></Text>
                </TouchableOpacity>
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
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
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
    inputWrapper: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'flex-end',
        gap: 8,
        backgroundColor: Colors.ChatColorUnread,
        width: '100%',
    },
    input: {
        flex: 1,
        backgroundColor: Colors.inputBackground,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderRadius: 20,
        fontSize: 16,
        fontFamily: Fonts.regular,
        borderWidth: 1,
        borderColor: Colors.border,
        maxHeight: 120,
        minHeight: 44,
    },
    sendButton: {
        backgroundColor: Colors.primary,
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    sendButtonText: {
        color: Colors.buttonText,
        fontSize: 14,
        fontFamily: Fonts.medium,
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
