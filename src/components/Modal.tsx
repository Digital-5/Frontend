import { Modal as RNModal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import LucidColors from '../theme/lucidColors';
import LucidFonts from '../theme/lucidFonts';

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

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TYPE_CONFIG: Record<
  NonNullable<ModalProps['type']>,
  { icon: IoniconName; color: string }
> = {
  info:    { icon: 'information-circle',  color: LucidColors.primary },
  success: { icon: 'checkmark-circle',    color: '#4CAF50' },
  error:   { icon: 'alert-circle',        color: LucidColors.error },
  warning: { icon: 'warning',             color: '#FF9800' },
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
  const { icon, color } = TYPE_CONFIG[type];

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Icon */}
          <View style={[styles.iconWrapper, { backgroundColor: `${color}1A` }]}>
            <Ionicons name={icon} size={32} color={color} />
          </View>

          {/* Title */}
          {title && <Text style={styles.title}>{title}</Text>}

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            {cancelText && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={handleConfirm} activeOpacity={0.85} style={styles.confirmWrapper}>
              <LinearGradient
                colors={[LucidColors.primary, LucidColors.primaryDim]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: LucidColors.surfaceContainerHigh,
    borderRadius: 24,
    padding: 28,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 48,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(72, 69, 92, 0.15)',
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: LucidFonts.manropeBold,
    color: LucidColors.onSurface,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 14,
    fontFamily: LucidFonts.interRegular,
    color: LucidColors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 4,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(72, 69, 92, 0.4)',
  },
  cancelButtonText: {
    fontSize: 15,
    fontFamily: LucidFonts.interMedium,
    color: LucidColors.onSurfaceVariant,
  },
  confirmWrapper: {
    flex: 1,
  },
  confirmButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 15,
    fontFamily: LucidFonts.interSemiBold,
    color: '#fff',
  },
});
