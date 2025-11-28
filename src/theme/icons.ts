// Icon Mapping für konsistente Icon-Nutzung im gesamten Projekt
// Verwende getIcon('name') statt direkter Icon-Namen

export type IconName = 
  // Navigation
  | 'back'
  | 'close'
  | 'menu'
  | 'more-options'
  | 'arrow-left'
  | 'arrow-right'
  
  // Chat Actions
  | 'send'
  | 'attach'
  | 'camera'
  | 'image'
  | 'microphone'
  | 'emoji'
   | 'chat-plus-outline'
  
  // Message Status
  | 'checkmark-single'
  | 'checkmark-double'
  | 'clock'
  | 'error'
  
  // User Actions
  | 'edit'
  | 'delete'
  | 'copy'
  | 'share'
  | 'download'
  | 'search'
  
  // Common
  | 'heart'
  | 'heart-outline'
  | 'star'
  | 'star-outline'
  | 'settings'
  | 'notification'
  | 'user'
  | 'lock'
  | 'unlock'
  | 'eye'
  | 'eye-off'
  | 'add'
  | 'remove'
  | 'refresh'
  | 'filter'
  | 'info';

type IconConfig = {
  library: 'Ionicons' | 'Entypo' | 'MaterialIcons' | 'AntDesign' | 'Feather' | 'MaterialCommunityIcons';
  name: string;
};

const iconMap: Record<IconName, IconConfig> = {
  // Navigation
  'back': { library: 'Entypo', name: 'chevron-thin-left' },
  'close': { library: 'Ionicons', name: 'close' },
  'menu': { library: 'Ionicons', name: 'menu' },
  'more-options': { library: 'Ionicons', name: 'ellipsis-vertical' },
  'arrow-left': { library: 'Ionicons', name: 'arrow-back' },
  'arrow-right': { library: 'Ionicons', name: 'arrow-forward' },
  
  // Chat Actions
  'send': { library: 'Ionicons', name: 'send' },
  'attach': { library: 'Ionicons', name: 'attach' },
  'camera': { library: 'Ionicons', name: 'camera' },
  'image': { library: 'Ionicons', name: 'image' },
  'microphone': { library: 'Ionicons', name: 'mic' },
  'emoji': { library: 'Ionicons', name: 'happy-outline' },
  'chat-plus-outline': { library: 'MaterialCommunityIcons', name: 'chat-plus-outline' },
  
  // Message Status
  'checkmark-single': { library: 'Ionicons', name: 'checkmark' },
  'checkmark-double': { library: 'Ionicons', name: 'checkmark-done' },
  'clock': { library: 'Ionicons', name: 'time-outline' },
  'error': { library: 'Ionicons', name: 'alert-circle' },
  
  // User Actions
  'edit': { library: 'Ionicons', name: 'create-outline' },
  'delete': { library: 'Ionicons', name: 'trash-outline' },
  'copy': { library: 'Ionicons', name: 'copy-outline' },
  'share': { library: 'Ionicons', name: 'share-social-outline' },
  'download': { library: 'Ionicons', name: 'download-outline' },
  'search': { library: 'Ionicons', name: 'search' },
  
  // Common
  'heart': { library: 'Ionicons', name: 'heart' },
  'heart-outline': { library: 'Ionicons', name: 'heart-outline' },
  'star': { library: 'Ionicons', name: 'star' },
  'star-outline': { library: 'Ionicons', name: 'star-outline' },
  'settings': { library: 'Ionicons', name: 'settings-outline' },
  'notification': { library: 'Ionicons', name: 'notifications-outline' },
  'user': { library: 'Ionicons', name: 'person-outline' },
  'lock': { library: 'Ionicons', name: 'lock-closed' },
  'unlock': { library: 'Ionicons', name: 'lock-open' },
  'eye': { library: 'Ionicons', name: 'eye' },
  'eye-off': { library: 'Ionicons', name: 'eye-off' },
  'add': { library: 'Ionicons', name: 'add' },
  'remove': { library: 'Ionicons', name: 'remove' },
  'refresh': { library: 'Ionicons', name: 'refresh' },
  'filter': { library: 'Ionicons', name: 'filter' },
  'info': { library: 'Ionicons', name: 'information-circle-outline' },
};

export const getIcon = (name: IconName): IconConfig => {
  return iconMap[name];
};

// Export für einfachere Nutzung
export default {
  get: getIcon,
  names: iconMap,
};