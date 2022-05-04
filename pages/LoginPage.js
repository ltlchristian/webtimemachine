import { useEffect, useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

function LoginPage({ navigation }) {
    const [email, onChangeEmail] = useState("");
    const [password, onChangePassword] = useState("");

    const Login = () => {
        console.log("login");
        navigation.navigate('Menu', {
          connected: true,
          user: {
            last_name: "nom user1",
            first_name: "prénom user1",
            role: "admin"
          }
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Web Time Machine</Text>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    placeholder="test@test.fr"
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={onChangePassword}
                    placeholder="password"
                    value={password}
                />
                <TouchableOpacity
                    onPress={Login}
                    style={styles.button}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 2,
    marginHorizontal: 50,
    marginBottom: 10,
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 50,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
});

export default LoginPage;
