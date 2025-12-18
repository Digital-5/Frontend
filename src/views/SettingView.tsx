import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
} from "react-native";
import Colors from "../theme/colors";
import { Style } from "../theme/style";
import { Icon } from "../components";

type SettingViewProps = {
  onClose: () => void;
};

interface SettingItem {
  id: string;
  title: string;
  icon: "user" | "notification" | "lock" | "eye" | "info" | "share";
  type: "navigation" | "toggle";
  value?: boolean;
}

const SETTING_ITEMS: SettingItem[] = [
  { id: "profile", title: "Edit Profile", icon: "user", type: "navigation" },
  {
    id: "notifications",
    title: "Notifications",
    icon: "notification",
    type: "toggle",
    value: true,
  },
  { id: "privacy", title: "Privacy", icon: "lock", type: "navigation" },
  { id: "appearance", title: "Appearance", icon: "eye", type: "navigation" },
  { id: "share", title: "Invite Friends", icon: "share", type: "navigation" },
  { id: "about", title: "About", icon: "info", type: "navigation" },
];

export default function SettingView({ onClose }: SettingViewProps) {
  const [settings, setSettings] = useState<SettingItem[]>(SETTING_ITEMS);

  const handleSettingPress = (item: SettingItem) => {
    if (item.type === "navigation") {
      console.log("Navigate to:", item.id);
      // Navigation logic here
    }
  };

  const handleToggle = (id: string, value: boolean) => {
    setSettings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
    console.log("Toggle:", id, value);
  };

  const handleLogout = () => {
    console.log("Logout pressed");
    onClose();
  };

  return (
    <View style={Style.slideupContainer}>
      <TouchableOpacity style={Style.closeButton} onPress={onClose}>
        <Text style={Style.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={Style.slideupHeader}>
        <Text style={Style.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <TouchableOpacity
          style={Style.slideupListItem}
          onPress={() =>
            handleSettingPress({
              id: "profile",
              title: "Edit Profile",
              icon: "user",
              type: "navigation",
            })
          }
          activeOpacity={0.7}
        >
          <View style={Style.avatarContainer}>
            <Image
              source={require("../../assets/profile.jpeg")}
              style={Style.avatar}
            />
          </View>
          <View style={Style.chatContent}>
            <Text style={Style.chatName}>Your Name</Text>
            <Text style={Style.lastMessage}>Tap to edit profile</Text>
          </View>
          <Icon name="arrow-right" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        {/* Settings List */}
        {settings.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={Style.slideupListItem}
            onPress={() =>
              item.type === "navigation" && handleSettingPress(item)
            }
            activeOpacity={item.type === "navigation" ? 0.7 : 1}
          >
            <View style={[Style.avatarContainer, { marginRight: 12 }]}>
              <Icon name={item.icon} size={24} color={Colors.primaryLight} />
            </View>
            <View style={Style.chatContent}>
              <Text style={Style.chatName}>{item.title}</Text>
            </View>
            {item.type === "toggle" ? (
              <Switch
                value={item.value}
                onValueChange={(value) => handleToggle(item.id, value)}
                trackColor={{ false: Colors.border, true: Colors.primary }}
                thumbColor={Colors.backgroundLight}
              />
            ) : (
              <Icon name="arrow-right" size={20} color={Colors.textSecondary} />
            )}
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={[Style.slideupListItem, { marginTop: 20 }]}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <View style={[Style.avatarContainer, { marginRight: 12 }]}>
            <Icon name="lock" size={24} color={Colors.error} />
          </View>
          <View style={Style.chatContent}>
            <Text style={[Style.chatName, { color: Colors.error }]}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
