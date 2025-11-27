import { Modal as RNModal, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../theme/colors';
import { Style } from '../theme/style'


type ModalProps = {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  type?: 'info' | 'success' | 'error' | 'warning';
};

export default function Modal({
  visible,
  title,
  message,
  onClose,
  confirmText = 'OK',
  cancelText,
  onConfirm,
  type = 'info',
}: ModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FF9800';
      case 'info':
        return '#2196F3';
      default:
        return Colors.primary;
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={Style.overlay}>
        <View style={Style.popupContainer}>
          {/* Icon Indicator */}
          <View style={[Style.iconContainer, { backgroundColor: getIconColor() }]}>
            <Text style={Style.iconText}>
              {type === 'success' && '✓'}
              {type === 'error' && '✕'}
              {type === 'warning' && '!'}
              {type === 'info' && 'i'}
            </Text>
          </View>

          {/* Title */}
          {title && <Text style={Style.modalTitle}>{title}</Text>}

          {/* Message */}
          <Text style={Style.message}>{message}</Text>

          {/* Buttons */}
          <View style={Style.buttonContainer}>
            {cancelText && (
              <TouchableOpacity
                style={[Style.button, Style.cancelButton]}
                onPress={onClose}
              >
                <Text style={Style.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[Style.button, Style.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={Style.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
}
