import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';
import { Modal } from '../components';

type SignupViewProps = {
    onSubmit?: (_credentials: { username: string }) => void;
};

export default function SignupView({ onSubmit }: SignupViewProps) {
    const [username, setUsername] = useState('');
    const [getHelpBtn, setGetHelpBtn] = useState(false);
    const [information, setInformation] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);

    const handleSignup = () => {
        console.log('Signup attempt with:', { username });
        onSubmit?.({ username });
    };

    const showHelp = () => {
        setGetHelpBtn(true);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.formContainer}>
                <Image source={require('../../assets/D5_icon.png')} style={{ width: 250, height: 250, alignSelf: 'center', marginBottom: 20 }} />
                <Text style={styles.title}>Sign Up</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TouchableOpacity style={styles.infoIcon} onPress={() => setShowInfoModal(true)}>
                        <Text>{information ? 'ℹ️' : 'ℹ️'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.button, username === '' && styles.buttonDisabled]} onPress={handleSignup} disabled={username === ''}>
                    <Text style={styles.buttonText}>Request Access</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.forgotPassword} onPress={showHelp}>
                   <Text style={styles.forgotPasswordText}>Need help?</Text>
                </TouchableOpacity>
            </View>

            {/* Help Modal */}
            <Modal
                visible={getHelpBtn}
                title="Need Help?"
                message="For assistance, please contact support at support@example.com"
                onClose={() => setGetHelpBtn(false)}
                confirmText="Got it"
            />

            {/* Info Modal */}
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
    backgroundColor: Colors.background,
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
