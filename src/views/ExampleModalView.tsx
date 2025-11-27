import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Modal } from '../components';
import { Style } from '../theme/style'


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
    <View style={Style.container}>
      <Text style={Style.title}>Modal Beispiele</Text>

      <TouchableOpacity style={Style.button} onPress={showSuccessModal}>
        <Text style={Style.buttonText}>Success Modal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Style.button} onPress={showErrorModal}>
        <Text style={Style.buttonText}>Error Modal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Style.button} onPress={showConfirmModal}>
        <Text style={Style.buttonText}>Confirm Modal</Text>
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
