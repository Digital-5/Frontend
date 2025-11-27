import { useState } from 'react';
import {
  View,
  Text,
  // StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Colors from '../theme/colors';
// import Fonts from '../theme/fonts';
import { Style } from '../theme/style';
// import { Ionicons } from '@expo/vector-icons';
// import Icons from '../theme/icons';
import { Icon } from '../components';

type AddChatViewProps = {
    onClose: () => void;
};

interface User {
    id: string;
    avatar: any;
}

//MOCK Data for new possible chats
const MOCK_USERS: User[] = [
  {
    id: 'UNC',
    avatar: require('../../assets/profile.jpeg'),
  },
  {
    id: 'Erwin',
    avatar: require('../../assets/profile.jpeg'),
  },
];

export default function AddChatView({ onClose }: AddChatViewProps) {
    const [users] = useState<User[]>(MOCK_USERS);
    const [searchText, setSearchText] = useState('');
    
    // Filter Users basierend auf Suchtext
    const filteredUsers = users.filter((user) =>
        user.id.toLowerCase().includes(searchText.toLowerCase())
    );
    
    const handleCreateNewChat = (user: User) => {
        console.log('Neuer Chat wird hinzugefügt', user.id);
        onClose(); // Schließe Modal nach Auswahl
    };

    const renderUserItem = ({ item }: { item: User }) => (
        <TouchableOpacity
          style={[Style.slideupListItem

          ]}
          onPress={() => handleCreateNewChat(item)}
          activeOpacity={0.7}
        >
          <View style={Style.avatarContainer}>
            <Image source={item.avatar} style={Style.avatar} />
          </View>
    
          <View style={Style.chatContent}>
            <View style={Style.chatHeader}>
              <Text
                style={Style.chatName}
              >{item.id}
              </Text>
            </View>
            </View>

        </TouchableOpacity>
    );

    return (
        <View style={Style.slideupContainer}>
            <TouchableOpacity 
                style={Style.closeButton}
                onPress={onClose}
            >
                <Text style={Style.closeText}>✕</Text>
            </TouchableOpacity>
            
            {/*  AddChat Content */}

                {/* Header */}
                <View style={Style.slideupHeader}>
                    <Text style={Style.headerTitle}>Add a New Chat</Text>
                </View>

                {/* Suchleiste */}
                <View style={Style.slideupSearchContainer}>
                    <Icon name="search" size={20} color={Colors.textPlaceholder} />
                <TextInput
                    style={Style.searchInput}
                    placeholder="Search for users..."
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor={Colors.textPlaceholder}
                    
                />
                </View>
                {/* User-Liste mit Filter */}
                {filteredUsers.length > 0 ? (
                    <FlatList
                        data={filteredUsers}
                        renderItem={renderUserItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={Style.listContainer}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={Style.emptyContainer}>
                        <Text style={Style.emptyText}>No users found</Text>
                        <Text style={Style.emptySubtext}>
                            Try a different search term
                        </Text>
                    </View>
                )}
        </View>
  );
}