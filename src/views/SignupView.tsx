import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modal } from '../components';
import { Style } from '../theme/style';


type SignupViewProps = {
    onSubmit?: (_credentials: { username: string }) => void;
};

export default function SignupView({ onSubmit }: SignupViewProps) {
    const [username, setUsername] = useState('');
    const [getHelpBtn, setGetHelpBtn] = useState(false);
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
            style={Style.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={Style.formContainer}>
                <Image source={require('../../assets/D5_icon.png')} style={{ width: 250, height: 250, alignSelf: 'center', marginBottom: 20 }} />
                <Text style={Style.title}>Sign Up</Text>
                <View style={Style.inputContainer}>
                    <TextInput
                        style={Style.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TouchableOpacity style={Style.infoIcon} onPress={() => setShowInfoModal(true)}>
                        <Text>{'ℹ️'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[Style.button, username === '' && Style.buttonDisabled]} onPress={handleSignup} disabled={username === ''}>
                    <Text style={Style.buttonText}>Request Access</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.forgotPassword} onPress={showHelp}>
                   <Text style={Style.forgotPasswordText}>Need help?</Text>
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
