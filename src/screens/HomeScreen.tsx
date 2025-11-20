import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { CustomButton } from '../components';
import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Home Screen</Text>
        <Text style={styles.subtitle}>Welcome to Digital-5 Frontend</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Design System Ready</Text>
          <Text style={styles.sectionText}>
            The app is configured with a complete color scheme and Roboto fonts.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧩 Component Library</Text>
          <Text style={styles.sectionText}>
            Reusable components like CustomButton and CustomInput are ready to use.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🗺️ Navigation Setup</Text>
          <Text style={styles.sectionText}>
            React Navigation is configured and ready for multiple screens.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton 
            title="Primary Button" 
            onPress={() => console.log('Primary pressed')}
            style={styles.button}
          />
          
          <CustomButton 
            title="Secondary Button" 
            onPress={() => console.log('Secondary pressed')}
            variant="secondary"
            style={styles.button}
          />
          
          <CustomButton 
            title="Outline Button" 
            onPress={() => console.log('Outline pressed')}
            variant="outline"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.textOnLight,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textOnLight,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 12,
  },
});
