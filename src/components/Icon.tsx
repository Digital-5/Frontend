import { AntDesign, Ionicons, Entypo, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { getIcon, type IconName } from '../theme/icons';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

export default function Icon({ name, size = 24, color = '#000' }: IconProps) {
  const iconConfig = getIcon(name);
  const { library, name: iconName } = iconConfig;
  const props = { size, color, name: iconName as any };

  switch (library) {
    case 'Ionicons':
      return <Ionicons {...props} />;
    case 'Entypo':
      return <Entypo {...props} />;
    case 'MaterialIcons':
      return <MaterialIcons {...props} />;
    case 'AntDesign':
      return <AntDesign {...props} />;
    case 'Feather':
      return <Feather {...props} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...props} />;
    
  }
  // Fallback if library not matched
  return null;
}
