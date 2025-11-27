import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../theme/colors';
import { Style } from '../theme/style';


type LoginViewProps = {
  onSubmit?: (_credentials: { email: string; password: string }) => void;
};

export default function LoginView({ onSubmit }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login attempt with:', { email, password });
    onSubmit?.({ email, password });
  };

  return (
    <KeyboardAvoidingView
      style={Style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={Style.formContainer}>
        <Text style={Style.title}>Login</Text>

        <TextInput
          style={Style.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={Colors.textPlaceholder}
        />

        <TextInput
          style={Style.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={Colors.textPlaceholder}
        />

        <TouchableOpacity style={Style.button} onPress={handleLogin}>
          <Text style={Style.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Style.forgotPassword}>
          <Text style={Style.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
