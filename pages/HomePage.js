import { StyleSheet, Text, View } from 'react-native';
import Archive from '../components/Archive';
  export default function HomePage({ navigation, route }) {
    console.log(route);
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Web Time Machine</Text>
          <Archive/>
        </View>
      );
  }

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: "#2E64FE"
    },
    title: {
      fontSize: 25,
      color: "white"
    }
  });
