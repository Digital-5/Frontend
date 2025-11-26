import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal } from '../components';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

export default function ExampleView() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'success' | 'error' | 'warning',
  });

  const showSuccessModal = () => {
    setModalConfig({
      title: 'Erfolg!',
      message: 'Deine Aktion wurde erfolgreich ausgeführt.',
      type: 'success',
    });
    setModalVisible(true);
  };

  const showErrorModal = () => {
    setModalConfig({
      title: 'Fehler',
      message: 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
      type: 'error',
    });
    setModalVisible(true);
  };

  const showConfirmModal = () => {
    setModalConfig({
      title: 'Bestätigung',
      message: 'Möchtest du diese Aktion wirklich ausführen?',
      type: 'warning',
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal Beispiele</Text>

      <TouchableOpacity style={styles.button} onPress={showSuccessModal}>
        <Text style={styles.buttonText}>Success Modal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={showErrorModal}>
        <Text style={styles.buttonText}>Error Modal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={showConfirmModal}>
        <Text style={styles.buttonText}>Confirm Modal</Text>
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onClose={() => setModalVisible(false)}
        confirmText="OK"
        cancelText={modalConfig.type === 'warning' ? 'Abbrechen' : undefined}
        onConfirm={() => {
          if (modalConfig.type === 'warning') {
            console.log('Aktion bestätigt!');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textHeadline,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: Colors.buttonText,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
});
